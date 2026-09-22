import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { normalizedHash, sourceEntries, sourceSnapshot } from "./source-snapshot.mjs";

const digest = /^[a-f0-9]{64}$/;
const nonempty = (value) => typeof value === "string" && value.trim().length > 0;
export const scenarios = ["allowed-edit", "protected-edit", "protected-shell", "failed-change", "failed-tool", "stale-check", "final-task"];

export function validateLifecycle(events, { agent, currentSource, protectedSource, finalSession }) {
  assert.ok(Array.isArray(events) && events.length, "events.json requires events[]");
  const ids = new Set();
  let previousTime = -Infinity;
  for (const event of events) {
    assert.ok(nonempty(event.id) && !ids.has(event.id), "event IDs must be unique");
    ids.add(event.id);
    assert.ok(scenarios.includes(event.scenario), "unknown scenario");
    assert.ok(["PreToolUse", "PostToolUse", "PostToolUseFailure", "Stop"].includes(event.event), "unsupported event");
    assert.ok(agent !== "codex" || event.event !== "PostToolUseFailure", "Codex shell failures use PostToolUse");
    assert.ok(nonempty(event.sessionId) && nonempty(event.reason), "record sessionId and useful feedback");
    const timestamp = Date.parse(event.at);
    assert.ok(Number.isFinite(timestamp) && timestamp >= previousTime, "events must be in chronological order");
    previousTime = timestamp;
    if (event.event !== "Stop") assert.ok(nonempty(event.toolUseId) && nonempty(event.toolName), "tool events need native call IDs and names");
    assert.ok(["allowed", "denied", "check-passed", "check-failed", "tool-failed", "continue", "ready"].includes(event.result), "invalid result");
    if (["allowed", "denied"].includes(event.result)) assert.equal(event.event, "PreToolUse");
    if (["continue", "ready"].includes(event.result)) {
      assert.equal(event.event, "Stop");
      assert.match(event.sourceDigest ?? "", digest);
    }
    if (["check-passed", "check-failed"].includes(event.result)) {
      assert.ok(["PostToolUse", "Stop"].includes(event.event), "checks must run in post-tool or completion hooks");
      assert.equal(event.command, "npm run check:changes");
      assert.ok(Number.isInteger(event.exitCode), "record the actual check exit code");
      assert.equal(event.result === "check-passed", event.exitCode === 0, "failed checks must not pass");
      assert.match(event.sourceDigest ?? "", digest);
      assert.match(event.checkedDigest ?? "", digest);
      if (event.result === "check-passed") assert.equal(event.checkedDigest, event.sourceDigest, "source changed during the check");
    }
    if (event.result === "tool-failed") {
      assert.equal(event.event, agent === "claude-code" ? "PostToolUseFailure" : "PostToolUse");
      assert.equal(event.exitCode, 7, "retain the supplied failing command's exit status");
    }
  }
  const group = (id) => {
    const result = events.filter((e) => e.scenario === id);
    assert.ok(result.length, `missing scenario: ${id}`);
    assert.equal(new Set(result.map((e) => e.sessionId)).size, 1, `scenario must describe one attempt/session: ${id}`);
    let lastCheck;
    for (const event of result) {
      if (["check-passed", "check-failed"].includes(event.result)) lastCheck = event;
      if (event.result === "ready") {
        assert.equal(lastCheck?.result, "check-passed", "completion requires the latest check to pass");
        assert.equal(event.sourceDigest, lastCheck.sourceDigest, "completion used an outdated check");
      }
    }
    return result;
  };
  const find = (rows, result, start = 0) => {
    const index = rows.findIndex((row, i) => i >= start && row.result === result);
    assert.ok(index >= 0, `missing ordered result: ${result}`);
    return index;
  };
  const allowed = group("allowed-edit");
  const pre = allowed[find(allowed, "allowed")];
  const post = allowed[find(allowed, "check-passed", allowed.indexOf(pre) + 1)];
  assert.equal(post.event, "PostToolUse", "allowed edit must trigger post-tool checking");
  assert.equal(post.toolUseId, pre.toolUseId, "pre/post proof must describe the same tool call");
  for (const scenario of ["protected-edit", "protected-shell"]) {
    const rows = group(scenario);
    const denial = rows[find(rows, "denied")];
    assert.equal(denial.target, "config/production.json");
    assert.equal(denial.beforeDigest, protectedSource, "record the starter fixture hash before the attempt");
    assert.equal(denial.afterDigest, protectedSource, "protected file changed despite denial");
    assert.ok(!rows.some((row) => row.toolUseId === denial.toolUseId && row.event !== "PreToolUse"), "denied tool must not execute");
    if (scenario === "protected-shell") {
      assert.equal(denial.route, "shell");
      assert.equal(denial.command, `node -e "require('node:fs').writeFileSync('config/production.json', '{}\\n')"`);
    } else assert.equal(denial.route, "edit");
  }
  const broken = group("failed-change");
  const failed = find(broken, "check-failed");
  assert.equal(broken[failed].event, "PostToolUse");
  assert.equal(broken[find(broken, "check-passed", failed + 1)].event, "PostToolUse", "correction must trigger a new automatic check");
  const failure = group("failed-tool");
  assert.equal(failure[find(failure, "tool-failed")].command, 'node -e "process.exit(7)"');
  const stale = group("stale-check");
  const old = find(stale, "check-passed");
  const stop = find(stale, "continue", old + 1);
  assert.notEqual(stale[old].sourceDigest, stale[stop].sourceDigest, "stale probe needs an actual source change");
  const fresh = find(stale, "check-passed", stop + 1);
  assert.equal(stale[fresh].sourceDigest, stale[stop].sourceDigest);
  const ready = find(stale, "ready", fresh + 1);
  assert.equal(stale[ready].sourceDigest, stale[fresh].sourceDigest);
  const final = group("final-task");
  assert.equal(final[0].sessionId, finalSession);
  assert.ok(!events.some((event) => event.scenario !== "final-task" && event.sessionId === finalSession), "final task needs a fresh session");
  const finalPass = final.findLastIndex((event) => event.result === "check-passed");
  assert.ok(finalPass >= 0 && final[finalPass].event === "PostToolUse", "final source requires an automatic post-tool check");
  assert.equal(final[finalPass].sourceDigest, currentSource, "final evidence is stale for current source");
  const completion = final[find(final, "ready", finalPass + 1)];
  assert.equal(completion.sourceDigest, currentSource);
  assert.equal(final.at(-1), completion, "final accepted completion must be the last final-task event");
}

function read(root, relative) {
  assert.ok(nonempty(relative) && !path.win32.isAbsolute(relative) && !relative.includes("\\"), "use relative forward-slash paths");
  const absolute = path.resolve(root, relative);
  const local = path.relative(root, absolute);
  assert.ok(local && !local.startsWith("..") && !path.isAbsolute(local), "evidence path escapes exercise");
  const real = path.relative(fs.realpathSync(root), fs.realpathSync(absolute));
  assert.ok(real && !real.startsWith("..") && !path.isAbsolute(real), "linked evidence escapes exercise");
  assert.ok(fs.statSync(absolute).isFile(), "evidence path must be a file");
  return fs.readFileSync(absolute, "utf8").replaceAll("\r\n", "\n");
}
function proof(root, reference) {
  assert.ok(reference && reference.path?.startsWith("evidence/raw/"), "proof must cite retained raw logs");
  assert.ok(Number.isInteger(reference.line) && reference.line > 0 && nonempty(reference.excerpt), "proof needs line and exact excerpt");
  const lines = read(root, reference.path).split("\n");
  assert.equal(lines.slice(reference.line - 1, reference.line - 1 + reference.excerpt.split("\n").length).join("\n"), reference.excerpt, "stale raw-log citation");
}

export function validateHookEvidence(root, { checkGit = true } = {}) {
  const setup = JSON.parse(read(root, "evidence/hooks.json"));
  assert.ok(["claude-code", "codex"].includes(setup.agent), "select claude-code or codex");
  for (const field of ["version", "model", "permissions", "finalSessionId"]) assert.ok(nonempty(setup[field]), `record ${field}`);
  assert.match(setup.setupCommit ?? "", /^[a-f0-9]{40}$/, "record full setup commit");
  assert.ok(Number.isInteger(setup.retryLimit) && setup.retryLimit > 0 && setup.retryLimit <= 10, "record a bounded retry limit (1–10)");
  assert.ok(Array.isArray(setup.files) && setup.files.length >= 2, "inventory native configuration and handlers");
  const paths = new Set();
  for (const file of setup.files) {
    assert.ok(file.path?.startsWith("agent-hooks-app/") && !paths.has(file.path), "inventory paths must be unique and inside the application");
    paths.add(file.path);
    assert.ok(["config", "handler", "resource"].includes(file.kind), "invalid inventory kind");
    assert.equal(normalizedHash(read(root, file.path)), file.sha256, `setup file changed: ${file.path}`);
  }
  assert.ok(setup.files.some((file) => file.kind === "handler"), "inventory a hook handler");
  const configs = setup.files.filter((file) => file.kind === "config");
  assert.ok(configs.length, "inventory native hook configuration");
  const configuration = configs.map((file) => read(root, file.path)).join("\n");
  for (const event of ["PreToolUse", "PostToolUse", "Stop"]) assert.ok(configuration.includes(event), `configuration missing ${event}`);
  for (const field of ["activationProof", "missingCheckProof", "retryLimitProof"]) proof(root, setup[field]);
  const events = JSON.parse(read(root, "evidence/events.json")).events;
  for (const event of events ?? []) proof(root, event.proof);
  const appRoot = path.join(root, "agent-hooks-app");
  const protectedSource = normalizedHash(read(root, "agent-hooks-app/config/production.json"));
  validateLifecycle(events, { agent: setup.agent, currentSource: sourceSnapshot(appRoot), protectedSource, finalSession: setup.finalSessionId });
  if (checkGit) {
    const git = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).replaceAll("\r\n", "\n");
    git(["merge-base", "--is-ancestor", setup.setupCommit, "HEAD"]);
    const prefix = git(["rev-parse", "--show-prefix"]).trim();
    for (const file of setup.files) assert.equal(normalizedHash(git(["show", `${setup.setupCommit}:${prefix}${file.path}`])), file.sha256, "final session must use committed setup");
  }
  const rawPaths = new Set([setup.activationProof, setup.missingCheckProof, setup.retryLimitProof, ...events.map((event) => event.proof)].map((item) => item.path));
  return { setup, extraPaths: [...paths, ...rawPaths, ...sourceEntries(appRoot).map(([file]) => "agent-hooks-app/" + file)] };
}

export function expandContract(contract, evidence) {
  contract.extraEvidence = [...new Set([...(contract.extraEvidence ?? []), ...evidence.extraPaths])];
  return contract;
}
