import { createHash, createPublicKey, verify } from "node:crypto";
import { appendFileSync, readFileSync } from "node:fs";
import { validateCatalogue } from "./catalogue-policy.mjs";

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
  if (actual.tag_name !== expected.tag || actual.draft || actual.prerelease || actual.assets.length !== expected.assets.length) throw new Error(`Unexpected release identity: ${expected.repository}`);
  for (const asset of expected.assets) {
    const live = actual.assets.find(item => item.name === asset.name);
    if (!live || live.size !== asset.size || live.digest !== asset.digest) throw new Error(`Release asset changed: ${expected.repository}/${asset.name}`);
  }
}

export function verifyPackageManifest(manifest, publicKeyPem) {
  const payload = JSON.stringify({ schemaVersion: manifest.schemaVersion, version: manifest.version, protocolVersion: manifest.protocolVersion,
    minimumPluginVersion: manifest.minimumPluginVersion, maximumPluginVersion: manifest.maximumPluginVersion, platform: manifest.platform,
    arch: manifest.arch, executable: manifest.executable,
    files: [...manifest.files].sort((a,b) => a.path.localeCompare(b.path)).map(file => ({ path: file.path, size: file.size, sha256: file.sha256, kind: file.kind })) });
  if (manifest.signatureAlgorithm !== "ed25519" || !verify(null, Buffer.from(payload), createPublicKey(publicKeyPem), Buffer.from(manifest.signature, "base64"))) throw new Error("Runtime package manifest signature mismatch");
}

export async function monitor({ baseline, cataloguePolicy, catalogueActivated, read = readBounded }) {
  for (const expected of [baseline.runtime, baseline.connector]) {
    const release = JSON.parse(await read(`https://api.github.com/repos/${expected.repository}/releases/latest`));
    checkReleaseInventory(release, expected);
  }
  const documents = {};
  for (const name of ["runtime-ed25519-public.pem", "runtime.manifest.json", "runtime-update.json", "runtime-index.json"]) {
    const bytes = await read(`https://github.com/${baseline.runtime.repository}/releases/download/${baseline.runtime.tag}/${name}`);
    const expected = baseline.runtime.assets.find(asset => asset.name === name);
    if (bytes.length !== expected.size || `sha256:${createHash("sha256").update(bytes).digest("hex")}` !== expected.digest) throw new Error(`Downloaded release metadata changed: ${name}`);
    documents[name] = bytes.toString("utf8");
  }
  verifyPackageManifest(JSON.parse(documents["runtime.manifest.json"]), documents["runtime-ed25519-public.pem"]);
  const catalogueBytes = await read(`https://raw.githubusercontent.com/${baseline.runtime.repository}/main/catalogue/v1/current.json`, { allowMissing: !catalogueActivated });
  const catalogue = catalogueBytes ? validateCatalogue(JSON.parse(catalogueBytes), cataloguePolicy) : { status: "not-activated", publicEndpoint: "missing as expected before initial approval" };
  return { checkedAt: new Date().toISOString(), runtimeVersion: baseline.runtime.version, connectorVersion: baseline.connector.version,
    releaseAssets: "identities and GitHub digests match; small signed metadata downloaded and verified", packageBinariesRedownloaded: false, catalogue };
}

if (process.argv[1] && new URL(import.meta.url).pathname.endsWith(process.argv[1].replaceAll("\\", "/"))) {
  const result = await monitor({ baseline: JSON.parse(readFileSync("config/release-baseline.json", "utf8")), cataloguePolicy: JSON.parse(readFileSync("config/catalogue-policy.json", "utf8")), catalogueActivated: process.env.CHATOBBY_CATALOGUE_AUTOMATION_ENABLED === "true" });
  const text = JSON.stringify(result, null, 2); console.log(text);
  if (process.env.GITHUB_STEP_SUMMARY) appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${text}\n`);
}
