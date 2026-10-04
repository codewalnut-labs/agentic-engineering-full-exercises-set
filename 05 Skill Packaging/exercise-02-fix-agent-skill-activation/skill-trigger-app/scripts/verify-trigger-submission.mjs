import fs from "node:fs";
import path from "node:path";
import { comparableEnvironment, readSkill, scoreResultSet, sha256, validateCandidateSkill, validateResultSet } from "./trigger-evaluation.mjs";

import { adoptionGate } from "./adoption-gate.mjs";

const root = process.cwd();
const evidenceRoot = path.join(root, "..", "evidence");
const failures = [];
const evalCases = JSON.parse(fs.readFileSync(path.join(root, "evals", "trigger-evals.json"), "utf8")).cases;
const baseline = readSkill(path.join(root, "fixtures", "change-review-baseline", "SKILL.md"));
const candidate = readSkill(path.join(root, "skills", "change-review", "SKILL.md"));
failures.push(...validateCandidateSkill(candidate, baseline, evalCases));

function readJson(name) {
  const file = path.join(evidenceRoot, name);
  if (!fs.existsSync(file)) {
    failures.push(`missing evidence/${name}`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(file, "utf8"));
  } catch {
    failures.push(`evidence/${name} is invalid JSON`);
    return null;
  }
}

const before = readJson("before-results.json");
const after = readJson("after-results.json");
if (before) failures.push(...validateResultSet("before-results.json", before, evalCases));
if (after) failures.push(...validateResultSet("after-results.json", after, evalCases));

if (before && after) {
  if (before.description_sha256 !== sha256(baseline.description)) failures.push("before-results.json is not bound to the protected original description");
  if (after.description_sha256 !== sha256(candidate.description)) failures.push("after-results.json is not bound to the submitted description");
  if (before.description_sha256 === after.description_sha256) failures.push("the before and after descriptions are identical");
  if (comparableEnvironment(before.environment) !== comparableEnvironment(after.environment)) failures.push("before and after environment details must be identical");

  const resultFailures = [
    ...validateResultSet("before-results.json", before, evalCases),
    ...validateResultSet("after-results.json", after, evalCases),
  ];
  if (!resultFailures.length) {
    const beforeScore = scoreResultSet(before, evalCases);
    const afterScore = scoreResultSet(after, evalCases);
    const gate = adoptionGate(beforeScore, afterScore);
    failures.push(...gate.failures);
    const decision = readJson("decision.json");
    if (decision?.decision !== gate.decision) failures.push("decision.json must record " + gate.decision + " for the measured scores");
    if (typeof decision?.reason !== "string" || decision.reason.trim().length < 40) failures.push("decision.json requires a measured adoption reason");
  }
}

function requireReport(name, terms) {
  const file = path.join(evidenceRoot, name);
  if (!fs.existsSync(file)) {
    failures.push(`missing evidence/${name}`);
    return;
  }
  const text = fs.readFileSync(file, "utf8").toLowerCase();
  for (const term of terms) if (!text.includes(term)) failures.push(`evidence/${name} is missing ${term}`);
}

requireReport("skill-use.md", ["source", "revision", "installed path", "sha-256", "installation"]);
requireReport("trigger-analysis.md", ["training", "false positive", "false negative", "boundary", "description"]);
requireReport("comparison.md", ["before", "after", "train", "held-out", "precision", "recall", "specificity", "unanimous", "adoption", "fair"]);
const skillRecordPath = path.join(evidenceRoot, "skill-use.md");
if (fs.existsSync(skillRecordPath)) {
  const skillRecord = fs.readFileSync(skillRecordPath, "utf8");
  if (!/https:\/\/github\.com\/anthropics\/skills/i.test(skillRecord)) failures.push("evidence/skill-use.md must identify the skill-creator source repository");
  if (!/revision[^a-f0-9]*[a-f0-9]{40}/i.test(skillRecord)) failures.push("evidence/skill-use.md must contain a 40-character revision");
  if (!/sha-256[^a-f0-9]*[a-f0-9]{64}/i.test(skillRecord)) failures.push("evidence/skill-use.md must contain the installed SKILL.md SHA-256");
}

if (failures.length) {
  console.error("Trigger submission verification failed:\n" + [...new Set(failures)].map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}
console.log("The description preserves all other skill content, meets the routing thresholds, and has a measured adoption decision.");
