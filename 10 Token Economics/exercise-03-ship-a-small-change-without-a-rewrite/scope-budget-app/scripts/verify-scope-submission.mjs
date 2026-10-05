import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { verifyScopeHistory } from "./scope-verification.mjs";

const appRoot = process.cwd();
const exerciseRoot = path.resolve(appRoot, "..");
const repositoryRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], { cwd: appRoot, encoding: "utf8" }).trim();
const evidenceRoot = path.join(exerciseRoot, "evidence");
const failures = [];
function json(file, label) { try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { failures.push(`missing or invalid ${label}`); return null; } }
const plan = json(path.join(evidenceRoot, "scope-plan.json"), "scope plan");
const ledger = json(path.join(evidenceRoot, "scope-budget.json"), "scope budget");
if (plan?.schemaVersion !== 1 || ledger?.schemaVersion !== 1) failures.push("plan and ledger schemaVersion must be 1");
if (plan?.maximumFiles !== 2 || plan?.maximumChangedLines !== 30) failures.push("pre-change plan must declare two files and 30 changed lines");
const allowed = ["scope-budget-app/src/migration/exportButton.mjs", "scope-budget-app/tests/export-button.test.mjs"].sort();
if (JSON.stringify([...(plan?.allowedSourceFiles ?? [])].sort()) !== JSON.stringify(allowed)) failures.push("plan allowedSourceFiles do not match the scope contract");
if (!Array.isArray(plan?.excludedPaths) || !["src/components", "src/styles.css", "package.json"].every((value) => plan.excludedPaths.includes(value))) failures.push("plan must explicitly exclude components, styles, and package changes");
if (ledger?.planned?.files !== 2 || ledger?.planned?.changedLines !== 30) failures.push("final ledger must preserve planned budget");
for (const field of ["planSha", "sourceSha"]) if (!/^[a-f0-9]{40}$/.test(ledger?.[field] ?? "")) failures.push(`${field} must be a full commit SHA`);
if (ledger?.planSha && ledger?.sourceSha) failures.push(...verifyScopeHistory({ repositoryRoot, exerciseRoot, planSha: ledger.planSha, sourceSha: ledger.sourceSha, ledger }));
const avoided = json(path.join(evidenceRoot, "avoided-work.json"), "avoided work ledger");
const expectedAvoided = ["scope-budget-app/src/migration/actionButtons.mjs", "scope-budget-app/src/components", "scope-budget-app/src/styles.css", "scope-budget-app/package.json"];
if (!Array.isArray(avoided?.entries)) failures.push("avoided-work.json must contain entries");
else for (const expectedPath of expectedAvoided) {
  const entry = avoided.entries.find((item) => item.path === expectedPath);
  if (!entry || entry.status !== "unchanged" || typeof entry.temptation !== "string" || entry.temptation.length < 20 || typeof entry.reason !== "string" || entry.reason.length < 35) failures.push(`avoided-work.json needs a substantive unchanged entry for ${expectedPath}`);
  try {
    const changed = execFileSync("git", ["diff", "--name-only", ledger?.planSha ?? "", ledger?.sourceSha ?? ""], { cwd: repositoryRoot, encoding: "utf8" }).split(/\r?\n/);
    const prefix = path.relative(repositoryRoot, exerciseRoot).split(path.sep).join("/") + "/" + expectedPath;
    if (changed.some((file) => file === prefix || file.startsWith(prefix + "/"))) failures.push(`avoided-work.json claims unchanged but implementation changed ${expectedPath}`);
  } catch { /* history verifier reports the invalid source SHA */ }
}
if (failures.length) {
  console.error(`Scope submission verification failed:\n${[...new Set(failures)].map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}
console.log(`Plan SHA: ${ledger.planSha}`);
console.log(`Source SHA: ${ledger.sourceSha}`);
console.log(`Actual scope: ${ledger.actual.files} files, ${ledger.actual.changedLines} changed lines`);
console.log("PASS scope budget was committed before implementation");
console.log("PASS actual Git numstat matches the final ledger and protected budget");
console.log("PASS source commit contains only export helper and learner test");
console.log("PASS later history contains evidence only");
