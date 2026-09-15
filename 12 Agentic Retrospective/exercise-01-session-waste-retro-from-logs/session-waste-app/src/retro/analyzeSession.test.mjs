import assert from "node:assert/strict";
import { analyzeSession } from "./analyzeSession.mjs";
import { evaluateCommandAttempt } from "./preflightPolicy.mjs";

const event = (sequence, type, target, overrides = {}) => ({
  sequence,
  type,
  target,
  workspaceRevision: 1,
  result: "ok",
  ...overrides,
});

const session = [
  event(1, "read", "policy.ts", { contentVersion: "v1" }),
  event(2, "read", "policy.ts", { contentVersion: "v1" }),
  event(3, "write", "policy.ts", { contentVersion: "v2", workspaceRevision: 2 }),
  event(4, "read", "policy.ts", { contentVersion: "v2", workspaceRevision: 2 }),
  event(5, "context", "architecture.md", { bytes: 8_001, workspaceRevision: 2 }),
  event(6, "command", "npm test", { phase: "focused-test", result: "failed", workspaceRevision: 2 }),
  event(7, "command", "npm test", { phase: "focused-test", result: "passed", workspaceRevision: 2 }),
  event(8, "command", "npm test", { phase: "focused-test", result: "passed", workspaceRevision: 2 }),
  event(9, "diagnosis", "fixture mismatch", { workspaceRevision: 2 }),
  event(10, "command", "npm test", { phase: "focused-test", result: "passed", workspaceRevision: 2 }),
  event(11, "command", "npm verify", { phase: "final-verification", result: "passed", workspaceRevision: 2 }),
];

assert.deepEqual(analyzeSession(session), {
  totalEvents: 11,
  duplicateReads: 1,
  unchangedFailureRetries: 2,
  oversizedContextLoads: 1,
  preventableCalls: 4,
  finalVerificationRuns: 1,
  correctnessPassed: true,
});

const revisionReset = [
  event(1, "command", "npm test", { phase: "focused-test", result: "failed" }),
  event(2, "command", "npm test", { phase: "focused-test", result: "passed", workspaceRevision: 2 }),
];
assert.equal(analyzeSession(revisionReset).unchangedFailureRetries, 0);

const noWrite = [event(1, "command", "npm verify", { phase: "final-verification", result: "passed" })];
assert.equal(analyzeSession(noWrite).finalVerificationRuns, 0);
assert.equal(analyzeSession(noWrite).correctnessPassed, false);

const failed = [event(1, "command", "npm test", { phase: "focused-test", result: "failed" })];
assert.deepEqual(evaluateCommandAttempt({ command: "npm test", workspaceRevision: 1, events: failed }), {
  allowed: false,
  reason: "DIAGNOSIS_OR_CHANGE_REQUIRED",
});
assert.equal(evaluateCommandAttempt({ command: "npm lint", workspaceRevision: 1, events: failed }).allowed, true);
assert.equal(evaluateCommandAttempt({ command: "npm test", workspaceRevision: 2, events: failed }).allowed, true);
assert.equal(evaluateCommandAttempt({
  command: "npm test",
  workspaceRevision: 1,
  events: [...failed, event(2, "diagnosis", "root cause")],
}).allowed, true);
assert.equal(evaluateCommandAttempt({
  command: "npm test",
  workspaceRevision: 1,
  events: [event(1, "diagnosis", "old diagnosis"), event(2, "command", "npm test", { phase: "focused-test", result: "failed" })],
}).allowed, false);

const exactThreshold = [event(1, "context", "architecture.md", { bytes: 8_000 })];
assert.equal(analyzeSession(exactThreshold).oversizedContextLoads, 0);

assert.throws(() => analyzeSession([event(1, "read", "policy.ts", { contentVersion: "v1" }), event(1, "claim", "done")]), /sequence/i);
assert.throws(() => analyzeSession([event(1, "context", "architecture.md")]), /bytes/i);
assert.throws(() => analyzeSession([event(1, "write", "policy.ts")]), /contentVersion/i);
assert.throws(() => analyzeSession([event(1, "command", "npm test", { result: "failed" })]), /phase/i);
assert.throws(() => analyzeSession([event(0, "claim", "done")]), /sequence/i);
assert.throws(() => evaluateCommandAttempt({ command: "", workspaceRevision: 1, events: [] }), /command/i);

console.log("PASS participant analyzer boundary and retry-preflight tests");
