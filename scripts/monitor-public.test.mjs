import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash, generateKeyPairSync, sign } from "node:crypto";
import { canonicalJson } from "./catalogue-policy.mjs";
import { checkCatalogueCompatibility, checkReleaseInventory, commandMonitorOptions, eventMonitorOptions, monitor } from "./monitor-public.mjs";

// The fixture signs real bounded metadata and a catalogue. Its reader rejects
// every unlisted URL so a test cannot accidentally use live data or credentials.
function fixture({ runtimeVersion = "0.5.4", connectorVersion = runtimeVersion, minimum = "0.5.3", maximumExclusive = "0.5.5" } = {}) {
  const now = new Date("2026-11-04T00:00:00.000Z");
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  const publicKeyPem = publicKey.export({ type: "spki", format: "pem" });
  const hash = bytes => createHash("sha256").update(bytes).digest("hex");
  const manifestPayload = { schemaVersion: 1, version: runtimeVersion, protocolVersion: 1, minimumPluginVersion: runtimeVersion,
    maximumPluginVersion: runtimeVersion, platform: "win32", arch: "x64", executable: "chatobby.exe", files: [] };
  const manifest = { ...manifestPayload, signatureAlgorithm: "ed25519", signature: sign(null, Buffer.from(JSON.stringify(manifestPayload)), privateKey).toString("base64") };
  const documents = {
    "runtime-ed25519-public.pem": Buffer.from(publicKeyPem),
    "runtime.manifest.json": Buffer.from(JSON.stringify(manifest)),
    "runtime-update.json": Buffer.from(JSON.stringify({ version: runtimeVersion })),
    "runtime-index.json": Buffer.from(JSON.stringify({ version: runtimeVersion })),
  };
  const runtime = { repository: "owner/runtime", tag: runtimeVersion, version: runtimeVersion, assets: Object.entries(documents).map(([name, bytes]) => ({ name, size: bytes.length, digest: `sha256:${hash(bytes)}` })) };
  const connector = { repository: "owner/connector", tag: connectorVersion, version: connectorVersion, assets: [{ name: "main.js", size: 1, digest: `sha256:${hash("a")}` }] };
  const baseline = { runtime, connector };
  const cataloguePolicy = { minimumRuntimeVersion: minimum, maximumExclusiveRuntimeVersion: maximumExclusive, keyId: "fixture-key",
    publicKeyPem, publicKeySpkiSha256: hash(publicKey.export({ type: "spki", format: "der" })), models: {} };
  const payload = { schemaVersion: 2, product: "Chatobby", generatedAt: now.toISOString(), expiresAt: "2026-11-10T00:00:00.000Z",
    runtimeCompatibility: { minimum, maximumExclusive }, operations: [] };
  const bytes = Buffer.from(canonicalJson(payload));
  const catalogue = { schemaVersion: 2, contentSha256: hash(bytes), payload, signature: { algorithm: "ed25519", keyId: "fixture-key", value: sign(null, bytes, privateKey).toString("base64") } };
  const responses = new Map();
  for (const expected of [runtime, connector]) {
    const release = { tag_name: expected.tag, draft: false, prerelease: false, assets: structuredClone(expected.assets) };
    for (const endpoint of ["latest", `tags/${expected.tag}`]) responses.set(`https://api.github.com/repos/${expected.repository}/releases/${endpoint}`, Buffer.from(JSON.stringify(release)));
  }
  for (const [name, bytes] of Object.entries(documents)) responses.set(`https://github.com/${runtime.repository}/releases/download/${runtime.tag}/${name}`, bytes);
  const catalogueUrl = `https://raw.githubusercontent.com/${runtime.repository}/main/catalogue/v1/current.json`;
  responses.set(catalogueUrl, Buffer.from(JSON.stringify(catalogue)));
  const requested = [];
  const read = async url => { requested.push(url); if (!responses.has(url)) throw new Error(`Unexpected fixture URL: ${url}`); const result = responses.get(url); if (result instanceof Error) throw result; return result; };
  return { baseline, cataloguePolicy, catalogueActivated: true, now, read, responses, requested, catalogueUrl };
}

test("reports a complete verified pair and catalogue covering the observed runtime", async () => {
  const result = await monitor(fixture());
  assert.equal(result.status, "passed");
  assert.equal(result.scope, "pair");
  assert.equal(result.checks.catalogue.runtimeVersion, "0.5.4");
  assert.equal(result.checks.catalogue.runtimeVersionSource, "public-release");
  assert.equal(result.checks.packageManifestSignature.status, "passed");
  assert.equal(result.packageBinariesRedownloaded, false);
});

test("distinguishes expected/actual versions, missing, extra and changed assets", () => {
  const expected = { repository: "owner/runtime", tag: "0.5.3", assets: [{ name: "changed", size: 1, digest: "sha256:old" }, { name: "missing", size: 2, digest: "sha256:missing" }] };
  const actual = { tag_name: "0.5.4", draft: false, prerelease: false, assets: [{ name: "changed", size: 3, digest: "sha256:new" }, { name: "extra", size: 1, digest: "sha256:extra" }] };
  assert.throws(() => checkReleaseInventory(actual, expected), error => {
    assert.match(error.message, /expected 0\.5\.3, actual 0\.5\.4/);
    assert.match(error.message, /Missing release asset: owner\/runtime\/missing/);
    assert.match(error.message, /Unexpected release asset: owner\/runtime\/extra/);
    assert.match(error.message, /expected size=1 digest=sha256:old, actual size=3 digest=sha256:new/);
    return true;
  });
});

test("collects catalogue and connector failures after a stale runtime baseline", async () => {
  const data = fixture({ runtimeVersion: "0.5.3", maximumExclusive: "0.5.4" });
  for (const repo of ["runtime", "connector"]) {
    const url = `https://api.github.com/repos/owner/${repo}/releases/latest`;
    const release = JSON.parse(data.responses.get(url)); release.tag_name = "0.5.4";
    data.responses.set(url, Buffer.from(JSON.stringify(release)));
  }
  const result = await monitor(data);
  assert.equal(result.status, "failed");
  assert.match(result.checks.runtimeRelease.error, /expected 0\.5\.3, actual 0\.5\.4/);
  assert.match(result.checks.connectorRelease.error, /expected 0\.5\.3, actual 0\.5\.4/);
  assert.match(result.checks.catalogue.error, /incompatible with runtime 0\.5\.4/);
  assert.equal(result.checks.packageManifestSignature.status, "passed");
});

test("fresh valid catalogue fails when its exclusive upper bound equals current runtime", async () => {
  const result = await monitor(fixture({ maximumExclusive: "0.5.4" }));
  assert.equal(result.status, "failed");
  assert.equal(result.checks.runtimeRelease.status, "passed");
  assert.match(result.checks.catalogue.error, /supported range >=0\.5\.3 <0\.5\.4/);
});

test("runtime publication checks its event tag without contacting the older connector or catalogue", async () => {
  const data = fixture({ connectorVersion: "0.5.3", maximumExclusive: "0.5.4" });
  const result = await monitor({ ...data, scope: "runtime", releaseTag: "0.5.4", releaseRepository: "owner/runtime" });
  assert.equal(result.status, "passed");
  assert.equal(result.checks.connectorRelease.status, "skipped");
  assert.equal(result.checks.catalogue.status, "skipped");
  assert.ok(data.requested.includes("https://api.github.com/repos/owner/runtime/releases/tags/0.5.4"));
  assert.ok(data.requested.every(url => !url.includes("owner/connector") && !url.includes("catalogue/v1") && !url.endsWith("latest")));
  const paired = await monitor(data);
  assert.equal(paired.status, "failed");
  assert.match(paired.checks.releasePair.error, /Reviewed release pair differs/);
});

test("runtime event cannot adopt an unreviewed newer release inventory", async () => {
  const data = fixture({ runtimeVersion: "0.5.3" });
  const url = "https://api.github.com/repos/owner/runtime/releases/tags/0.5.4";
  data.responses.set(url, Buffer.from(JSON.stringify({ tag_name: "0.5.4", assets: [] })));
  const result = await monitor({ ...data, scope: "runtime", releaseTag: "0.5.4", releaseRepository: "owner/runtime" });
  assert.equal(result.status, "failed");
  assert.match(result.checks.runtimeRelease.error, /Reviewed runtime baseline pending: expected 0\.5\.3, published 0\.5\.4; reconcile accepted inventory then run a fresh check/);
  assert.equal(data.baseline.runtime.tag, "0.5.3");
});

test("metadata drift does not suppress unrelated metadata or catalogue checks", async () => {
  const data = fixture();
  data.responses.set("https://github.com/owner/runtime/releases/download/0.5.4/runtime.manifest.json", Buffer.from("tampered"));
  data.responses.set(data.catalogueUrl, new Error("Catalogue endpoint unavailable"));
  const result = await monitor(data);
  assert.equal(result.status, "failed");
  assert.equal(result.checks["metadata:runtime.manifest.json"].status, "failed");
  assert.equal(result.checks["metadata:runtime-index.json"].status, "passed");
  assert.equal(result.checks.packageManifestSignature.status, "skipped");
  assert.match(result.checks.catalogue.error, /endpoint unavailable/);
});

test("matching metadata hash cannot hide an invalid package signature", async () => {
  const data = fixture();
  const url = "https://github.com/owner/runtime/releases/download/0.5.4/runtime.manifest.json";
  const manifest = JSON.parse(data.responses.get(url));
  manifest.signature = Buffer.alloc(64).toString("base64");
  const bytes = Buffer.from(JSON.stringify(manifest));
  data.responses.set(url, bytes);
  const asset = data.baseline.runtime.assets.find(asset => asset.name === "runtime.manifest.json");
  asset.size = bytes.length;
  asset.digest = `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
  const result = await monitor(data);
  assert.equal(result.status, "failed");
  assert.equal(result.checks["metadata:runtime.manifest.json"].status, "passed");
  assert.match(result.checks.packageManifestSignature.error, /signature mismatch/);
  assert.equal(result.checks.catalogue.status, "passed");
});

test("missing release identity still reports catalogue validation using the reviewed baseline", async () => {
  const data = fixture();
  data.responses.set("https://api.github.com/repos/owner/runtime/releases/latest", new Error("Release endpoint unavailable"));
  const result = await monitor(data);
  assert.equal(result.status, "failed");
  assert.equal(result.checks.catalogue.status, "passed");
  assert.equal(result.checks.catalogue.runtimeVersionSource, "reviewed-baseline");
  assert.equal(result.checks.releasePair.status, "failed");
});

test("stable semver comparison uses numeric components and both bounds", () => {
  checkCatalogueCompatibility({ minimum: "0.5.9", maximumExclusive: "0.6.0" }, "0.5.10");
  for (const version of ["0.5.8", "0.6.0", "0.6.1", "v0.5.10", "0.5.10-preview", "00.5.10"]) {
    assert.throws(() => checkCatalogueCompatibility({ minimum: "0.5.9", maximumExclusive: "0.6.0" }, version));
  }
});

test("event and explicit CLI scope selection cannot accidentally skip paired checks", () => {
  const event = { action: "published", repository: { full_name: "owner/runtime" }, release: { tag_name: "0.5.4" } };
  const context = { eventName: "release", event, repository: "owner/runtime" };
  assert.deepEqual(commandMonitorOptions([], context), { scope: "runtime", releaseTag: "0.5.4", releaseRepository: "owner/runtime" });
  assert.deepEqual(eventMonitorOptions("schedule"), { scope: "pair" });
  assert.deepEqual(eventMonitorOptions("workflow_dispatch"), { scope: "pair" });
  assert.deepEqual(commandMonitorOptions(["--scope", "pair"], context), { scope: "pair" });
  assert.deepEqual(commandMonitorOptions(["--scope", "runtime", "--runtime-tag", "0.5.4"], { repository: "owner/runtime" }), { scope: "runtime", releaseTag: "0.5.4", releaseRepository: "owner/runtime" });
  assert.throws(() => eventMonitorOptions("release", {}), /published runtime release/);
  assert.throws(() => commandMonitorOptions(["--scope", "runtime"], context), /Use --scope/);
  assert.throws(() => commandMonitorOptions(["--runtime-tag", "0.5.4"], context), /Use --scope/);
  assert.throws(() => commandMonitorOptions(["--scope", "pair", "--runtime-tag", "0.5.4"], context), /Use --scope/);
});
