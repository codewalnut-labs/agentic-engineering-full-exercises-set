import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const root = path.resolve(import.meta.dirname, "../..");
const temp = fs.mkdtempSync(path.join(os.tmpdir(), "workflow-build-"));
const script = process.argv[2] === "shortcut" ? "previous-release-check.mjs" : "verification-gate.mjs";
const providerOnly = process.argv[2] === "provider";
try {
  // The POM activates a temporary output directory without changing gate commands.
  const command = providerOnly ? (process.platform === "win32" ? (process.env.ComSpec ?? "cmd.exe") : "./mvnw") : process.execPath;
  const args = providerOnly ? (process.platform === "win32" ? ["/d", "/s", "/c", "mvnw.cmd -q verify"] : ["-q", "verify"]) : [path.join(root, "scripts", script)];
  const result = spawnSync(command, args, {
    cwd: providerOnly ? path.join(root, "workflow-rules-api") : root, stdio: "inherit", env: { ...process.env, EXERCISE_BUILD_DIRECTORY: temp },
  });
  if (result.error) console.error(result.error.message);
  process.exitCode = result.status ?? 1;
  const reports = path.join(temp, "surefire-reports");
  const names = fs.existsSync(reports) ? fs.readdirSync(reports).filter((name) => /^TEST-.*\.xml$/.test(name)) : [];
  let tests = 0, failures = 0, errors = 0, skipped = 0;
  for (const name of names) {
    const xml = fs.readFileSync(path.join(reports, name), "utf8");
    const suite = xml.match(/<testsuite\s[^>]+>/)?.[0] ?? "";
    const count = (field) => Number(suite.match(new RegExp(`\\b${field}="(\\d+)"`))?.[1] ?? 0);
    tests += count("tests"); failures += count("failures"); errors += count("errors"); skipped += count("skipped");
  }
  if (names.length) console.log(`PROVIDER TESTS: ${tests} tests, ${failures} failures, ${errors} errors, ${skipped} skipped (${names.join(", ")})`);
  if (result.status === 0) {
    const expected = script === "previous-release-check.mjs" ? ["WorkflowServiceTest"] : ["WorkflowServiceTest", "WorkflowReleaseGateTest"];
    if (!tests || failures || errors || skipped || expected.some((test) => !names.some((name) => name.endsWith(`.${test}.xml`)))) {
      console.error("Provider test reports do not establish the required successful run.");
      process.exitCode = 1;
    }
    if (script === "verification-gate.mjs" && !fs.readdirSync(temp).some((name) => name.endsWith(".jar"))) {
      console.error("The provider package was not built.");
      process.exitCode = 1;
    }
  }
} finally { fs.rmSync(temp, { recursive: true, force: true }); }
