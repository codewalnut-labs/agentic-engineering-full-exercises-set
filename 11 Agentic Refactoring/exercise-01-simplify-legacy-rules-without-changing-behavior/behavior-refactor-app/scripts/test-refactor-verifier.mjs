import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { verifyOutputs, verifyRefactorHistory } from "./refactor-verification.mjs";

const cases = [{ name: "case", input: { value: 1 }, expected: { status: "same" } }];
const output = [{ name: "case", input: { value: 1 }, output: { status: "same" } }];
assert.deepEqual(verifyOutputs(output, structuredClone(output), cases), []);
const changed = structuredClone(output); changed[0].output.status = "new";
assert.ok(verifyOutputs(output, changed, cases).some((failure) => failure.includes("not identical")));
// A synthetic history exercises the participant-test replay and mutation check.
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "refactor-history-test-"));
try {
  const git = (...args) => execFileSync("git", args, { cwd: temporary, encoding: "utf8", stdio: "pipe" }).trim();
  const write = (file, text) => { const target = path.join(temporary, "exercise", file); fs.mkdirSync(path.dirname(target), { recursive: true }); fs.writeFileSync(target, text); };
  const commit = () => { git("add", "."); git("commit", "-qm", "synthetic history"); return git("rev-parse", "HEAD"); };
  git("init", "-q"); git("config", "user.email", "fixture@example.invalid"); git("config", "user.name", "Verifier fixture");
  write("docs/renewal-golden-cases.json", JSON.stringify([{ name: "example", input: {}, expected: { discountPercent: 0 } }]));
  write("behavior-refactor-app/src/rules/legacyEligibility.mjs", "export function evaluateRenewalEligibility() { return { discountPercent: 0 }; }\n"); commit();
  write("evidence/before-output.json", "[]\n");
  write("behavior-refactor-app/src/rules/legacyEligibility.characterization.test.mjs", 'import assert from "node:assert/strict";\nimport fs from "node:fs";\nimport { evaluateRenewalEligibility } from "./legacyEligibility.mjs";\nconst cases = JSON.parse(fs.readFileSync(new URL("../../../docs/renewal-golden-cases.json", import.meta.url)));\nfor (const item of cases) assert.deepEqual(evaluateRenewalEligibility(item.input), item.expected);\n');
  const characterizationSha = commit();
  write("behavior-refactor-app/src/rules/legacyEligibility.mjs", "const discount = 0; export function evaluateRenewalEligibility() { return { discountPercent: discount }; }\n"); commit();
  write("behavior-refactor-app/src/rules/legacyEligibility.mjs", "const discountPercent = 0; export function evaluateRenewalEligibility() { return { discountPercent }; }\n"); const refactorSha = commit();
  assert.deepEqual(verifyRefactorHistory({ repositoryRoot: temporary, exerciseRoot: path.join(temporary, "exercise"), characterizationSha, refactorSha }), []);
} finally {
  assert.ok(path.resolve(temporary).startsWith(path.resolve(os.tmpdir()) + path.sep));
  fs.rmSync(temporary, { recursive: true, force: true });
}
console.log("characterization refactor verifier self-test passed");
