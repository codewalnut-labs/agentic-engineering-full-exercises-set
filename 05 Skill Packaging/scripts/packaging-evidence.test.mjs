import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { test } from "node:test";
import { artifactPaths, sealPackaging, verifyPackaging } from "./packaging-evidence.mjs";

function fixture(run) {
  const repository = fs.mkdtempSync(path.join(os.tmpdir(), "packaging-proof-"));
  const root = path.join(repository, "exercise");
  const git = (...args) => execFileSync("git", args, { cwd: repository, stdio: ["ignore", "pipe", "pipe"] }).toString().trim();
  const write = (relative, content) => {
    const file = path.join(root, relative);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, content);
  };
  try {
    git("init", "-q", "-b", "main");
    git("config", "user.name", "Evidence framework test");
    git("config", "user.email", "test@example.invalid");
    git("config", "core.autocrlf", "false");
    write("app/skills/test/SKILL.md", "---\nname: test\ndescription: Synthetic framework fixture\n---\n");
    for (const name of ["before", "after"]) write(`evidence/${name}.md`, "## Conditions\nFramework fixture only.\n## Findings\nA synthetic record tests snapshot binding.\n## Proof\nNo real agent session is claimed.\n");
    write("evidence/comparison.md", "## Changes\nSynthetic test only.\n## Verified\nCommit and capture integrity.\n## Remaining questions\nActual agent use requires human review.\n");
    write("evidence/skill-session.txt", "This is a synthetic framework session, not a learner run.\n" + "A skill-creator invocation would be recorded by the actual agent runtime.\n".repeat(2));
    write("evidence/skill-use.md", "## skill-creator\nSource: https://github.com/anthropics/skills/tree/main/skills/skill-creator\nRevision: " + "1".repeat(40) + "\nInvocation: synthetic framework test\nProof: evidence/skill-session.txt:L1-L3\n");
    git("add", "."); git("commit", "-qm", "framework fixture");
    const contract = {
      requiredSkills: [{ name: "skill-creator", source: "https://github.com/anthropics/skills" }],
      artifacts: ["evidence/before.md", "evidence/after.md", "evidence/comparison.md", "evidence/skill-use.md", "evidence/skill-session.txt"],
      artifactDirectories: ["app/skills/test"], optionalArtifacts: ["dist/test.skill"],
    };
    run({ root, repository, git, write, contract });
  } finally {
    fs.rmSync(repository, { recursive: true, force: true });
  }
}

test("a committed snapshot remains valid after evidence-only commits and requires a passing capture", () => fixture(({ root, git, write, contract }) => {
  const manifest = sealPackaging(root, contract);
  verifyPackaging(root, contract, false);
  assert.throws(() => verifyPackaging(root, contract), /missing evidence\/commands\/verify.txt/i);
  write("evidence/commands/verify.txt", `Command: npm run evidence:verify\nRepository commit: ${manifest.sourceSha}\nStarted at: 2026-01-01T00:00:00Z\nFinished at: 2026-01-01T00:00:01Z\nexit code: 0\n`);
  git("add", "."); git("commit", "-qm", "framework capture");
  verifyPackaging(root, contract);
  fs.writeFileSync(path.join(path.dirname(root), "unrelated.md"), "Outside the exercise.\n");
  git("add", "."); git("commit", "-qm", "unrelated repository change");
  verifyPackaging(root, contract);
}));
test("uncommitted output and artifact changes cannot be sealed or reused", () => fixture(({ root, write, contract }) => {
  sealPackaging(root, contract);
  write("evidence/after.md", "## Conditions\nNew output\n## Findings\nChanged findings\n## Proof\nChanged proof\n");
  assert.throws(() => verifyPackaging(root, contract, false), /Artifacts changed/);
  assert.throws(() => sealPackaging(root, contract), /Commit evidence\/after.md/);
}));
test("committed candidate changes invalidate the recorded source tree", () => fixture(({ root, git, write, contract }) => {
  sealPackaging(root, contract);
  write("app/new-reference.md", "A changed candidate reference.\n");
  git("add", "."); git("commit", "-qm", "candidate changed");
  assert.throws(() => verifyPackaging(root, contract, false), /Source changed after seal/);
}));
test("new uncommitted exercise files are detected from a nested exercise directory", () => fixture(({ root, write, contract }) => {
  sealPackaging(root, contract);
  write("app/new-script.mjs", "console.log('new candidate');\n");
  assert.throws(() => verifyPackaging(root, contract, false), /Commit new exercise files/);
}));
test("archive bytes and optional distribution artifacts are bound to the evaluated snapshot", () => fixture(({ root, git, write, contract }) => {
  write("dist/test.skill", Buffer.from([0, 1, 2, 3]));
  git("add", "."); git("commit", "-qm", "archive fixture");
  sealPackaging(root, contract);
  write("dist/test.skill", Buffer.from([0, 1, 2, 4]));
  assert.throws(() => verifyPackaging(root, contract, false), /Artifacts changed/);
}));
test("escaping paths and invalid transcript references fail validation", () => fixture(({ root, write, contract }) => {
  assert.throws(() => artifactPaths(root, { ...contract, artifactDirectories: ["../"] }), /escapes exercise/);
  write("evidence/skill-use.md", "## skill-creator\nSource: https://github.com/anthropics/skills\nRevision: " + "1".repeat(40) + "\nInvocation: framework fixture\nProof: evidence/skill-session.txt:L1-L99\n");
  assert.throws(() => sealPackaging(root, contract), /invalid transcript line range/);
}));
test("routing observations must match separate raw native-session records", () => fixture(({ root, git, write, contract }) => {
  contract.kind = "activation";
  contract.artifacts.push("evidence/before-results.json", "evidence/after-results.json");
  contract.artifactDirectories.push("evidence/routing");
  for (const stage of ["before", "after"]) {
    const raw = `Synthetic ${stage} runtime tool record: Skill(change-review).`;
    write(`evidence/routing/${stage}.txt`, raw + "\n");
    write(`evidence/${stage}-results.json`, JSON.stringify({ cases: [{ decisions: [{ raw_response: raw, observation: `evidence/routing/${stage}.txt:L1-L1` }] }] }));
  }
  git("add", "."); git("commit", "-qm", "routing proof fixture");
  sealPackaging(root, contract);
  const result = JSON.parse(fs.readFileSync(path.join(root, "evidence/after-results.json")));
  result.cases[0].decisions[0].raw_response = "An invented result differs from the saved session.";
  write("evidence/after-results.json", JSON.stringify(result));
  assert.throws(() => sealPackaging(root, contract), /differs from the cited raw record/);
}));
test("every benchmark run needs a retained session", () => fixture(({ root, git, write, contract }) => {
  contract.kind = "benchmark";
  contract.artifactDirectories.push("benchmark-workspace");
  for (let id = 1; id <= 4; id++) for (const configuration of ["without_skill", "starter_skill", "with_skill"]) for (let run = 1; run <= 3; run++) {
    write(`benchmark-workspace/eval-${id}/${configuration}/run-${run}/session.txt`, "Synthetic framework session and usage result. ".repeat(4));
  }
  git("add", "."); git("commit", "-qm", "benchmark session fixture");
  sealPackaging(root, contract);
  fs.unlinkSync(path.join(root, "benchmark-workspace/eval-4/with_skill/run-3/session.txt"));
  assert.throws(() => verifyPackaging(root, contract, false), /Missing benchmark-workspace/);
}));
