import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const lane = process.argv[2];
assert.ok(["before", "after"].includes(lane), "choose before or after");
const target = path.resolve(process.cwd(), "../evidence/" + lane + "-output.json");
assert.ok(!fs.existsSync(target), "preserve the previous snapshot before recapturing");
const output = execFileSync(process.execPath, ["scripts/run-characterization-oracle.mjs", "--json"], { cwd: process.cwd(), encoding: "utf8" });
JSON.parse(output);
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, output);
console.log("Captured actual public outputs: " + target);
