import { createHash, createPublicKey, verify } from "node:crypto";

export function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (value && typeof value === "object") return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(",")}}`;
  return JSON.stringify(value);
}
function record(value, keys, label) {
  if (!value || typeof value !== "object" || Array.isArray(value) || Object.keys(value).sort().join() !== [...keys].sort().join()) throw new Error(`Unexpected fields in ${label}`);
}
function text(value, limit, label) { if (typeof value !== "string" || !value.length || value.length > limit || /[\x00-\x1f\x7f]/.test(value)) throw new Error(`Invalid ${label}`); }
function modelId(value) {
  if (typeof value !== "string" || !/^[A-Za-z0-9@~][A-Za-z0-9@~./:-]{0,255}$/.test(value) || /^[A-Za-z]:/.test(value) || value.split("/").some(part => !part || part === "." || part === "..")) throw new Error("Invalid model identity grammar");
}
export function validateCatalogue(value, policy, now = new Date()) {
  record(value, ["schemaVersion", "contentSha256", "payload", "signature"], "envelope");
  record(value.signature, ["algorithm", "keyId", "value"], "signature");
  record(value.payload, ["schemaVersion", "product", "generatedAt", "expiresAt", "runtimeCompatibility", "operations"], "payload");
  const { payload, signature } = value;
  if (value.schemaVersion !== 2 || payload.schemaVersion !== 2 || payload.product !== "Chatobby" || signature.algorithm !== "ed25519" || signature.keyId !== policy.keyId) throw new Error("Unsupported catalogue identity");
  record(payload.runtimeCompatibility, ["minimum", "maximumExclusive"], "compatibility");
  if (payload.runtimeCompatibility.minimum !== policy.minimumRuntimeVersion || payload.runtimeCompatibility.maximumExclusive !== policy.maximumExclusiveRuntimeVersion) throw new Error("Unproven runtime range");
  const generated = Date.parse(payload.generatedAt), expires = Date.parse(payload.expiresAt);
  if (!Number.isFinite(generated) || !Number.isFinite(expires) || new Date(generated).toISOString() !== payload.generatedAt || new Date(expires).toISOString() !== payload.expiresAt || generated > now.getTime() + 300000 || expires <= now.getTime() || expires <= generated || expires - generated > 7 * 86400000) throw new Error("Invalid catalogue lifetime");
  const bytes = Buffer.from(canonicalJson(payload));
  const key = createPublicKey(policy.publicKeyPem);
  const fingerprint = createHash("sha256").update(key.export({ type: "spki", format: "der" })).digest("hex");
  if (fingerprint !== policy.publicKeySpkiSha256 || createHash("sha256").update(bytes).digest("hex") !== value.contentSha256 || typeof signature.value !== "string" || !/^[A-Za-z0-9+/]{86}==$/.test(signature.value) || !verify(null, bytes, key, Buffer.from(signature.value, "base64"))) throw new Error("Catalogue trust or signature mismatch");
  if (!Array.isArray(payload.operations) || payload.operations.length > 4096) throw new Error("Operation bound exceeded");
  const targets = new Set();
  for (const operation of payload.operations) {
    if (!["model.update", "model.add"].includes(operation.type)) throw new Error("Provider and retirement operations require explicit review");
    record(operation, ["type", "providerId", "modelId", "name", "capabilityIds", "cost", "contextWindow", "maxTokens", ...(operation.type === "model.add" ? ["templateModelId"] : [])], "operation");
    if (typeof operation.providerId !== "string" || !/^[a-z0-9][a-z0-9._-]{0,127}$/.test(operation.providerId)) throw new Error("Invalid provider");
    modelId(operation.modelId); text(operation.name, 256, "model name");
    if (operation.type === "model.add") modelId(operation.templateModelId);
    const identity = `${operation.providerId}/${operation.modelId}`;
    if (targets.has(identity)) throw new Error("Duplicate model operation"); targets.add(identity);
    const bundled = policy.models[identity];
    const ceiling = policy.models[`${operation.providerId}/${operation.type === "model.add" ? operation.templateModelId : operation.modelId}`];
    if (!ceiling || (operation.type === "model.add" && bundled)) throw new Error("Model or template is not eligible in the released baseline");
    if (!Array.isArray(operation.capabilityIds) || !operation.capabilityIds.includes("text-input") || new Set(operation.capabilityIds).size !== operation.capabilityIds.length || operation.capabilityIds.some(capability => !ceiling.includes(capability))) throw new Error("Unsupported model capability");
    record(operation.cost, ["input", "output", "cacheRead", "cacheWrite"], "cost");
    if (Object.values(operation.cost).some(cost => typeof cost !== "number" || !Number.isFinite(cost) || cost < 0)) throw new Error("Invalid price");
    if (!Number.isSafeInteger(operation.contextWindow) || !Number.isSafeInteger(operation.maxTokens) || operation.maxTokens < 1 || operation.contextWindow < operation.maxTokens) throw new Error("Invalid model limits");
  }
  return { contentSha256: value.contentSha256, operations: payload.operations.length, expiresAt: payload.expiresAt, remainingHours: (expires - now.getTime()) / 3600000 };
}

/** Untrusted PR input is JSON only; this routine never executes proposed source. */
export function validateCataloguePullRequest(pr, files, repository) {
  if (pr.base.ref !== "main" || pr.base.repo.full_name !== repository || pr.head.repo?.full_name !== repository || pr.head.ref !== "automation/model-catalogue-current") throw new Error("Unexpected automatic catalogue review identity");
  if (files.length !== 1 || files[0].filename !== "catalogue/v1/current.json" || !["added", "modified"].includes(files[0].status)) throw new Error("Automatic catalogue review may change only the current data file");
  if (!/^[a-f0-9]{40}$/.test(pr.head.sha)) throw new Error("Invalid reviewed commit");
}
