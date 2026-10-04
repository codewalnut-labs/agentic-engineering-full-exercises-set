import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { selectContext } from "../src/budget/selectContext.mjs";
import { verifyContextEvidence, verifyContextHistory } from "./context-verification.mjs";

const appRoot = process.cwd();
const exerciseRoot = path.resolve(appRoot, "..");
const repositoryRoot = execFileSync("git", ["rev-parse", "--show-toplevel"], { cwd: appRoot, encoding: "utf8" }).trim();
const evidenceRoot = path.join(exerciseRoot, "evidence");
const failures = [];
function readJson(file, label) { try { return JSON.parse(fs.readFileSync(file, "utf8")); } catch { failures.push(`missing or invalid ${label}`); return null; } }
const plan = readJson(path.join(evidenceRoot, "context-plan.json"), "context plan");
const ledger = readJson(path.join(evidenceRoot, "context-ledger.json"), "context ledger");
const catalog = readJson(path.join(exerciseRoot, "docs", "context-catalog.json"), "context catalog") ?? [];
if (plan && (!Array.isArray(plan.task?.tags) || !["session", "adapter"].every((tag) => plan.task.tags.includes(tag)) || !plan.task?.questionTags?.includes("errors"))) failures.push("plan must cover session, adapter, and the errors question");
if (plan && (plan.maximumBytes > 2000 || !plan.openQuestions?.some((question) => typeof question === "string" && question.trim().length >= 15))) failures.push("plan needs a concrete open question and a budget no greater than 2000 bytes");
let expectedResult = null;
if (plan) {
  try { expectedResult = selectContext(catalog, { tags: plan.task.tags, questions: plan.task.questionTags }, plan.maximumBytes); }
  catch (error) { failures.push(`planned selector run failed: ${error.message}`); }
}
if (plan && ledger && expectedResult) failures.push(...verifyContextEvidence({ plan, ledger, catalog, expectedResult }));
const fullContextBytes = catalog.reduce((sum, item) => sum + item.bytes, 0);
if (expectedResult && expectedResult.totalBytes >= fullContextBytes) failures.push("selected context does not reduce the protected full-context cost");
if (expectedResult && (expectedResult.totalBytes > plan.maximumBytes || expectedResult.unresolvedTags?.length)) failures.push("final context must fit the budget and resolve the task's required tags");
if (expectedResult && !["repository-rules", "current-adapter-contract", "current-error-contract"].every((id) => expectedResult.selected.some((item) => item.id === id))) failures.push("final context must include all current required guidance");
if (ledger?.planSha && ledger?.sourceSha) failures.push(...verifyContextHistory({ repositoryRoot, exerciseRoot, planSha: ledger.planSha, sourceSha: ledger.sourceSha }));
if (failures.length) {
  console.error(`Context submission verification failed:\n${[...new Set(failures)].map((failure) => `- ${failure}`).join("\n")}`);
  process.exit(1);
}
console.log(`Plan SHA: ${ledger.planSha}`);
console.log(`Source SHA: ${ledger.sourceSha}`);
console.log(`Selected bytes: ${expectedResult.totalBytes}/${expectedResult.maximumBytes}`);
console.log(`Context reduction: ${fullContextBytes - expectedResult.totalBytes} bytes`);
console.log("PASS pre-change budget plan precedes implementation");
console.log("PASS ledger exactly matches deterministic selector output and real source costs");
console.log("PASS every context source has a selected or skipped reason");
console.log("PASS focused selector history and evidence-only follow-up verified");
