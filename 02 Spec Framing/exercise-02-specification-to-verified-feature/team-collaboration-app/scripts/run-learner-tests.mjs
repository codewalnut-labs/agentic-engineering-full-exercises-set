import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

function walk(directory) {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : entry.isFile() && /\.test\.(ts|mjs)$/.test(entry.name) ? [file] : [];
  });
}
const files = walk("tests/learner");
if (!files.length) {
  console.error("Add a meaningful regression test under tests/learner/*.test.ts or *.test.mjs.");
  process.exit(1);
}
const result = spawnSync(process.execPath, ["--experimental-strip-types", "--test", "--test-reporter=tap", ...files], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
process.stdout.write(result.stdout ?? "");
process.stderr.write(result.stderr ?? "");
process.exit(result.status ?? 1);
