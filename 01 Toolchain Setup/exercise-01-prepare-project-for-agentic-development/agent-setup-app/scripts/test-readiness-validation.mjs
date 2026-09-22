import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { test } from "node:test";
import { summarizeQueue as before } from "../../fixtures/review/before.mjs";
import { summarizeQueue as after } from "../../fixtures/review/after.mjs";
import { hash, checkOutputs, seal, verifySnapshot, verifyTranscript, runEvidence } from "../../../../scripts/context-document-evidence.mjs";
import { appName, capabilities, validateSetup, validateReadiness, verifySetupCommit, expandContract } from "./readiness-validation.mjs";
import { createReviewFixture } from "./setup-review.mjs";

function removeTemporary(root, prefix = "readiness-test-") {
  const relative = path.relative(os.tmpdir(), root);
  assert.ok(relative.startsWith(prefix) && !relative.includes(path.sep) && !path.isAbsolute(relative), "cleanup must stay within the created temporary directory");
  fs.rmSync(root, { recursive: true, force: true });
}

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "readiness-test-"));
  t.after(() => removeTemporary(root));
  const write = (relative, text) => { const file = path.join(root, relative); fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text); };
  const json = (relative, value) => write(relative, JSON.stringify(value, null, 2) + "\n");
  write(`${appName}/AGENTS.md`, "# Synthetic verifier fixture\nRun npm run agent:check from the application directory.\nRead src/router.mjs for routing boundaries and inspect evidence honestly.\n");
  write(`${appName}/docs/agent-setup.md`, "# Synthetic setup used only by automated verifier tests\nUse this synthetic fixture to test validation. It is not an actual installed skill or recorded agent run.\n");
  const inventory = { version: 1, configurationFiles: [`${appName}/AGENTS.md`, `${appName}/docs/agent-setup.md`], skills: capabilities.map((capability) => {
    const skillRoot = `${appName}/.agents/skills/test-${capability}`;
    const entry = `${skillRoot}/SKILL.md`;
    const text = `---\nname: test-${capability}\ndescription: Synthetic ${capability} fixture for testing validators only.\n---\nTest fixture content, not an actual engineering skill.\n`;
    write(entry, text);
    return { name: `test-${capability}`, source: "https://example.invalid/synthetic-fixture", revision: "unavailable", root: skillRoot, entry, capabilities: [capability], dependsOn: [], files: [{ path: entry, sha256: hash(text) }] };
  }) };
  json("evidence/skills.json", inventory);
  json(`${appName}/challenge-integrity.json`, { protectedFiles: {} });
  const lines = ["Synthetic verifier test data; this is not an agent transcript.", "Discovered AGENTS.md and " + inventory.skills.map((skill) => skill.name).join(", ")];
  const scenarios = capabilities.map((id) => {
    const invocation = `Synthetic invocation of test-${id}`;
    lines.push(invocation, `Synthetic result for ${id}; this line exists only to exercise transcript validation.`);
    return { id, skills: [`test-${id}`], invocation, proof: { firstLine: lines.length - 1, lastLine: lines.length } };
  });
  write("evidence/session.txt", lines.join("\n"));
  const record = { version: 1, session: { agent: "synthetic-test", version: "test", model: "unavailable", setupCommit: "a".repeat(40), startedAt: "2026-01-01T00:00:00Z", fresh: true, launchDirectory: appName, inheritedConfiguration: "none", interventions: [] }, discovery: { firstLine: 1, lastLine: 2 }, scenarios };
  const capture = () => write("evidence/commands/baseline.txt", `Command: npm run test:behavior\nRepository commit: ${record.session.setupCommit}\nStarted at: 2026-01-01T00:01:00Z\nFinished at: 2026-01-01T00:02:00Z\n# tests 5\n# fail 0\nexit code: 0\n`);
  json("evidence/readiness.json", record); capture();
  write("evidence/research.md", "## Recommendation\nSynthetic assertion.\n## Sources\nhttps://example.invalid/source-one\nhttps://example.invalid/source-two\n## Limitations\nTest data only.\n");
  write("evidence/tdd.md", "## Interface\nSynthetic interface.\n## Existing assertion\nSynthetic assertion.\n## Next test\nSynthetic next test.\n## Baseline\nevidence/commands/baseline.txt\n## Limits\nNot a model run.\n");
  return { root, write, json, inventory, record, capture };
}

test("portable skill collection and four readiness records validate", (t) => {
  const f = fixture(t);
  assert.equal(validateSetup(f.root).inventory.skills.length, 4);
  assert.equal(validateReadiness(f.root).record.scenarios.length, 4);
});

test("a missing capability fails even when skill files exist", (t) => {
  const f = fixture(t); f.inventory.skills[0].capabilities = [];
  f.json("evidence/skills.json", f.inventory);
  assert.throws(() => validateSetup(f.root), /missing capability: requirements/);
});

test("missing and circular skill dependencies fail", (t) => {
  const f = fixture(t); f.inventory.skills[0].dependsOn = ["missing"];
  f.json("evidence/skills.json", f.inventory);
  assert.throws(() => validateSetup(f.root), /missing or self-referencing dependency/);
  f.inventory.skills[0].dependsOn = ["test-research"];
  f.inventory.skills[1].dependsOn = ["test-requirements"];
  f.json("evidence/skills.json", f.inventory);
  assert.throws(() => validateSetup(f.root), /circular skill dependency/);
});

test("changed installed files and unlisted references fail", (t) => {
  const f = fixture(t); const skill = f.inventory.skills[0];
  f.write(skill.entry, fs.readFileSync(path.join(f.root, skill.entry), "utf8") + "Changed\n");
  assert.throws(() => validateSetup(f.root), /hash mismatch/);
  skill.files[0].sha256 = hash(fs.readFileSync(path.join(f.root, skill.entry), "utf8"));
  f.json("evidence/skills.json", f.inventory);
  f.write(`${skill.root}/reference.md`, "Unlisted supporting resource.\n");
  assert.throws(() => validateSetup(f.root), /incomplete or duplicate installed files/);
});

test("broken packaged links and incorrect skill metadata fail", (t) => {
  const f = fixture(t); const skill = f.inventory.skills[0];
  const text = fs.readFileSync(path.join(f.root, skill.entry), "utf8") + "[Missing](missing.md)\n";
  f.write(skill.entry, text); skill.files[0].sha256 = hash(text); f.json("evidence/skills.json", f.inventory);
  assert.throws(() => validateSetup(f.root), /broken local link/);
  skill.name = "wrong-name"; f.json("evidence/skills.json", f.inventory);
  assert.throws(() => validateSetup(f.root), /differs from metadata/);
});

test("escaping paths and duplicate skills are rejected", (t) => {
  const f = fixture(t); f.inventory.configurationFiles.push("../outside.md");
  f.json("evidence/skills.json", f.inventory);
  assert.throws(() => validateSetup(f.root), /configuration must be inside/);
  f.inventory.configurationFiles.pop(); f.inventory.skills.push(f.inventory.skills[0]);
  f.json("evidence/skills.json", f.inventory);
  assert.throws(() => validateSetup(f.root), /names must be unique/);
});

test("a native configuration file cannot be omitted from the portable setup", (t) => {
  const f = fixture(t);
  f.write(`${appName}/.codex/config.toml`, "# Synthetic unlisted configuration\n");
  assert.throws(() => validateSetup(f.root), /unlisted native setup file/);
});

test("skill-generated knowledge is allowed but cannot replace setup", (t) => {
  const f = fixture(t);
  f.inventory.generatedFiles = [`${appName}/CONTEXT.md`]; f.json("evidence/skills.json", f.inventory);
  assert.ok(validateSetup(f.root));
  assert.throws(() => validateReadiness(f.root), /missing file/);
  f.write(`${appName}/CONTEXT.md`, "Synthetic knowledge created during the readiness scenario.\n");
  assert.ok(validateReadiness(f.root));
  f.inventory.generatedFiles = [`${appName}/docs/agent-setup.md`]; f.json("evidence/skills.json", f.inventory);
  assert.throws(() => validateSetup(f.root), /cannot replace setup/);
});

test("missing scenario, false freshness, invalid ranges and invented invocations fail", (t) => {
  const f = fixture(t);
  f.record.session.fresh = false; f.json("evidence/readiness.json", f.record);
  assert.throws(() => validateReadiness(f.root), /fresh session/);
  f.record.session.fresh = true;
  const scenario = f.record.scenarios.pop(); f.json("evidence/readiness.json", f.record);
  assert.throws(() => validateReadiness(f.root), /each readiness scenario/);
  f.record.scenarios.push(scenario); scenario.proof.lastLine = 999; f.json("evidence/readiness.json", f.record);
  assert.throws(() => validateReadiness(f.root), /invalid transcript range/);
  scenario.proof.lastLine = 10; scenario.invocation = "Invented invocation"; f.json("evidence/readiness.json", f.record);
  assert.throws(() => validateReadiness(f.root), /invocation is absent/);
});

test("failed, stale and empty testing captures cannot pass readiness", (t) => {
  const f = fixture(t); const original = fs.readFileSync(path.join(f.root, "evidence/commands/baseline.txt"), "utf8");
  for (const [text, message] of [
    [original.replace("exit code: 0", "exit code: 1"), /did not succeed/],
    [original.replace("a".repeat(40), "b".repeat(40)), /setup commit/],
    [original.replace("# tests 5", "# tests 0"), /actual test output/],
    [original.replace("# fail 0", "# fail 1"), /no failing tests/]
  ]) {
    f.write("evidence/commands/baseline.txt", text);
    assert.throws(() => validateReadiness(f.root), message);
  }
});

test("review fixture retains observable count and mutation defects", () => {
  const cases = [{ id: "a", status: "new", riskScore: 1 }, { id: "b", status: "waiting", riskScore: 9 }];
  assert.deepEqual(before(cases).items.map((item) => item.id), ["b", "a"]);
  assert.deepEqual(cases.map((item) => item.id), ["a", "b"]);
  const selected = after(cases, "new");
  assert.equal(selected.items.length, 1);
  assert.notEqual(selected.count, selected.items.length);
  assert.equal(after(cases, "blocked").count, 2);
  after(cases);
  assert.deepEqual(cases.map((item) => item.id), ["b", "a"]);
});

test("review setup makes a non-empty Git diff with exact source and spec", (t) => {
  const created = createReviewFixture();
  t.after(() => removeTemporary(created.repository, "agent-readiness-review-"));
  const diff = execFileSync("git", ["diff", `${created.baseCommit}...${created.changeCommit}`], { cwd: created.repository, encoding: "utf8" });
  assert.match(diff, /count: cases.length/);
  assert.ok(fs.existsSync(created.spec));
  assert.ok(fs.existsSync(created.standards));
  assert.notEqual(created.baseCommit, created.changeCommit);
});

test("committed setup, source audit, dynamic sealing and stale-proof rejection integrate", async (t) => {
  const f = fixture(t);
  const env = { ...process.env, GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: process.platform === "win32" ? "NUL" : "/dev/null", GIT_AUTHOR_NAME: "Fixture", GIT_AUTHOR_EMAIL: "fixture@example.invalid", GIT_COMMITTER_NAME: "Fixture", GIT_COMMITTER_EMAIL: "fixture@example.invalid" };
  const git = (...args) => execFileSync("git", ["-c", "core.hooksPath=", "-c", "commit.gpgsign=false", ...args], { cwd: f.root, env, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  git("init", "--initial-branch=fixture"); git("add", appName); git("commit", "-m", "Synthetic setup");
  f.record.session.setupCommit = git("rev-parse", "HEAD"); f.capture(); f.json("evidence/readiness.json", f.record);
  const contract = JSON.parse(fs.readFileSync(path.resolve(import.meta.dirname, "../evidence-contract.json"), "utf8"));
  f.json(`${appName}/evidence-contract.json`, contract);
  f.write(`${appName}/src/router.mjs`, "export const syntheticSource = true;\n");
  for (const report of contract.outputs) {
    if (report.headings && !fs.existsSync(path.join(f.root, report.path))) f.write(report.path, report.headings.map((heading) => `## ${heading}\nSynthetic output for verifier integration only.\n`).join("\n"));
  }
  const artifactLine = "Read src/router.mjs for routing boundaries and inspect evidence honestly.";
  f.json("evidence/source-audit.json", { claims: contract.topics.map((topic) => ({ id: topic, topic, status: "supported", reason: "Synthetic source linkage for validation integration tests only.", artifact: { path: `${appName}/AGENTS.md`, line: 3, excerpt: artifactLine }, sources: [{ path: `${appName}/src/router.mjs`, line: 1, excerpt: "export const syntheticSource = true;" }] })) });
  for (const name of ["before", "after"]) f.write(`evidence/${name}.md`, "## Conditions\nSynthetic test.\n## Findings\nSynthetic test.\n## Proof\nSynthetic test.\n");
  f.write("evidence/comparison.md", "## Changes\nSynthetic test.\n## Verified\nSynthetic test.\n## Remaining questions\nSynthetic test.\n");
  const setup = validateReadiness(f.root); verifySetupCommit(f.root, setup);
  expandContract(contract, setup); await checkOutputs(f.root, contract);
  git("add", "."); git("commit", "-m", "Synthetic evidence");
  seal(f.root, path.join(f.root, appName), contract);
  const manifest = JSON.parse(fs.readFileSync(path.join(f.root, "evidence/manifest.json"), "utf8"));
  assert.ok(manifest.files[setup.inventory.skills[0].entry]);
  verifySnapshot(f.root, manifest, contract);
  f.write("evidence/commands/verify.txt", `Command: npm run evidence:verify\nRepository commit: ${manifest.sourceSha}\nStarted at: 2026-01-01T00:00:00Z\nFinished at: 2026-01-01T00:01:00Z\nexit code: 0\n`);
  verifyTranscript(f.root, manifest.sourceSha);
  await runEvidence({ appRoot: path.join(f.root, appName), validate: (root, loadedContract) => {
    const checked = validateReadiness(root); verifySetupCommit(root, checked); expandContract(loadedContract, checked);
  } });
  f.write(`${appName}/AGENTS.md`, "Changed after setup and seal.\n");
  assert.throws(() => verifySetupCommit(f.root, setup), /setup changed after/);
  assert.throws(() => verifySnapshot(f.root, manifest, contract), /artifact changed since seal/);
});
