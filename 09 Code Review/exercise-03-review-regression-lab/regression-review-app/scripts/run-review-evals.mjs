import { spawnSync } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const promptfoo = path.join(
  root,
  "node_modules",
  "promptfoo",
  "dist",
  "src",
  "entrypoint.js",
);
const env = {
  ...process.env,
  PROMPTFOO_DISABLE_TELEMETRY: "1",
  PROMPTFOO_DISABLE_UPDATE: "1",
};

function run(config, output, expectedStatus) {
  const result = spawnSync(
    process.execPath,
    [promptfoo, "eval", "-c", config, "--no-cache", "--no-progress-bar", "--output", output],
    {
      cwd: root,
      encoding: "utf8",
      env,
      stdio: "inherit",
    },
  );

  if (result.status !== expectedStatus) {
    throw new Error(`${config} exited ${result.status}; expected ${expectedStatus}`);
  }
}

run("promptfoo.before.yaml", "evidence/promptfoo-before.json", 100);
run("promptfoo.after.yaml", "evidence/promptfoo-after.json", 0);
console.log("Promptfoo before/after evaluations regenerated");
