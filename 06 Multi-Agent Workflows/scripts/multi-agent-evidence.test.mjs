import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { execFileSync, spawnSync } from "node:child_process";
import { test } from "node:test";
import { sealMultiAgent, verifyMultiAgent, verifyAgentSessions } from "./multi-agent-evidence.mjs";
import { changedRepositoryPaths } from "../exercise-01-integrate-parallel-agent-features/parallel-feature-app/scripts/worktree-verification.mjs";
import { changedPaths } from "../exercise-03-assign-agent-work-without-conflicts/agent-task-board-app/scripts/control-plane-verification.mjs";

function fixture(kind, run) {
  const repository = fs.mkdtempSync(path.join(os.tmpdir(), "multi-agent-proof-")), root = path.join(repository, "exercise");
  const git = (...args) => execFileSync("git", args, { cwd: repository, stdio: ["ignore", "pipe", "pipe"], encoding: "utf8" }).trim();
  const write = (relative, content) => { const file = path.join(root, relative); fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, content); };
  const json = (relative, value) => write(relative, JSON.stringify(value, null, 2) + "\n");
  try {
    fs.mkdirSync(root, { recursive: true });
    git("init", "-q", "-b", "main"); git("config", "user.name", "Framework fixture"); git("config", "user.email", "test@example.invalid"); git("config", "core.autocrlf", "false");
    write("app/source.txt", "Synthetic starter; no real agent run is claimed.\n");
    git("add", "."); git("commit", "-qm", "synthetic baseline");
    const base = git("rev-parse", "HEAD");
    for (const name of ["before", "after"]) write("evidence/" + name + ".md", "## Conditions\nSynthetic fixture.\n## Findings\nFramework behavior only.\n## Proof\nNo agent behavior is claimed.\n");
    write("evidence/comparison.md", "## Changes\nSynthetic records.\n## Verified\nIntegrity only.\n## Remaining questions\nHuman review establishes actual behavior.\n");
    write("evidence/skill-session.txt", "Synthetic skill framework invocation.\n" + "This transcript tests structural validation, not actual agent use.\n".repeat(2));
    write("evidence/skill-use.md", "## dispatching-parallel-agents\nSource: https://github.com/obra/superpowers\nRevision: " + "1".repeat(40) + "\nInvocation: synthetic fixture\nProof: evidence/skill-session.txt:L1-L3\n");
    const owned = ["src/utils/scoring.ts", "src/components/SeverityBadge.tsx", "tests/esc-120/"];
    const roles = kind === "parallel" ? ["lane-A", "lane-B", "lane-C"] : kind === "specialist" ? ["security", "accessibility", "performance", "testability"].flatMap(role => [role + "-before", role + "-after"]) : ["implementer", "reviewer"];
    const sessions = roles.map(role => {
      const after = role.endsWith("-after") || role === "reviewer";
      const record = { role, session_id: role + "-session", agent: "synthetic agent", model: "fixture", tools: "fixture", permissions: "fixture", reviewed_sha: base, result_sha: base,
        started_at: "2026-10-04T00:" + (after ? "02" : "00") + ":00Z", finished_at: "2026-10-04T00:" + (after ? "03" : "01") + ":00Z",
        prompt_path: "evidence/prompts/" + role + ".md", transcript_path: "evidence/sessions/" + role + ".txt", proof: "evidence/sessions/" + role + ".txt:L1-L3" };
      write(record.prompt_path, "# Synthetic bounded task\n\nSource SHA: " + base + "\nThese are synthetic unit-test records, not exported agent messages.\n");
      write(record.transcript_path, "Source SHA: " + base + "\nSynthetic runtime events test structural validation.\nNo actual agent execution or parallelism is claimed by this framework fixture.\n");
      return record;
    });
    json("evidence/agent-sessions.json", { schema_version: 1, sessions });
    const artifacts = ["evidence/before.md", "evidence/after.md", "evidence/comparison.md", "evidence/skill-use.md", "evidence/skill-session.txt", "evidence/agent-sessions.json"];
    if (kind === "parallel") {
      json("evidence/lane-handoffs.json", { base_sha: base, lanes: sessions.map(session => ({ lane: session.role.slice(-1), commit_sha: base, session_id: session.session_id, verification: { output_path: "unused" } })) });
      artifacts.push("evidence/lane-handoffs.json");
    } else if (kind === "specialist") {
      json("evidence/review-cycle.json", { baseline_sha: base, remediation_sha: base, specialists: ["security", "accessibility", "performance", "testability"].map(specialist => ({
        specialist, before: { reviewed_sha: base, session_id: specialist + "-before-session" }, after: { reviewed_sha: base, session_id: specialist + "-after-session" },
      })) });
      artifacts.push("evidence/review-cycle.json");
    } else {
      json("evidence/control-plane.json", { base_sha: base, lane: { commit_sha: base, session_id: "implementer-session", review_session_id: "reviewer-session", owned_paths: owned } });
      json("evidence/assignment.json", { schema_version: 1, base_sha: base, assignments: [{ card_id: "ESC-120", session_id: "implementer-session", state: "ready-for-agent", reserved_paths: owned, blocked_by: [] }],
        withheld: ["ESC-118", "ESC-121", "ESC-122"].map(card_id => ({ card_id, reason: "Synthetic evidence explains why this card is withheld." })) });
      artifacts.push("evidence/control-plane.json", "evidence/assignment.json");
    }
    git("add", "."); git("commit", "-qm", "synthetic evidence");
    const contract = { kind, requiredSkills: [{ name: "dispatching-parallel-agents", source: "https://github.com/obra/superpowers" }], artifacts, artifactDirectories: ["evidence/sessions", "evidence/prompts"], commandArtifacts: [] };
    run({ root, repository, base, contract, sessions, git, write, json });
  } finally {
    fs.rmSync(repository, { recursive: true, force: true });
  }
}
test("committed workflow snapshot survives evidence-only commits and requires a successful capture", () => fixture("parallel", ({ root, contract, git, write }) => {
  const seal = sealMultiAgent(root, contract); verifyMultiAgent(root, contract, false);
  assert.throws(() => verifyMultiAgent(root, contract), /missing evidence\/commands\/verify.txt/i);
  write("evidence/commands/verify.txt", "Command: npm run evidence:verify\nRepository commit: " + seal.sourceSha + "\nStarted at: 2026-10-04T00:00:00Z\nFinished at: 2026-10-04T00:00:01Z\nexit code: 0\n");
  git("add", "."); git("commit", "-qm", "capture fixture"); verifyMultiAgent(root, contract);
}));
test("serial lane sessions and reused identities fail", () => fixture("parallel", ({ root, contract, sessions, json }) => {
  sessions[2].started_at = "2026-10-04T00:02:00Z"; sessions[2].finished_at = "2026-10-04T00:03:00Z";
  json("evidence/agent-sessions.json", { schema_version: 1, sessions });
  assert.throws(() => verifyAgentSessions(root, contract), /must overlap/);
  sessions[2].session_id = sessions[0].session_id;
  json("evidence/agent-sessions.json", { schema_version: 1, sessions });
  assert.throws(() => verifyAgentSessions(root, contract), /must be distinct/);
}));
test("source drift, raw transcript edits, and new uncommitted files invalidate evidence", () => fixture("parallel", ({ root, contract, git, write }) => {
  sealMultiAgent(root, contract);
  write("app/new-file.txt", "Uncommitted source.\n");
  assert.throws(() => verifyMultiAgent(root, contract, false), /Commit new exercise files/);
  git("add", "."); git("commit", "-qm", "source drift");
  assert.throws(() => verifyMultiAgent(root, contract, false), /Source changed after seal/);
  write("evidence/sessions/lane-A.txt", "Mutated raw session\n");
  assert.throws(() => verifyMultiAgent(root, contract, false), /Transcript must retain/);
}));
test("missing prompt, escaping session path, and stale transcript range fail", () => fixture("parallel", ({ root, contract, sessions, json }) => {
  sessions[0].proof = sessions[0].transcript_path + ":L1-L99";
  json("evidence/agent-sessions.json", { schema_version: 1, sessions });
  assert.throws(() => verifyAgentSessions(root, contract), /Invalid agent transcript range/);
  sessions[0].transcript_path = "evidence/sessions/../../../../outside.txt";
  json("evidence/agent-sessions.json", { schema_version: 1, sessions });
  assert.throws(() => verifyAgentSessions(root, contract), /escapes exercise/);
}));
test("specialist rechecks use fresh sessions and occur after baseline review", () => fixture("specialist", ({ root, contract, sessions, json }) => {
  verifyAgentSessions(root, contract);
  sessions[1].started_at = "2026-10-03T23:59:00Z";
  json("evidence/agent-sessions.json", { schema_version: 1, sessions });
  assert.throws(() => verifyAgentSessions(root, contract), /Finish baseline review/);
}));
test("assignment requires one ready card and independent review after implementation", () => fixture("assignment", ({ root, contract, base, sessions, json }) => {
  verifyAgentSessions(root, contract);
  json("evidence/assignment.json", { schema_version: 1, base_sha: base, assignments: [{ card_id: "ESC-122" }], withheld: [] });
  assert.throws(() => verifyAgentSessions(root, contract), /Assign only ESC-120/);
  sessions[1].started_at = "2026-10-03T23:59:00Z";
  json("evidence/agent-sessions.json", { schema_version: 1, sessions });
  assert.throws(() => verifyAgentSessions(root, contract), /Review starts after/);
}));
test("focused command records bind the exact commit and status", () => fixture("parallel", ({ root, contract, base, write, json }) => {
  json("evidence/integration.json", { product_head: base });
  contract.commandArtifacts = [{ path: "evidence/commands/integrated.txt", command: "npm run test:integrated", exit_code: 0 }];
  const record = sha => "Command: npm run test:integrated\nReviewed SHA: " + sha + "\nStarted at: 2026-10-04T00:00:00Z\nFinished at: 2026-10-04T00:00:01Z\n\nPASS synthetic record.\nexit code: 0\n";
  write("evidence/commands/integrated.txt", record(base)); verifyAgentSessions(root, contract);
  write("evidence/commands/integrated.txt", record("f".repeat(40)));
  assert.throws(() => verifyAgentSessions(root, contract), /different commit/);
}));
test("focused recorder executes an actual command and refuses uncommitted source", () => fixture("parallel", ({ root, git, write, json }) => {
  json("app/package.json", { scripts: { fixture: "node -e \"console.log('PASS real framework process')\"" } });
  json("app/evidence-contract.json", { captureCommands: ["fixture"] });
  git("add", "."); git("commit", "-qm", "command fixture");
  const recorder = path.join(import.meta.dirname, "capture-command.mjs");
  const result = spawnSync(process.execPath, [recorder, "--command", "fixture", "--out", "../evidence/commands/fixture.txt"], { cwd: path.join(root, "app"), encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr);
  assert.match(fs.readFileSync(path.join(root, "evidence/commands/fixture.txt"), "utf8"), /PASS real framework process/);
  const overwritten = spawnSync(process.execPath, [recorder, "--command", "fixture", "--out", "../evidence/commands/fixture.txt"], { cwd: path.join(root, "app"), encoding: "utf8" });
  assert.notEqual(overwritten.status, 0); assert.match(overwritten.stderr, /Preserve the previous capture/);
  write("app/source.txt", "Uncommitted edit\n");
  const rejected = spawnSync(process.execPath, [recorder, "--command", "fixture", "--out", "../evidence/commands/rejected.txt"], { cwd: path.join(root, "app"), encoding: "utf8" });
  assert.notEqual(rejected.status, 0); assert.ok(!fs.existsSync(path.join(root, "evidence/commands/rejected.txt")));
}));
test("documented seal, npm capture, evidence commit, and read-only final verification work together", () => fixture("parallel", ({ root, contract, git, write, json }) => {
  const library = pathToFileURL(path.join(import.meta.dirname, "multi-agent-evidence.mjs")).href;
  const capture = path.resolve(import.meta.dirname, "../../scripts/capture-verification.mjs");
  const guard = path.resolve(import.meta.dirname, "../../scripts/run-clean-verification.mjs");
  write("app/validate.mjs", "import {verifyMultiAgent} from " + JSON.stringify(library) + ";\nimport fs from 'node:fs';\nimport path from 'node:path';\nconst contract=JSON.parse(fs.readFileSync('evidence-contract.json'));\nverifyMultiAgent(path.resolve('..'),contract,process.argv[2]!=='content');\n");
  json("app/evidence-contract.json", contract);
  json("app/package.json", { scripts: { "evidence:verify": "node validate.mjs content", "evidence:capture": "node " + JSON.stringify(capture), "verify:exercise:core": "node validate.mjs", "verify:exercise": "node " + JSON.stringify(guard) } });
  git("add", "."); git("commit", "-qm", "synthetic capture workflow");
  sealMultiAgent(root, contract);
  const npm = process.platform === "win32" ? (process.env.ComSpec ?? "cmd.exe") : "npm";
  const args = words => process.platform === "win32" ? ["/d", "/s", "/c", "npm " + words.join(" ")] : words;
  const captured = spawnSync(npm, args(["run", "evidence:capture", "--", "--output", "../evidence/commands/verify.txt", "--", "npm", "run", "evidence:verify"]), { cwd: path.join(root, "app"), encoding: "utf8" });
  assert.equal(captured.status, 0, captured.stdout + captured.stderr);
  git("add", "."); git("commit", "-qm", "generated capture");
  const verified = spawnSync(npm, args(["run", "verify:exercise"]), { cwd: path.join(root, "app"), encoding: "utf8" });
  assert.equal(verified.status, 0, verified.stdout + verified.stderr);
  assert.equal(git("status", "--porcelain"), "");
}));
test("ownership history audits include deleted files", () => fixture("parallel", ({ root, repository, git, write }) => {
  write("app/outside-owned-scope.txt", "Protected from deletion by a lane.\n");
  git("add", "."); git("commit", "-qm", "owned path baseline");
  const base = git("rev-parse", "HEAD");
  fs.unlinkSync(path.join(root, "app/outside-owned-scope.txt"));
  git("add", "."); git("commit", "-qm", "synthetic out-of-scope deletion");
  const head = git("rev-parse", "HEAD"), expected = ["exercise/app/outside-owned-scope.txt"];
  assert.deepEqual(changedRepositoryPaths(repository, base, head), expected);
  assert.deepEqual(changedPaths(repository, base, head), expected);
}));
