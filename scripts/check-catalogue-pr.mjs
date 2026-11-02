import { appendFileSync, readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { validateCatalogue, validateCataloguePullRequest } from "./catalogue-policy.mjs";
const repository = "TitanicEclair/chatobby-runtime";
if (process.env.GITHUB_REPOSITORY !== repository) throw new Error("Public catalogue repository mismatch");
const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
const number = event.pull_request?.number;
if (!Number.isSafeInteger(number)) throw new Error("Pull request event required");
const api = (path) => JSON.parse(execFileSync("gh", ["api", path], { encoding: "utf8", maxBuffer: 4 * 1024 * 1024 }));
const pr = api(`repos/${repository}/pulls/${number}`);
const files = api(`repos/${repository}/pulls/${number}/files?per_page=100`);
if (pr.changed_files !== files.length) throw new Error("Truncated pull-request inventory");
const touchesCatalogue = files.some(file => file.filename === "catalogue/v1/current.json");
if (!/^[a-f0-9]{40}$/.test(pr.head.sha)) throw new Error("Invalid head SHA");
const status = (state) => execFileSync("gh", ["api", "--method", "POST", `repos/${repository}/statuses/${pr.head.sha}`, "-f", "context=catalogue-data-policy", "-f", `state=${state}`, "-f", `target_url=https://github.com/${repository}/actions/runs/${process.env.GITHUB_RUN_ID}`], { stdio: "ignore" });
status("pending");
try {
if (!touchesCatalogue) { console.log("No catalogue data changed; this status does not approve or merge other changes."); status("success"); process.exit(0); }
validateCataloguePullRequest(pr, files, repository);
const file = api(`repos/${repository}/contents/catalogue/v1/current.json?ref=${pr.head.sha}`);
if (file.encoding !== "base64" || file.size > 2 * 1024 * 1024) throw new Error("Catalogue transfer bound exceeded");
const result = validateCatalogue(JSON.parse(Buffer.from(file.content, "base64").toString("utf8")), JSON.parse(readFileSync("config/catalogue-policy.json", "utf8")));
appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${JSON.stringify({ head: pr.head.sha, ...result })}\n`);
if (process.env.GITHUB_OUTPUT) appendFileSync(process.env.GITHUB_OUTPUT, `eligible=true\nhead=${pr.head.sha}\nnumber=${number}\n`);

status("success");
} catch (error) { status("failure"); throw error; }
