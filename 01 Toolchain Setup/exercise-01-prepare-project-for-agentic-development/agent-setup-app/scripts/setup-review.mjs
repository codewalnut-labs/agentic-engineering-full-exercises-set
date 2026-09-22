import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { pathToFileURL } from "node:url";

export function createReviewFixture() {
  const fixture = path.resolve(import.meta.dirname, "../../fixtures/review");
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "agent-readiness-review-"));
  const env = { ...process.env, GIT_CONFIG_NOSYSTEM: "1", GIT_CONFIG_GLOBAL: process.platform === "win32" ? "NUL" : "/dev/null",
    GIT_AUTHOR_NAME: "Exercise fixture", GIT_AUTHOR_EMAIL: "fixture@example.invalid",
    GIT_COMMITTER_NAME: "Exercise fixture", GIT_COMMITTER_EMAIL: "fixture@example.invalid",
    GIT_AUTHOR_DATE: "2026-01-01T00:00:00Z", GIT_COMMITTER_DATE: "2026-01-01T00:00:00Z" };
  const git = (...args) => execFileSync("git", ["-c", "core.hooksPath=", "-c", "commit.gpgsign=false", ...args], { cwd: root, env, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
  git("init", "--initial-branch=sample-review");
  const copy = (source, destination) => fs.writeFileSync(path.join(root, destination), fs.readFileSync(path.join(fixture, source), "utf8").replaceAll("\r\n", "\n"));
  copy("spec.md", "spec.md");
  copy("standards.md", "CODING_STANDARDS.md");
  copy("before.mjs", "queueSummary.mjs");
  git("add", "."); git("commit", "-m", "Baseline queue summary");
  const baseCommit = git("rev-parse", "HEAD");
  copy("after.mjs", "queueSummary.mjs");
  git("add", "."); git("commit", "-m", "Add status filtering; requirements in spec.md");
  return { repository: root, baseCommit, changeCommit: git("rev-parse", "HEAD"), spec: path.join(root, "spec.md"), standards: path.join(root, "CODING_STANDARDS.md") };
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  console.log(JSON.stringify(createReviewFixture(), null, 2));
}
