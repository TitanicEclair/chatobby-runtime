import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash, generateKeyPairSync, sign } from "node:crypto";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, readdirSync, readFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { captureInventory, captureBaseline } from "./capture-release-baseline.mjs";

function fixture(t) {
  const directory = mkdtempSync(join(tmpdir(), "release-baseline-"));
  t.after(() => rmSync(directory, { recursive: true, force: true }));
  const bytes = Buffer.from("accepted immutable bytes");
  writeFileSync(join(directory, "asset.bin"), bytes);
  const release = { tag_name: "0.5.4", draft: false, prerelease: false, published_at: "2026-11-03T09:24:26Z",
    assets: [{ name: "asset.bin", size: bytes.length, digest: `sha256:${createHash("sha256").update(bytes).digest("hex")}`, updated_at: "2026-11-03T09:24:26Z" }] };
  const urls = [];
  return { directory, release, urls, options: { repository: "example/runtime", version: "0.5.4", directory,
    read: async url => { urls.push(url); return Buffer.from(JSON.stringify(release)); } } };
}

test("captures explicit published tag only after accepted bytes match", async t => {
  const f = fixture(t);
  const result = await captureInventory(f.options);
  assert.deepEqual(f.urls, ["https://api.github.com/repos/example/runtime/releases/tags/0.5.4"]);
  assert.equal(result.tag, "0.5.4");
  assert.equal(result.assets[0].digest, f.release.assets[0].digest);
});

test("rejects changed live bytes and changed local accepted bytes", async t => {
  const f = fixture(t);
  const digest = f.release.assets[0].digest;
  f.release.assets[0].digest = `sha256:${"0".repeat(64)}`;
  await assert.rejects(captureInventory(f.options), /differs from accepted artifact/);
  f.release.assets[0].digest = digest;
  writeFileSync(join(f.directory, "asset.bin"), "changed local bytes");
  await assert.rejects(captureInventory(f.options), /differs from accepted artifact/);
  f.release.assets[0].digest = undefined;
  await assert.rejects(captureInventory(f.options), /Missing or invalid/);
});

test("rejects missing, extra, duplicate or path-traversing release assets", async t => {
  const f = fixture(t);
  const original = structuredClone(f.release.assets[0]);
  f.release.assets = [];
  await assert.rejects(captureInventory(f.options), /inventory differs/);
  f.release.assets = [original, { ...original, name: "extra.bin" }];
  await assert.rejects(captureInventory(f.options), /inventory differs/);
  f.release.assets = [original, original];
  await assert.rejects(captureInventory(f.options), /duplicate/);
  f.release.assets = [{ ...original, name: "../asset.bin" }];
  await assert.rejects(captureInventory(f.options), /Invalid/);
});

test("rejects draft, prerelease and wrong-tag inventory", async t => {
  const f = fixture(t);
  for (const change of [{ draft: true }, { prerelease: true }, { tag_name: "0.5.3" }]) {
    const original = structuredClone(f.release);
    Object.assign(f.release, change);
    await assert.rejects(captureInventory(f.options), /Expected published stable/);
    Object.assign(f.release, original);
  }
  await assert.rejects(captureInventory({ ...f.options, version: "latest" }), /explicit stable/);
});

test("paired capture rejects inconsistent artifact versions and invalid signatures before reading GitHub", async t => {
  const root = mkdtempSync(join(tmpdir(), "baseline-pair-"));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const runtimeDirectory = join(root, "runtime"), connectorDirectory = join(root, "connector");
  mkdirSync(runtimeDirectory); mkdirSync(connectorDirectory);
  const version = "0.5.4";
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  const payload = { schemaVersion: 2, version, protocolVersion: 4, minimumPluginVersion: "0.5.0", maximumPluginVersion: "0.5.x", platform: "win32", arch: "x64", executable: "chatobby.exe", files: [] };
  const manifest = { ...payload, signatureAlgorithm: "ed25519", signature: sign(null, Buffer.from(JSON.stringify(payload)), privateKey).toString("base64") };
  const put = (dir, name, value) => writeFileSync(join(dir, name), JSON.stringify(value));
  put(runtimeDirectory, "runtime.manifest.json", manifest);
  put(runtimeDirectory, "runtime-index.json", { version });
  put(runtimeDirectory, "runtime-update.json", { version });
  put(runtimeDirectory, "release-descriptor.json", { productVersion: version, runtimeVersion: version });
  writeFileSync(join(runtimeDirectory, "runtime-ed25519-public.pem"), publicKey.export({ type: "spki", format: "pem" }));
  put(connectorDirectory, "manifest.json", { version });
  let calls = 0;
  const read = async url => {
    calls++;
    const dir = url.includes("chatobby-runtime") ? runtimeDirectory : connectorDirectory;
    return Buffer.from(JSON.stringify({ tag_name: version, draft: false, prerelease: false, assets: readdirSync(dir).map(name => {
      const bytes = readFileSync(join(dir, name));
      return { name, size: bytes.length, digest: `sha256:${createHash("sha256").update(bytes).digest("hex")}` };
    }) }));
  };
  const input = { version, runtimeDirectory, connectorDirectory, read };
  assert.equal((await captureBaseline(input)).runtime.version, version);
  calls = 0;
  for (const [dir, name, original, changed] of [
    [connectorDirectory, "manifest.json", { version }, { version: "0.5.3" }],
    [runtimeDirectory, "runtime-update.json", { version }, { version: "0.5.3" }],
    [runtimeDirectory, "release-descriptor.json", { productVersion: version, runtimeVersion: version }, { productVersion: version, runtimeVersion: "0.5.3" }],
  ]) {
    put(dir, name, changed);
    await assert.rejects(captureBaseline(input), /versions must match/);
    put(dir, name, original);
  }
  put(runtimeDirectory, "runtime.manifest.json", { ...manifest, signature: Buffer.alloc(64).toString("base64") });
  await assert.rejects(captureBaseline(input), /signature mismatch/);
  assert.equal(calls, 0);
});
