import { createHash } from "node:crypto";
import { createReadStream, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { resolve, join } from "node:path";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { readBounded, verifyPackageManifest } from "./monitor-public.mjs";

const repositories = { runtime: "TitanicEclair/chatobby-runtime", connector: "TitanicEclair/chatobby-obsidian" };

// Capture only explicitly named published versions, and require independent,
// already-accepted local artifacts. Never promote /latest into its own baseline.
export async function captureInventory({ repository, version, directory, read = readBounded }) {
  if (!/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$/.test(version)) throw new Error("Expected an explicit stable x.y.z version");
  const entries = readdirSync(directory, { withFileTypes: true });
  if (!entries.length || entries.some(entry => !entry.isFile())) throw new Error(`Accepted artifact directory must contain only regular files: ${directory}`);
  const release = JSON.parse(await read(`https://api.github.com/repos/${repository}/releases/tags/${version}`));
  if (release.tag_name !== version || release.draft !== false || release.prerelease !== false || !Array.isArray(release.assets)) throw new Error(`Expected published stable ${repository}@${version}`);
  const names = release.assets.map(asset => asset.name);
  if (names.some(name => typeof name !== "string" || !/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(name)) || new Set(names).size !== names.length) throw new Error("Invalid or duplicate release asset names");
  if (JSON.stringify([...names].sort()) !== JSON.stringify(entries.map(entry => entry.name).sort())) throw new Error(`Published inventory differs from accepted artifacts: ${repository}`);
  const assets = [];
  for (const asset of [...release.assets].sort((a, b) => a.name.localeCompare(b.name, "en"))) {
    if (!Number.isSafeInteger(asset.size) || asset.size < 0 || !/^sha256:[a-f0-9]{64}$/.test(asset.digest ?? "")) throw new Error(`Missing or invalid GitHub size/digest: ${asset.name}`);
    const hash = createHash("sha256");
    let size = 0;
    for await (const bytes of createReadStream(join(directory, asset.name))) { hash.update(bytes); size += bytes.length; }
    const digest = `sha256:${hash.digest("hex")}`;
    if (size !== asset.size || digest !== asset.digest) throw new Error(`Published asset differs from accepted artifact: ${repository}/${asset.name}`);
    assets.push({ name: asset.name, size, digest, updatedAt: asset.updated_at });
  }
  return { repository, expectedVersion: version, tag: version, version,
    url: `https://github.com/${repository}/releases/tag/${version}`, publishedAt: release.published_at, assets };
}

export async function captureBaseline({ version, runtimeDirectory, connectorDirectory, read = readBounded }) {
  const json = (directory, name) => JSON.parse(readFileSync(join(directory, name), "utf8"));
  const manifest = json(runtimeDirectory, "runtime.manifest.json");
  const index = json(runtimeDirectory, "runtime-index.json");
  const update = json(runtimeDirectory, "runtime-update.json");
  const descriptor = json(runtimeDirectory, "release-descriptor.json");
  const connector = json(connectorDirectory, "manifest.json");
  if ([manifest.version, index.version, update.version, descriptor.productVersion, descriptor.runtimeVersion, connector.version].some(value => value !== version)) throw new Error("Accepted runtime and connector artifact versions must match the requested version");
  verifyPackageManifest(manifest, readFileSync(join(runtimeDirectory, "runtime-ed25519-public.pem"), "utf8"));
  const [runtime, connectorInventory] = await Promise.all([
    captureInventory({ repository: repositories.runtime, version, directory: runtimeDirectory, read }),
    captureInventory({ repository: repositories.connector, version, directory: connectorDirectory, read }),
  ]);
  return { schemaVersion: 1, runtime, connector: connectorInventory };
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const { values } = parseArgs({ options: { version: { type: "string" }, "runtime-dir": { type: "string" }, "connector-dir": { type: "string" }, output: { type: "string" } } });
  if (!values.version || !values["runtime-dir"] || !values["connector-dir"] || !values.output) throw new Error("Usage: node scripts/capture-release-baseline.mjs --version X.Y.Z --runtime-dir <accepted-runtime-assets> --connector-dir <accepted-plugin-assets> --output <new-review-file>");
  const baseline = await captureBaseline({ version: values.version, runtimeDirectory: resolve(values["runtime-dir"]), connectorDirectory: resolve(values["connector-dir"]) });
  writeFileSync(resolve(values.output), `${JSON.stringify(baseline, null, 2)}\n`, { flag: "wx" });
  console.log(JSON.stringify({ status: "ready-for-review", version: values.version, runtimeAssets: baseline.runtime.assets.length, connectorAssets: baseline.connector.assets.length, output: resolve(values.output) }));
}
