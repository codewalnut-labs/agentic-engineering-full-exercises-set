import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { test } from "node:test";
import { validateLifecycle, validateHookEvidence, expandContract } from "../scripts/hook-validation.mjs";
import { normalizedHash, sourceSnapshot } from "../scripts/source-snapshot.mjs";
import { summaryFailures } from "../scripts/summary-validation.mjs";

const a = "a".repeat(64), b = "b".repeat(64), c = "c".repeat(64), protectedSource = "d".repeat(64);
const context = { agent: "claude-code", currentSource: c, protectedSource, finalSession: "fresh-final" };

test("summary verification isolates labeled counts from other dashboard numbers", () => {
  const html = '<section aria-label="Release Readiness Summary"><h2>Release Readiness Summary</h2><p>Editable: 1</p><p>Approval required: 3</p></section>';
  assert.deepEqual(summaryFailures(html, 1, 3), []);
  assert.equal(summaryFailures(html + "<p>Editable: 2 Approval: 4</p>", 2, 4).length, 2);
  assert.equal(summaryFailures(html.replace("Editable: 1", "Editable: 10"), 1, 3).length, 1);
});

function sample() {
  const events = [];
  const add = (scenario, event, result, extra = {}) => {
    const index = events.length;
    events.push({
      id: "event-" + index, at: new Date(1700000000000 + index * 1000).toISOString(),
      scenario, event, result, sessionId: scenario === "final-task" ? "fresh-final" : "probe-" + scenario,
      toolUseId: "call-" + index, toolName: "Edit", reason: "Captured native hook feedback",
      sourceDigest: a, checkedDigest: a, command: "npm run check:changes", exitCode: 0,
      ...extra
    });
  };
  add("allowed-edit", "PreToolUse", "allowed", { toolUseId: "allowed-call" });
  add("allowed-edit", "PostToolUse", "check-passed", { toolUseId: "allowed-call" });
  add("protected-edit", "PreToolUse", "denied", { route: "edit", target: "config/production.json", beforeDigest: protectedSource, afterDigest: protectedSource });
  add("protected-shell", "PreToolUse", "denied", {
    route: "shell", target: "config/production.json", beforeDigest: protectedSource, afterDigest: protectedSource,
    command: `node -e "require('node:fs').writeFileSync('config/production.json', '{}\\n')"`
  });
  add("failed-change", "PostToolUse", "check-failed", { exitCode: 2 });
  add("failed-change", "PostToolUse", "check-passed", { sourceDigest: b, checkedDigest: b });
  add("failed-tool", "PostToolUseFailure", "tool-failed", { command: 'node -e "process.exit(7)"', exitCode: 7 });
  add("stale-check", "PostToolUse", "check-passed");
  add("stale-check", "Stop", "continue", { sourceDigest: b });
  add("stale-check", "Stop", "check-passed", { sourceDigest: b, checkedDigest: b });
  add("stale-check", "Stop", "ready", { sourceDigest: b });
  add("final-task", "PostToolUse", "check-passed", { sourceDigest: c, checkedDigest: c });
  add("final-task", "Stop", "ready", { sourceDigest: c });
  return events;
}

test("accepts the complete lifecycle, including a fresh final session", () => {
  validateLifecycle(sample(), context);
});
test("uses the runtime's actual failure event", () => {
  assert.throws(() => validateLifecycle(sample(), { ...context, agent: "codex" }), /Codex/);
  const events = sample();
  events.find((e) => e.scenario === "failed-tool").event = "PostToolUse";
  validateLifecycle(events, { ...context, agent: "codex" });
});

for (const [name, change, message] of [
  ["missing scenario", (e) => e.splice(2, 1), /missing scenario/],
  ["unrelated pre and post calls", (e) => { e[1].toolUseId = "different"; }, /same tool call/],
  ["protected file overwritten", (e) => { e[2].afterDigest = a; }, /protected file changed/],
  ["failed check claimed as success", (e) => { e[1].exitCode = 1; }, /failed checks/],
  ["source changed during checking", (e) => { e[1].checkedDigest = b; }, /source changed during/],
  ["stale scenario without a new edit", (e) => { e[7].sourceDigest = b; e[7].checkedDigest = b; }, /actual source change/],
  ["completion with stale verification", (e) => { e[12].sourceDigest = a; }, /outdated check/],
  ["final check from old code", (e) => { e[11].sourceDigest = b; e[11].checkedDigest = b; e[12].sourceDigest = b; }, /stale for current source/],
  ["final task reuses probe session", (e) => { e[11].sessionId = e[0].sessionId; e[12].sessionId = e[0].sessionId; }, /fresh-final/],
  ["latest verification failed", (e) => { e[11].result = "check-failed"; e[11].exitCode = 1; }, /latest check/],
  ["missing failure feedback", (e) => { e[6].reason = ""; }, /useful feedback/],
  ["unordered capture", (e) => { e[3].at = e[0].at; }, /chronological/]
]) {
  test("rejects " + name, () => {
    const events = sample(); change(events);
    assert.throws(() => validateLifecycle(events, context), message);
  });
}

function temporary(t) {
  const tempRoot = fs.realpathSync(os.tmpdir());
  const root = fs.mkdtempSync(path.join(tempRoot, "hook-challenge-test-"));
  t.after(() => {
    const relative = path.relative(tempRoot, fs.realpathSync(root));
    assert.ok(relative.startsWith("hook-challenge-test-") && !relative.includes(path.sep), "cleanup must stay in its exact temporary directory");
    fs.rmSync(root, { recursive: true, force: true });
  });
  return root;
}
function write(root, relative, value) {
  const file = path.join(root, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, value);
}
function sourceFixture(root) {
  for (const file of ["src/App.tsx", "tests/check.mjs", "scripts/check.mjs", "package.json", "package-lock.json", "tsconfig.json", "vite.config.ts"]) write(root, file, "{}\n");
}

test("snapshot ignores logs, normalizes line endings, and includes new source and check inputs", (t) => {
  const root = temporary(t); sourceFixture(root);
  const initial = sourceSnapshot(root);
  write(root, "src/App.tsx", "{}\r\n");
  write(root, "evidence/log.txt", "runtime output");
  assert.equal(sourceSnapshot(root), initial);
  write(root, "src/new.ts", "export const number = 1;\n");
  const added = sourceSnapshot(root);
  assert.notEqual(added, initial);
  write(root, "tests/check.mjs", "changed check\n");
  assert.notEqual(sourceSnapshot(root), added);
});

function evidenceFixture(t) {
  const root = temporary(t);
  const app = path.join(root, "agent-hooks-app");
  sourceFixture(app);
  write(root, "agent-hooks-app/config/production.json", "{}\n");
  write(root, "agent-hooks-app/.agent/hooks.json", '{"PreToolUse":[],"PostToolUse":[],"Stop":[]}\n');
  write(root, "agent-hooks-app/hooks/handler.mjs", "// Synthetic validator fixture; no runtime hook solution.\n");
  write(root, "evidence/raw/session.txt", "Captured native hook feedback\n");
  const reference = { path: "evidence/raw/session.txt", line: 1, excerpt: "Captured native hook feedback" };
  const setup = {
    agent: "claude-code", version: "recorded-version", model: "recorded-model", permissions: "recorded-mode",
    setupCommit: "e".repeat(40), finalSessionId: "fresh-final", retryLimit: 2,
    files: [
      { path: "agent-hooks-app/.agent/hooks.json", kind: "config" },
      { path: "agent-hooks-app/hooks/handler.mjs", kind: "handler" }
    ].map((file) => ({ ...file, sha256: normalizedHash(fs.readFileSync(path.join(root, file.path))) })),
    activationProof: reference, missingCheckProof: reference, retryLimitProof: reference
  };
  const events = sample();
  for (const event of events) {
    event.proof = reference;
    if (event.result === "denied") event.beforeDigest = event.afterDigest = normalizedHash("{}\n");
    if (event.scenario === "final-task") event.sourceDigest = event.checkedDigest = sourceSnapshot(app);
  }
  write(root, "evidence/hooks.json", JSON.stringify(setup));
  write(root, "evidence/events.json", JSON.stringify({ events }));
  return { root, setup };
}

test("seals inventoried hooks, cited logs, and source inputs", (t) => {
  const { root } = evidenceFixture(t);
  const evidence = validateHookEvidence(root, { checkGit: false });
  const contract = expandContract({ extraEvidence: ["evidence/hooks.json"] }, evidence);
  for (const file of ["agent-hooks-app/.agent/hooks.json", "agent-hooks-app/hooks/handler.mjs", "agent-hooks-app/src/App.tsx", "evidence/raw/session.txt"]) assert.ok(contract.extraEvidence.includes(file));
});
test("rejects changed hook files and stale raw-log citations", (t) => {
  const { root } = evidenceFixture(t);
  write(root, "evidence/raw/session.txt", "different capture\n");
  assert.throws(() => validateHookEvidence(root, { checkGit: false }), /stale raw-log citation/);
  write(root, "agent-hooks-app/hooks/handler.mjs", "changed\n");
  assert.throws(() => validateHookEvidence(root, { checkGit: false }), /setup file changed/);
});
test("rejects inventory paths escaping the exercise", (t) => {
  const { root, setup } = evidenceFixture(t);
  setup.files[0].path = "agent-hooks-app/../../outside.json";
  write(root, "evidence/hooks.json", JSON.stringify(setup));
  assert.throws(() => validateHookEvidence(root, { checkGit: false }), /escapes exercise/);
});
