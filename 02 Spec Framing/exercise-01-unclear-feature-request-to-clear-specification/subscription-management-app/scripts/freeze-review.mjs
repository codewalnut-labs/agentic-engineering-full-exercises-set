import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { hash } from "../../../../scripts/context-document-evidence.mjs";
import { readArtifact, reviewInputs } from "./spec-validation.mjs";

import { validateCaptures, stages } from "./workflow-validation.mjs";

const root = fs.realpathSync(path.resolve(import.meta.dirname, "../.."));
try {
  const git = (args) => execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
  const reviewedCommit = git(["rev-parse", "HEAD"]).trim();
  const prefix = git(["rev-parse", "--show-prefix"]).trim();
  const captures = validateCaptures(root);
  for (const source of ["evidence/stage-captures.json", ...stages.map((s) => s.path)]) {
    if (hash(git(["show", `${reviewedCommit}:${prefix}${source}`])) !== hash(readArtifact(root, source))) throw new Error("commit stage captures before review:freeze");
  }
  const files = reviewInputs.map(({ source, path: destination }) => {
    const content = readArtifact(root, source);
    if (hash(git(["show", `${reviewedCommit}:${prefix}${source}`])) !== hash(content)) throw new Error("commit all four draft inputs before review:freeze");
    return { source, path: destination, sha256: hash(content), content };
  });
  for (const index of [1, 2]) {
    const input = files.find((f) => f.source === stages[index].source);
    if (input.sha256 !== captures[index].sha256) throw new Error("draft must match its captured stage output");
  }
  if (Date.parse(captures[2].capturedAt) > Date.now()) throw new Error("capture timestamp is in the future");
  for (const target of ["evidence/review-inputs.json", ...files.map((f) => f.path)]) {
    if (fs.existsSync(path.join(root, target))) throw new Error("review inputs already exist; preserve the accepted review instead of overwriting it");
  }
  const evidenceDirectory = path.join(root, "evidence");
  fs.mkdirSync(evidenceDirectory, { recursive: true });
  if (fs.realpathSync(evidenceDirectory) !== evidenceDirectory) throw new Error("evidence directory must not be a link");
  fs.mkdirSync(path.join(evidenceDirectory, "reviewed"), { recursive: true });
  if (fs.realpathSync(path.join(evidenceDirectory, "reviewed")) !== path.join(evidenceDirectory, "reviewed")) throw new Error("reviewed directory must not be a link");
  for (const file of files) fs.writeFileSync(path.join(root, file.path), file.content, { flag: "wx" });
  const manifest = { reviewedCommit, frozenAt: new Date().toISOString(), files: files.map(({ content, ...file }) => file) };
  fs.writeFileSync(path.join(root, "evidence/review-inputs.json"), JSON.stringify(manifest, null, 2) + "\n", { flag: "wx" });
  console.log(`Preserved all four review inputs at ${reviewedCommit}. Start the fresh review session now.`);
} catch (error) {
  console.error(`Could not preserve review inputs: ${error.message}`);
  process.exitCode = 1;
}
