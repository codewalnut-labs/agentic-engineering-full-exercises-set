import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { analyzeSession } from "../src/retro/analyzeSession.mjs";
const root = path.resolve(import.meta.dirname, "../..");
const pairs = [["docs/session-events.json", "baseline.json"], ["evidence/replay-events.json", "after.json"]];
const results = pairs.map(([input, output]) => {
  const target = path.join(root, "evidence", output);
  assert.ok(!fs.existsSync(target), "archive previous metrics before regenerating: " + output);
  return [target, analyzeSession(JSON.parse(fs.readFileSync(path.join(root, input), "utf8")))];
});
for (const [target, result] of results) fs.writeFileSync(target, JSON.stringify(result, null, 2) + "\n");
console.log("Generated baseline and replay metrics from the actual event files");
