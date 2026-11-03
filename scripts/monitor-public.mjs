import { createHash, createPublicKey, verify } from "node:crypto";
import { appendFileSync, readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { checkCatalogueCompatibility, validateCatalogue } from "./catalogue-policy.mjs";
export { checkCatalogueCompatibility } from "./catalogue-policy.mjs";

export async function readBounded(url, { fetcher = fetch, allowMissing = false, token = process.env.GH_TOKEN } = {}) {
  for (let attempt = 0; attempt < 3; attempt++) {
    const response = await fetcher(url, { headers: new URL(url).hostname === "api.github.com" && token ? { Authorization: `Bearer ${token}` } : {}, signal: AbortSignal.timeout(20000), redirect: "follow" });
    if (allowMissing && response.status === 404) return undefined;
    if ((response.status === 429 || response.status >= 500) && attempt < 2) { await response.body?.cancel(); await new Promise(resolve => setTimeout(resolve, 500 * (attempt + 1))); continue; }
    if (!response.ok) throw new Error(`Public check HTTP ${response.status}: ${url}`);
    const chunks = []; let size = 0;
    const reader = response.body?.getReader(); if (!reader) throw new Error("Missing response body");
    try { for (;;) { const part = await reader.read(); if (part.done) break; size += part.value.length; if (size > 2 * 1024 * 1024) throw new Error("Public metadata exceeds 2 MiB"); chunks.push(part.value); } }
    finally { await reader.cancel(); }
    return Buffer.concat(chunks);
  }
}

export function checkReleaseInventory(actual, expected) {
  const errors = [];
  if (actual.tag_name !== expected.tag) errors.push(`Release version mismatch: ${expected.repository}; expected ${expected.tag}, actual ${actual.tag_name}`);
  if (actual.draft || actual.prerelease) errors.push(`Expected a stable published release: ${expected.repository}; draft=${Boolean(actual.draft)}, prerelease=${Boolean(actual.prerelease)}`);
  if (!Array.isArray(actual.assets)) throw new Error(`Missing release asset inventory: ${expected.repository}`);
  const names = new Set();
  for (const asset of actual.assets) {
    if (names.has(asset.name)) errors.push(`Duplicate release asset: ${expected.repository}/${asset.name}`);
    names.add(asset.name);
    if (!expected.assets.some(item => item.name === asset.name)) errors.push(`Unexpected release asset: ${expected.repository}/${asset.name}`);
  }
  for (const asset of expected.assets) {
    const live = actual.assets.find(item => item.name === asset.name);
    if (!live) errors.push(`Missing release asset: ${expected.repository}/${asset.name}`);
    else if (live.size !== asset.size || live.digest !== asset.digest) errors.push(`Release asset changed: ${expected.repository}/${asset.name}; expected size=${asset.size} digest=${asset.digest}, actual size=${live.size} digest=${live.digest}`);
  }
  if (errors.length) throw new Error(errors.join("\n"));
}

export function verifyPackageManifest(manifest, publicKeyPem) {
  const payload = JSON.stringify({ schemaVersion: manifest.schemaVersion, version: manifest.version, protocolVersion: manifest.protocolVersion,
    minimumPluginVersion: manifest.minimumPluginVersion, maximumPluginVersion: manifest.maximumPluginVersion, platform: manifest.platform,
    arch: manifest.arch, executable: manifest.executable,
    files: [...manifest.files].sort((a,b) => a.path.localeCompare(b.path)).map(file => ({ path: file.path, size: file.size, sha256: file.sha256, kind: file.kind })) });
  if (manifest.signatureAlgorithm !== "ed25519" || !verify(null, Buffer.from(payload), createPublicKey(publicKeyPem), Buffer.from(manifest.signature, "base64"))) throw new Error("Runtime package manifest signature mismatch");
}

export function eventMonitorOptions(eventName, event) {
  if (eventName !== "release") return { scope: "pair" };
  if (event?.action !== "published" || typeof event.release?.tag_name !== "string" || !event.release.tag_name || typeof event.repository?.full_name !== "string") {
    throw new Error("Expected a published runtime release event with repository and tag");
  }
  return { scope: "runtime", releaseTag: event.release.tag_name, releaseRepository: event.repository.full_name };
}

export function commandMonitorOptions(args, { eventName, event, repository }) {
  const { values } = parseArgs({ args, options: { scope: { type: "string" }, "runtime-tag": { type: "string" } }, allowPositionals: false });
  if (values.scope === undefined && values["runtime-tag"] === undefined) return eventMonitorOptions(eventName, event);
  if (values.scope === "pair" && values["runtime-tag"] === undefined) return { scope: "pair" };
  if (values.scope === "runtime" && values["runtime-tag"]) return { scope: "runtime", releaseTag: values["runtime-tag"], releaseRepository: repository };
  throw new Error("Use --scope pair, or --scope runtime --runtime-tag <published-tag>");
}

export async function monitor({ baseline, cataloguePolicy, catalogueActivated, read = readBounded, scope = "pair", releaseTag, releaseRepository, now = new Date() }) {
  if (!["pair", "runtime"].includes(scope)) throw new Error(`Unknown monitor scope: ${scope}`);
  if (scope === "runtime" && (!releaseTag || releaseRepository !== baseline.runtime.repository)) throw new Error("Runtime-only monitoring requires the published tag and matching repository");
  const checks = {}, observedVersions = {};
  async function check(name, action) {
    try { checks[name] = { status: "passed", ...await action() }; }
    catch (error) { checks[name] = { status: "failed", error: error instanceof Error ? error.message : String(error) }; }
  }
  await Promise.all((scope === "pair" ? ["runtime", "connector"] : ["runtime"]).map(side => check(`${side}Release`, async () => {
    const expected = baseline[side];
    const endpoint = scope === "runtime" ? `tags/${encodeURIComponent(releaseTag)}` : "latest";
    const release = JSON.parse(await read(`https://api.github.com/repos/${expected.repository}/releases/${endpoint}`));
    observedVersions[side] = release.tag_name;
    if (scope === "runtime" && release.tag_name !== releaseTag) throw new Error(`Published event tag mismatch: requested ${releaseTag}, actual ${release.tag_name}`);
    if (scope === "runtime" && releaseTag !== expected.tag) throw new Error(`Reviewed runtime baseline pending: expected ${expected.tag}, published ${releaseTag}; reconcile accepted inventory then run a fresh check`);
    if (expected.version !== expected.tag || (expected.expectedVersion !== undefined && expected.expectedVersion !== expected.tag)) throw new Error(`Inconsistent reviewed baseline version: ${expected.repository}`);
    checkReleaseInventory(release, expected);
    return { repository: expected.repository, expectedVersion: expected.tag, actualVersion: release.tag_name, assets: release.assets.length };
  })));
  if (scope === "pair") {
    await check("releasePair", async () => {
      if (baseline.runtime.version !== baseline.connector.version) throw new Error(`Reviewed release pair differs: runtime ${baseline.runtime.version}, connector ${baseline.connector.version}`);
      if (!observedVersions.runtime || !observedVersions.connector) throw new Error("Cannot verify release pair because a public release identity is unavailable");
      if (observedVersions.runtime !== observedVersions.connector) throw new Error(`Published release pair differs: runtime ${observedVersions.runtime}, connector ${observedVersions.connector}`);
      return { version: observedVersions.runtime };
    });
  } else {
    checks.connectorRelease = { status: "skipped", reason: "Runtime publication precedes connector publication; run the paired monitor after release reconciliation" };
  }
  const documents = {};
  await Promise.all(["runtime-ed25519-public.pem", "runtime.manifest.json", "runtime-update.json", "runtime-index.json"].map(name => check(`metadata:${name}`, async () => {
    const expected = baseline.runtime.assets.find(asset => asset.name === name);
    if (!expected) throw new Error(`Reviewed runtime baseline is missing metadata: ${name}`);
    const bytes = await read(`https://github.com/${baseline.runtime.repository}/releases/download/${baseline.runtime.tag}/${name}`);
    const digest = `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
    if (bytes.length !== expected.size || digest !== expected.digest) throw new Error(`Downloaded release metadata changed: ${name}; expected size=${expected.size} digest=${expected.digest}, actual size=${bytes.length} digest=${digest}`);
    documents[name] = bytes.toString("utf8");
    return { version: baseline.runtime.tag, digest };
  })));
  if (documents["runtime.manifest.json"] && documents["runtime-ed25519-public.pem"]) {
    await check("packageManifestSignature", async () => {
      const manifest = JSON.parse(documents["runtime.manifest.json"]);
      verifyPackageManifest(manifest, documents["runtime-ed25519-public.pem"]);
      if (manifest.version !== baseline.runtime.version) throw new Error(`Signed package version mismatch: expected ${baseline.runtime.version}, actual ${manifest.version}`);
      return { version: manifest.version };
    });
  } else {
    checks.packageManifestSignature = { status: "skipped", reason: "Requires hash-verified package manifest and public key; see metadata failures" };
  }
  if (scope === "pair") {
    await check("catalogue", async () => {
      const bytes = await read(`https://raw.githubusercontent.com/${baseline.runtime.repository}/main/catalogue/v1/current.json`, { allowMissing: !catalogueActivated });
      if (!bytes) return { status: "not-activated", reason: "Public endpoint missing before initial activation" };
      const envelope = JSON.parse(bytes);
      const result = validateCatalogue(envelope, cataloguePolicy, now);
      const runtimeVersion = observedVersions.runtime ?? baseline.runtime.version;
      checkCatalogueCompatibility(envelope.payload.runtimeCompatibility, runtimeVersion);
      return { ...result, runtimeVersion, runtimeVersionSource: observedVersions.runtime ? "public-release" : "reviewed-baseline", compatibility: envelope.payload.runtimeCompatibility };
    });
  } else {
    checks.catalogue = { status: "skipped", reason: "Catalogue coverage is checked with the complete paired release" };
  }
  return { status: Object.values(checks).some(result => result.status === "failed") ? "failed" : "passed", scope, checkedAt: now.toISOString(),
    baselineVersions: { runtime: baseline.runtime.version, connector: baseline.connector.version }, observedVersions,
    packageBinariesRedownloaded: false, checks };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const event = process.env.GITHUB_EVENT_NAME === "release" ? JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8")) : undefined;
    const baseline = JSON.parse(readFileSync("config/release-baseline.json", "utf8"));
    const options = commandMonitorOptions(process.argv.slice(2), { eventName: process.env.GITHUB_EVENT_NAME, event, repository: baseline.runtime.repository });
    const result = await monitor({ baseline, cataloguePolicy: JSON.parse(readFileSync("config/catalogue-policy.json", "utf8")),
      catalogueActivated: process.env.CHATOBBY_CATALOGUE_AUTOMATION_ENABLED === "true", ...options });
    const text = JSON.stringify(result, null, 2); console.log(text);
    if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `\`\`\`json\n${text}\n\`\`\`\n`);
    if (result.status === "failed") process.exitCode = 1;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
