import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { checkSkillEvidence, verifyTranscript } from "../../scripts/context-document-evidence.mjs";

const digest = (bytes) => crypto.createHash("sha256").update(bytes).digest("hex");
const git = (root, args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
const slash = (value) => value.split(path.sep).join("/");
function inside(root, relative) {
  assert.ok(typeof relative === "string" && relative && !path.isAbsolute(relative), "Artifact needs a relative path");
  const absolute = path.resolve(root, relative), local = path.relative(root, absolute);
  assert.ok(local && !local.startsWith("..") && !path.isAbsolute(local), `Artifact escapes exercise: ${relative}`);
  assert.ok(fs.existsSync(absolute), `Missing ${relative}`);
  const real = path.relative(fs.realpathSync(root), fs.realpathSync(absolute));
  assert.ok(real && !real.startsWith("..") && !path.isAbsolute(real), `Linked artifact escapes exercise: ${relative}`);
  assert.ok(!fs.lstatSync(absolute).isSymbolicLink(), `Linked artifacts are not supported: ${relative}`);
  return absolute;
}
function walk(root, relative) {
  const directory = inside(root, relative);
  assert.ok(fs.statSync(directory).isDirectory(), `${relative} must be a directory`);
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (["node_modules", "__pycache__"].includes(entry.name) || entry.name.endsWith(".pyc")) return [];
    const next = slash(path.join(relative, entry.name));
    assert.ok(!entry.isSymbolicLink(), `Linked artifact is not supported: ${next}`);
    return entry.isDirectory() ? walk(root, next) : [next];
  });
}
export function artifactPaths(root, contract) {
  return [...new Set([
    ...contract.artifacts,
    ...(contract.artifactDirectories ?? []).flatMap((relative) => walk(root, relative)),
    ...(contract.optionalArtifacts ?? []).filter((relative) => fs.existsSync(path.join(root, relative))),
  ])].sort();
}
function sourceTree(root, commit) {
  const prefix = git(root, ["rev-parse", "--show-prefix"]);
  return Object.fromEntries(git(root, ["ls-tree", "-rz", "--full-tree", commit, "--", prefix || "."]).split("\0").filter(Boolean).map((entry) => {
    const [metadata, name] = entry.split("\t");
    assert.ok(metadata.startsWith("100"), "Exercise snapshots contain only regular files");
    return [name.slice(prefix.length), metadata.split(" ")[2]];
  }).filter(([name]) => !name.startsWith("evidence/")).sort(([a], [b]) => a.localeCompare(b)));
}
function checkContent(root, contract) {
  for (const name of ["before", "after"]) {
    const text = fs.readFileSync(inside(root, `evidence/${name}.md`), "utf8");
    for (const heading of ["Conditions", "Findings", "Proof"]) assert.ok(text.includes(`## ${heading}`), `${name}.md needs ${heading}`);
  }
  const comparison = fs.readFileSync(inside(root, "evidence/comparison.md"), "utf8");
  for (const heading of ["Changes", "Verified", "Remaining questions"]) assert.ok(comparison.includes(`## ${heading}`), `comparison.md needs ${heading}`);
  checkSkillEvidence(root, contract);
  if (contract.kind === "activation") {
    const observations = new Set();
    for (const name of ["before", "after"]) {
      const result = JSON.parse(fs.readFileSync(inside(root, `evidence/${name}-results.json`), "utf8"));
      for (const item of result.cases) for (const decision of item.decisions) {
        const proof = decision.observation?.match(/^(evidence\/routing\/[^:]+):L(\d+)-L(\d+)$/);
        assert.ok(proof, "Activation observations must cite raw routing files and line ranges");
        assert.ok(!observations.has(proof[1]), "Use an independent session record for each routing decision");
        observations.add(proof[1]);
        const lines = fs.readFileSync(inside(root, proof[1]), "utf8").replaceAll("\r\n", "\n").split("\n");
        const first = Number(proof[2]), last = Number(proof[3]);
        assert.ok(first > 0 && last >= first && last <= lines.length, "Invalid routing transcript range");
        assert.equal(lines.slice(first - 1, last).join("\n"), decision.raw_response.replaceAll("\r\n", "\n"), "Routing response differs from the cited raw record");
      }
    }
  }
  if (contract.kind === "benchmark") {
    for (let id = 1; id <= 4; id++) for (const configuration of ["without_skill", "starter_skill", "with_skill"]) for (let run = 1; run <= 3; run++) {
      const session = fs.readFileSync(inside(root, `benchmark-workspace/eval-${id}/${configuration}/run-${run}/session.txt`), "utf8");
      assert.ok(session.trim().length >= 100, "Preserve the actual benchmark session and usage result for every run");
    }
  }
  for (const relative of artifactPaths(root, contract)) {
    const file = inside(root, relative);
    assert.ok(fs.statSync(file).isFile() && fs.statSync(file).size > 0, `Empty artifact: ${relative}`);
  }
}
export function sealPackaging(root, contract) {
  root = fs.realpathSync(root);
  checkContent(root, contract);
  const sourceSha = git(root, ["rev-parse", "HEAD"]), prefix = git(root, ["rev-parse", "--show-prefix"]);
  const files = Object.fromEntries(artifactPaths(root, contract).map((relative) => {
    const bytes = fs.readFileSync(inside(root, relative));
    const committed = execFileSync("git", ["show", `${sourceSha}:${prefix}${relative}`], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
    // Text can be checked out with CRLF; archives remain byte-exact.
    const normalized = (value) => relative.endsWith(".skill") ? value : Buffer.from(value.toString("utf8").replaceAll("\r\n", "\n"));
    assert.equal(digest(normalized(bytes)), digest(normalized(committed)), `Commit ${relative} before sealing`);
    return [relative, digest(bytes)];
  }));
  const manifest = { schema: 1, sourceSha, files, sourceTree: sourceTree(root, sourceSha) };
  fs.writeFileSync(path.join(root, "evidence/manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Sealed ${Object.keys(files).length} artifacts at ${sourceSha}`);
  return manifest;
}
export function verifyPackaging(root, contract, captureRequired = true) {
  root = fs.realpathSync(root);
  checkContent(root, contract);
  const manifest = JSON.parse(fs.readFileSync(inside(root, "evidence/manifest.json"), "utf8"));
  assert.equal(manifest.schema, 1);
  assert.match(manifest.sourceSha ?? "", /^[a-f0-9]{40}$/);
  git(root, ["merge-base", "--is-ancestor", manifest.sourceSha, "HEAD"]);
  const expectedFiles = Object.fromEntries(artifactPaths(root, contract).map((relative) => [relative, digest(fs.readFileSync(inside(root, relative)))]));
  assert.deepEqual(manifest.files, expectedFiles, "Artifacts changed or are missing since seal");
  assert.deepEqual(manifest.sourceTree, sourceTree(root, manifest.sourceSha), "Source snapshot does not match its commit");
  assert.deepEqual(manifest.sourceTree, sourceTree(root, "HEAD"), "Source changed after seal; regenerate the evidence");
  const prefix = git(root, ["rev-parse", "--show-prefix"]);
  const scope = [`:(top)${prefix}`, `:(top,exclude)${prefix}evidence`];
  assert.equal(git(root, ["diff", "HEAD", "--", ...scope]), "", "Commit exercise changes before verification");
  assert.equal(git(root, ["ls-files", "--others", "--exclude-standard", "--", ...scope]), "", "Commit new exercise files before verification");
  const committedPrefix = prefix;
  for (const relative of Object.keys(manifest.files)) {
    const committed = execFileSync("git", ["show", `${manifest.sourceSha}:${committedPrefix}${relative}`], { cwd: root, stdio: ["ignore", "pipe", "pipe"] });
    const bytes = fs.readFileSync(inside(root, relative));
    const normalize = (value) => relative.endsWith(".skill") ? value : value.toString("utf8").replaceAll("\r\n", "\n");
    assert.equal(digest(normalize(bytes)), digest(normalize(committed)), `Artifact is not bound to source commit: ${relative}`);
  }
  if (captureRequired) verifyTranscript(root, manifest.sourceSha);
  console.log("PASS committed skill artifacts, session references, snapshot freshness, and verification capture. Review the actual sessions and output semantics.");
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  try {
    const root = path.resolve(process.cwd(), "..");
    const contract = JSON.parse(fs.readFileSync(path.join(process.cwd(), "evidence-contract.json")));
    if (process.argv[2] === "seal") sealPackaging(root, contract);
    else verifyPackaging(root, contract, process.argv[2] !== "content");
  } catch (error) {
    console.error(`Packaging evidence verification failed: ${error.message}`);
    process.exitCode = 1;
  }
}
