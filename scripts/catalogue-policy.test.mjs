import { test } from "node:test";
import assert from "node:assert/strict";
import { createHash, generateKeyPairSync, sign } from "node:crypto";
import { canonicalJson, validateCatalogue, validateCataloguePullRequest } from "./catalogue-policy.mjs";
import { checkReleaseInventory, readBounded } from "./monitor-public.mjs";
const { privateKey, publicKey } = generateKeyPairSync("ed25519");
const policy = { minimumRuntimeVersion: "0.5.3", maximumExclusiveRuntimeVersion: "0.5.4", keyId: "catalogue-current",
  publicKeyPem: publicKey.export({ type: "spki", format: "pem" }), publicKeySpkiSha256: createHash("sha256").update(publicKey.export({ type: "spki", format: "der" })).digest("hex"), models: { "example/base": ["text-input"] } };
const now = new Date("2026-11-02T00:00:00.000Z");
const operation = { type: "model.add", providerId: "example", modelId: "new", templateModelId: "base", name: "New", capabilityIds: ["text-input"], cost: { input: 1, output: 1, cacheRead: 0, cacheWrite: 0 }, contextWindow: 1000, maxTokens: 100 };
function envelope(change = {}) {
  const payload = { schemaVersion: 2, product: "Chatobby", generatedAt: now.toISOString(), expiresAt: "2026-11-09T00:00:00.000Z", runtimeCompatibility: { minimum: "0.5.3", maximumExclusive: "0.5.4" }, operations: [structuredClone(operation)], ...change };
  const bytes = Buffer.from(canonicalJson(payload));
  return { schemaVersion: 2, contentSha256: createHash("sha256").update(bytes).digest("hex"), payload, signature: { algorithm: "ed25519", keyId: policy.keyId, value: sign(null, bytes, privateKey).toString("base64") } };
}
test("accepts compatible data and rejects tampering, expiry, capability expansion and execution fields", () => {
  assert.equal(validateCatalogue(envelope(), policy, now).operations, 1);
  const bad = envelope(); bad.payload.operations[0].name = "tampered"; assert.throws(() => validateCatalogue(bad, policy, now), /signature/);
  assert.throws(() => validateCatalogue(envelope(), policy, new Date("2026-11-09")), /lifetime/);
  assert.throws(() => validateCatalogue(envelope({ operations: [{ ...operation, capabilityIds: ["text-input", "image-input"] }] }), policy, now), /capability/);
  assert.throws(() => validateCatalogue(envelope({ operations: [{ ...operation, baseUrl: "https://evil.example" }] }), policy, now), /fields/);
  assert.throws(() => validateCatalogue(envelope({ operations: [{ ...operation, providerId: "unknown" }] }), policy, now), /eligible/);
  assert.throws(() => validateCatalogue(envelope({ operations: [{ type: "model.retire" }] }), policy, now), /explicit review/);
});
test("automatic review cannot smuggle code, use a fork, or delete the catalogue", () => {
  const repo = "TitanicEclair/chatobby-runtime";
  const pr = { base: { ref: "main", repo: { full_name: repo } }, head: { ref: "automation/model-catalogue-current", repo: { full_name: repo }, sha: "a".repeat(40) } };
  const files = [{ filename: "catalogue/v1/current.json", status: "modified" }];
  validateCataloguePullRequest(pr, files, repo);
  assert.throws(() => validateCataloguePullRequest(pr, [...files, { filename: "scripts/check-catalogue-pr.mjs", status: "modified" }], repo), /only/);
  assert.throws(() => validateCataloguePullRequest({ ...pr, head: { ...pr.head, repo: { full_name: "other/fork" } } }, files, repo), /identity/);
  assert.throws(() => validateCataloguePullRequest(pr, [{ ...files[0], status: "removed" }], repo), /only/);
});
test("monitor bounds responses and distinguishes initial activation hold from endpoint failure", async () => {
  const fetcher = async () => new Response("missing", { status: 404 });
  assert.equal(await readBounded("https://example.com", { fetcher, allowMissing: true }), undefined);
  await assert.rejects(readBounded("https://example.com", { fetcher }), /404/);
  await assert.rejects(readBounded("https://example.com", { fetcher: async () => new Response(new Uint8Array(2 * 1024 * 1024 + 1)) }), /2 MiB/);
  const expected = { repository: "example/repo", tag: "0.5.3", assets: [{ name: "asset", size: 1, digest: "sha256:abc" }] };
  assert.throws(() => checkReleaseInventory({ tag_name: "0.5.3", assets: [{ name: "asset", size: 2, digest: "sha256:abc" }] }, expected), /changed/);
});
