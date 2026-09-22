import { spawnSync } from "node:child_process";

const root = process.cwd();
const result = spawnSync(
  process.execPath,
  ["--experimental-strip-types", "--test", "--test-reporter=tap", "./tests/invitationService.test.ts"],
  { cwd: root, encoding: "utf8" }
);

if (result.stdout) process.stdout.write(result.stdout);
if (result.stderr) process.stderr.write(result.stderr);
process.exit(result.status ?? 1);
