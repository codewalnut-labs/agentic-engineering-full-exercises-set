import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { test } from "node:test";
import { capture, context, digest, git, recordHash, snapshot, validateBrowserReport, validateCycles, validateEvidence, validateRecord, validateTool } from "./test-evidence.mjs";

const contract = { kind: "tdd", stages: { baseline: ["smoke", "acceptance"], "red-1": ["cycle"], "green-1": ["cycle"], final: ["all", "quality"] } };
function record(stage) {
  const result = { schema: 1, stage, attempt: 1, commit: "a".repeat(40), startedAt: "2026-09-24T00:00:00Z", finishedAt: "2026-09-24T00:00:01Z", snapshot: {},
    runs: contract.stages[stage].map((script, index) => ({ script, exitCode: stage.startsWith("red") || (stage === "baseline" && index === 1) ? 1 : 0, stdout: "AssertionError: expected behavior to match", stderr: "", error: null, signal: null })) };
  result.sha256 = recordHash(result); return result;
}
function alter(stage, change) { const value = record(stage); change(value); value.sha256 = recordHash(value); return value; }
test("complete records permit an honest failing baseline and red followed by passing green", () => {
  for (const stage of Object.keys(contract.stages)) validateRecord(record(stage), stage, contract);
});
test("capture rejects missing commands, failed final, passing red, and altered records", () => {
  assert.throws(() => validateRecord(alter("final", (r) => r.runs.pop()), "final", contract), /omits/);
  assert.throws(() => validateRecord(alter("final", (r) => r.runs[0].exitCode = 1), "final", contract), /must pass/);
  assert.throws(() => validateRecord(alter("red-1", (r) => r.runs[0].exitCode = 0), "red-1", contract), /must fail/);
  const changed = record("final"); changed.runs[0].stdout = "rewritten";
  assert.throws(() => validateRecord(changed, "final", contract), /hash/);
});
test("red rejects import/setup failures and process errors", () => {
  for (const message of ["Cannot find module foo", "SyntaxError in test", "No test files found"]) {
    assert.throws(() => validateRecord(alter("red-1", (r) => r.runs[0].stderr = message), "red-1", contract), /Infrastructure/);
  }
  assert.throws(() => validateRecord(alter("red-1", (r) => r.runs[0].error = "ENOENT"), "red-1", contract), /process error/);
  assert.throws(() => validateRecord(alter("red-1", (r) => r.runs[0].signal = "SIGTERM"), "red-1", contract), /terminated/);
});
test("baseline distinguishes flaky browser behavior from broken setup", () => {
  const browser = { ...contract, kind: "browser" };
  validateRecord(alter("baseline", (r) => r.runs[1].exitCode = 0), "baseline", browser);
  assert.throws(() => validateRecord(alter("baseline", (r) => r.runs[0].exitCode = 1), "baseline", browser), /must run successfully/);
});
test("browser reports reject retries, skipped tests, global errors, and expected failures", () => {
  const report = { config: { workers: 2, projects: [{ repeatEach: 20, retries: 0 }] }, stats: { expected: 80, unexpected: 0, flaky: 0, skipped: 0 }, suites: [{ specs: [{ tests: Array.from({ length: 80 }, () => ({ expectedStatus: "passed", results: [{ status: "passed" }] })) }] }] };
  validateBrowserReport(report);
  const change = (edit, pattern) => { const copy = structuredClone(report); edit(copy); assert.throws(() => validateBrowserReport(copy), pattern); };
  change((r) => r.config.projects[0].retries = 1, /zero retries/);
  change((r) => r.stats.skipped = 1, /skipped/);
  change((r) => r.stats.flaky = 1, /flaky/);
  change((r) => r.errors = [{ message: "server failed" }], /global errors/);
  change((r) => r.suites = [], /omits individual/);
  change((r) => r.suites[0].specs[0].tests[0].expectedStatus = "failed", /Expected failures/);
});
function cycles() {
  const c = { cycles: ["app/src/learner/loading.test.tsx", "app/src/learner/empty.test.tsx", "app/src/learner/retry.test.tsx"] };
  const records = { baseline: { snapshot: { "app/src/App.tsx": "source0" } } };
  let files = records.baseline.snapshot;
  for (let i = 1; i <= 3; i++) {
    files = { ...files, [c.cycles[i - 1]]: `test${i}` };
    records[`red-${i}`] = { snapshot: { ...files } };
    files = { ...files, "app/src/App.tsx": `source${i}` };
    records[`green-${i}`] = { snapshot: { ...files } };
  }
  records.final = { snapshot: { ...files } }; return { c, records };
}
test("cycles enforce test-first production changes and unchanged regressions", () => {
  const valid = cycles(); validateCycles(valid.records, valid.c);
  const early = cycles(); early.records["red-1"].snapshot["app/src/App.tsx"] = "fixed";
  assert.throws(() => validateCycles(early.records, early.c), /before red/);
  const changed = cycles(); changed.records["green-2"].snapshot[changed.c.cycles[1]] = "weakened";
  assert.throws(() => validateCycles(changed.records, changed.c), /between red and green/);
  const late = cycles(); late.records.final.snapshot[late.c.cycles[0]] = "weakened";
  assert.throws(() => validateCycles(late.records, late.c), /after green/);
  const bulk = cycles(); bulk.records.baseline.snapshot[bulk.c.cycles[0]] = "already-written";
  assert.throws(() => validateCycles(bulk.records, bulk.c), /after the previous slice/);
});

test("capture executes real commands, supports spaced Windows paths, preserves attempts, and rejects stale final evidence", () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "test automation fixture "));
  try {
    const root = path.join(temporary, "exercise"), app = path.join(root, "app");
    fs.mkdirSync(app, { recursive: true });
    const put = (name, content) => { const file = path.join(root, name); fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); };
    const source = "export const value = 1;";
    put("app/src/code.mjs", source);
    put("app/package.json", JSON.stringify({ private: true, scripts: { smoke: "node -e \"console.log('starter smoke passes')\"", acceptance: "node -e \"console.log('AssertionError: missing behavior');process.exit(1)\"", all: "node -e \"console.log('full behavior passed')\"" } }));
    const fixtureContract = { kind: "release", toolSource: "https://example.test/skill", toolSignal: "verify-skill", skill: true, stages: { baseline: ["smoke", "acceptance"], final: ["all"] }, documents: { "evidence/before.md": ["Starting point"] } };
    put("app/evidence-contract.json", JSON.stringify(fixtureContract));
    put("app/starter-state.json", JSON.stringify({ "app/src/code.mjs": digest(source) }));
    execFileSync("git", ["init", "-q", temporary]);
    const commit = () => { git(temporary, ["add", "."]); git(temporary, ["-c", "user.name=Fixture", "-c", "user.email=fixture@example.test", "commit", "-qm", "fixture"]); };
    commit();
    assert.equal(capture(app, "baseline"), 1);
    put("app/src/code.mjs", "export const value = 2;");
    assert.throws(() => capture(app, "final"), /Commit/);
    commit();
    assert.equal(capture(app, "final"), 0);
    assert.equal(capture(app, "final"), 0);
    assert.ok(fs.existsSync(path.join(root, "evidence/runs/final-2.json")));
    put("evidence/runs.json", JSON.stringify({ baseline: "baseline-1.json", final: "final-2.json" }));
    put("evidence/before.md", "## Starting point\nObserved the actual starter command and its output.");
    put("evidence/sessions/actual.txt", "Loaded verify-skill and identified complete checks.\nExecuted commands and inspected output before reporting.\n");
    put("evidence/tool-record.md", `- Agent: Fixture agent\n- Model: Fixture model\n- Source: https://example.test/skill\n- Version: fixture revision\n- Installed path: /fixture/verify-skill/SKILL.md\n- Invocation: loaded verify-skill\n- Transcript: evidence/sessions/actual.txt:1-2\n- Source commit: ${"a".repeat(40)}\n- SKILL.md SHA-256: ${"b".repeat(64)}\n`);
    validateEvidence(app);
    const ctx = context(app); assert.ok(snapshot(ctx, git(root, ["rev-parse", "HEAD"]))["app/src/code.mjs"]);
    put("evidence/sessions/actual.txt", "No invocation appears in this rewritten session transcript.");
    assert.throws(() => validateTool(root, fixtureContract), /range|does not show/);
    put("evidence/sessions/actual.txt", "Loaded verify-skill and inspected behavior.\nVerified the result.\n");
    put("app/src/code.mjs", "export const value = 3;"); commit();
    assert.throws(() => validateEvidence(app), /stale/);
  } finally { fs.rmSync(temporary, { recursive: true, force: true }); }
});
