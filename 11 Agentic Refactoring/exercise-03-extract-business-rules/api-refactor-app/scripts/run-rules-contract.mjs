import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const exerciseRoot = path.resolve(process.cwd(), "..");
const apiRoot = path.join(exerciseRoot, "workflow-rules-api");
const temporaryRoot = fs.mkdtempSync(path.join(os.tmpdir(), "legacy-rules-verification-"));
const verificationApiRoot = path.join(temporaryRoot, "workflow-rules-api");
const characterizationOnly = process.argv.includes("--characterization");
const starterOnly = process.argv.includes("--starter");
const snapshotLane = process.argv.includes("--snapshot-before") ? "before" : process.argv.includes("--snapshot-after") ? "after" : null;
let snapshotText;
const selectedTests = starterOnly ? "WorkflowServiceTest,WorkflowApiContractTest" : "WorkflowPolicyCharacterizationTest,WorkflowServiceTest,WorkflowApiContractTest";
const mavenArguments = ["test", "--no-transfer-progress", ...((characterizationOnly || starterOnly) ? ["-Dtest=" + selectedTests] : [])];
if (snapshotLane) mavenArguments.push("-Dcontract.snapshot=contract-observations.json");
function saveSnapshot() {
  if (!snapshotLane) return;
  const target = path.join(exerciseRoot, "evidence", "contract-" + snapshotLane + ".json");
  if (fs.existsSync(target)) throw new Error("Preserve the previous contract snapshot before recapturing");
  const expected = JSON.parse(fs.readFileSync(path.join(exerciseRoot, "docs/contract-observations.json"), "utf8"));
  if (JSON.stringify(JSON.parse(snapshotText)) !== JSON.stringify(expected)) throw new Error("Participant snapshot must cover the protected observations in their given order");
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, snapshotText);
  console.log("Captured participant-test observations: " + target);
}
try {
  fs.cpSync(apiRoot, verificationApiRoot, {
    recursive: true,
    filter: (source) => !source.split(path.sep).includes("target"),
  });
  if (process.platform === "win32") {
    execFileSync("cmd.exe", ["/d", "/s", "/c", "mvnw.cmd", ...mavenArguments], { cwd: verificationApiRoot, stdio: "inherit" });
  } else {
    execFileSync("./mvnw", mavenArguments, { cwd: verificationApiRoot, stdio: "inherit" });
  }
  const requiredTests = starterOnly ? ["WorkflowServiceTest", "WorkflowApiContractTest"] : ["WorkflowPolicyCharacterizationTest", "WorkflowServiceTest", "WorkflowApiContractTest"];
  for (const testName of requiredTests) {
  const participantReport = path.join(verificationApiRoot, "target", "surefire-reports", "TEST-dev.agentic.exercise.workflow." + testName + ".xml");
  if (!fs.existsSync(participantReport)) throw new Error(testName + " must contain discovered JUnit tests");
  const report = fs.readFileSync(participantReport, "utf8");
  const tests = Number(report.match(/\btests="(\d+)"/)?.[1] ?? 0);
  const failures = Number(report.match(/\bfailures="(\d+)"/)?.[1] ?? 0);
  const errors = Number(report.match(/\berrors="(\d+)"/)?.[1] ?? 0);
  if (tests < 1 || failures !== 0 || errors !== 0) throw new Error(testName + " must execute at least one passing JUnit test");
  console.log(`PASS ${testName}: ${tests} discovered tests, zero failures or errors`);
  }
  if (snapshotLane) snapshotText = fs.readFileSync(path.join(verificationApiRoot, "contract-observations.json"), "utf8");
} finally {
  if (!path.resolve(temporaryRoot).startsWith(path.resolve(os.tmpdir()) + path.sep)) throw new Error("temporary path escaped its root");
  fs.rmSync(temporaryRoot, { recursive: true, force: true });
}

if (characterizationOnly || starterOnly) {
  execFileSync(process.execPath, ["./scripts/run-client-contract.mjs"], { cwd: process.cwd(), stdio: "inherit" });
  console.log("PASS existing backend behavior, HTTP JSON, and client contract before extraction");
  saveSnapshot();
  process.exit(0);
}

const service = fs.readFileSync(path.join(apiRoot, "src/main/java/dev/agentic/exercise/workflow/WorkflowService.java"), "utf8");
const policyPath = path.join(apiRoot, "src/main/java/dev/agentic/exercise/workflow/DecisionPolicy.java");
if (!fs.existsSync(policyPath)) throw new Error("Create DecisionPolicy.java");
const policy = fs.readFileSync(policyPath, "utf8");
if (/\bReady\b|Ready decisions require a longer evidence note/.test(service)) throw new Error("Decision validation remains in WorkflowService");
if (!policy.includes('"Ready".equals') || !policy.includes("Ready decisions require a longer evidence note")) throw new Error("DecisionPolicy does not own the protected Ready rule");
if (/WorkflowRepository|\.save\(|\.findById\(/.test(policy)) throw new Error("DecisionPolicy must not access persistence");
if (!/\bvoid\s+validate\s*\(\s*WorkflowDecision\s+\w+\s*\)/.test(policy)) throw new Error("DecisionPolicy.validate must validate without returning a replacement item");
if (!/\bdecisionPolicy\s*\.\s*validate\s*\(\s*decision\s*\)/.test(service)) throw new Error("WorkflowService must delegate validation to the injected DecisionPolicy");
execFileSync(process.execPath, ["./scripts/run-client-contract.mjs"], { cwd: process.cwd(), stdio: "inherit" });
console.log("PASS backend architecture, behavior, HTTP JSON, and client contract");
saveSnapshot();
