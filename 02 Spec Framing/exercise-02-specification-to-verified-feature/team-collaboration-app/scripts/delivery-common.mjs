import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { hash } from "../../../../scripts/context-document-evidence.mjs";

export const APP = "team-collaboration-app";
export const requiredSkills = ["brainstorming", "writing-plans", "test-driven-development", "requesting-code-review", "verification-before-completion"];
export function read(root, relative) {
  assert.ok(typeof relative === "string" && relative && !path.win32.isAbsolute(relative) && !relative.includes("\\") && !relative.split("/").includes(".."), "use an exercise-relative path");
  const file = path.resolve(root, relative);
  assert.ok(fs.existsSync(file), "missing required artifact: " + relative);
  const local = path.relative(fs.realpathSync(root), fs.realpathSync(file));
  assert.ok(local && !local.startsWith("..") && !path.isAbsolute(local) && fs.statSync(file).isFile(), "artifact must be a local file");
  return fs.readFileSync(file, "utf8").replaceAll("\r\n", "\n");
}
export function git(root, args) {
  return execFileSync("git", args, { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).replaceAll("\r\n", "\n").trimEnd();
}
export function committed(root, commit, relative) {
  assert.match(commit ?? "", /^[a-f0-9]{40}$/, "record a full commit SHA");
  git(root, ["merge-base", "--is-ancestor", commit, "HEAD"]);
  read(root, relative);
  return execFileSync("git", ["show", commit + ":" + git(root, ["rev-parse", "--show-prefix"]) + relative], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).replaceAll("\r\n", "\n");
}
export function citation(root, item, expectedPath) {
  if (expectedPath) assert.equal(item?.path, expectedPath, "cite the actual session or command output");
  assert.ok(Number.isInteger(item?.line) && item.line > 0 && typeof item.excerpt === "string" && item.excerpt.trim().length >= 8, "citation needs line and exact excerpt");
  assert.equal(read(root, item.path).split("\n").slice(item.line - 1, item.line - 1 + item.excerpt.split("\n").length).join("\n"), item.excerpt, "stale evidence citation");
}
export function listFiles(root, directory) {
  const results = [];
  if (!fs.existsSync(path.join(root, directory))) return results;
  for (const entry of fs.readdirSync(path.join(root, directory), { withFileTypes: true })) {
    assert.ok(!entry.isSymbolicLink(), "source and test directories must not contain links");
    const relative = directory + "/" + entry.name;
    if (entry.isDirectory()) results.push(...listFiles(root, relative));
    else if (entry.isFile()) results.push(relative);
  }
  return results.sort();
}
export function snapshot(root) {
  const files = [...listFiles(root, APP + "/src"), ...listFiles(root, APP + "/tests")];
  return Object.fromEntries(files.map((p) => [p, hash(read(root, p))]));
}
export function sourceOnly(files) { return Object.fromEntries(Object.entries(files).filter(([p]) => p.startsWith(APP + "/src/"))); }
export function sameBytes(a, b) { return hash(a.trimEnd()) === hash(b.trimEnd()); }
