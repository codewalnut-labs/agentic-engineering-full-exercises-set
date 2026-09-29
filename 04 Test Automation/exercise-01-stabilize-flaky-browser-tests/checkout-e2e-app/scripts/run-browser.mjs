import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const app = path.resolve(import.meta.dirname, "..");
const mode = process.argv[2];
if (!["smoke", "baseline", "final"].includes(mode)) throw new Error("Use smoke, baseline, or final");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "checkout-tests-"));
try {
  const report = path.join(temp, "report.json");
  const args = [path.join(app, "node_modules/@playwright/test/cli.js"), "test", "--retries=0", "--reporter=line,json", `--output=${path.join(temp, "results")}`];
  if (mode === "smoke") args.push("tests/e2e/starter-smoke.spec.ts", "--workers=1");
  else if (mode === "baseline") args.push("tests/e2e/flaky-checkout.spec.ts", "--repeat-each=4", "--workers=2");
  else args.push("--repeat-each=20", "--workers=2", "--trace=on");
  const result = spawnSync(process.execPath, args, { cwd: app, stdio: "inherit",
    env: { ...process.env, PLAYWRIGHT_JSON_OUTPUT_FILE: report, EXERCISE_FRESH_SERVER: "1" } });
  if (mode === "final" && process.env.EXERCISE_CAPTURE_DIR && fs.existsSync(report)) {
    const output = process.env.EXERCISE_CAPTURE_DIR;
    fs.mkdirSync(output, { recursive: true });
    fs.copyFileSync(report, path.join(output, "report.json"));
    const document = JSON.parse(fs.readFileSync(report, "utf8"));
    const findTrace = (suites) => {
      for (const suite of suites) {
        for (const spec of suite.specs ?? []) for (const test of spec.tests ?? []) for (const run of test.results ?? []) {
          if (run.status === "passed") {
            const trace = run.attachments?.find((item) => item.name === "trace" && item.path);
            if (trace) return trace.path;
          }
        }
        const nested = findTrace(suite.suites ?? []);
        if (nested) return nested;
      }
    };
    const trace = findTrace(document.suites ?? []);
    if (trace) fs.copyFileSync(trace, path.join(output, "trace.zip"));
  }
  if (result.error) console.error(result.error.message);
  process.exitCode = result.status ?? 1;
} finally { fs.rmSync(temp, { recursive: true, force: true }); }
