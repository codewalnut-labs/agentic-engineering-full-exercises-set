import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { benchmarkMarkdown, buildBenchmark, collectWorkspace } from "./benchmark-lib.mjs";

const appRoot = process.cwd();
const exerciseRoot = path.resolve(appRoot, "..");
const evals = JSON.parse(fs.readFileSync(path.join(appRoot, "evals", "evals.json"), "utf8")).evals;
const collected = collectWorkspace({ appRoot, exerciseRoot, evals });
if (collected.failures.length) {
  console.error("Benchmark aggregation failed:\n" + collected.failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}
const benchmark = buildBenchmark(collected, evals);
const evidenceRoot = path.join(exerciseRoot, "evidence");

const benchmarkJson = JSON.stringify(benchmark, null, 2) + "\n";
if (process.argv.includes("--check")) {
  for (const [name, expected] of [["benchmark.json", benchmarkJson], ["benchmark.md", benchmarkMarkdown(benchmark)]]) {
    const file = path.join(evidenceRoot, name);
    if (!fs.existsSync(file) || fs.readFileSync(file, "utf8").replaceAll("\r\n", "\n") !== expected.replaceAll("\r\n", "\n")) throw new Error(name + " is missing or stale; regenerate it before verification");
  }
} else {
  fs.mkdirSync(evidenceRoot, { recursive: true });
  fs.writeFileSync(path.join(evidenceRoot, "benchmark.json"), benchmarkJson);
  fs.writeFileSync(path.join(evidenceRoot, "benchmark.md"), benchmarkMarkdown(benchmark));
}
console.log(`Benchmark gate ${benchmark.gate.passed ? "passed" : "failed"}. Generated reports match evidence/benchmark.json and evidence/benchmark.md.`);
console.log(`Benchmark SHA-256: ${crypto.createHash("sha256").update(benchmarkJson).digest("hex")}`);
if (!benchmark.gate.passed) console.log(benchmark.gate.common_passed
  ? "The candidate adds no proven value and must be rejected without packaging."
  : "One or more common checks failed. Reject this frozen candidate without packaging; explain the failures.");
