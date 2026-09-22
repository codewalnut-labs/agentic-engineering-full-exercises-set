import assert from "node:assert/strict";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { APP, listFiles, read } from "./delivery-common.mjs";

try {
  for (const script of ["run-invitation-tests.mjs", "run-learner-tests.mjs"]) {
    const result = spawnSync(process.execPath, [path.join(import.meta.dirname, script)], { encoding: "utf8", stdio: "inherit" });
    assert.equal(result.status, 0, "behavior checks must pass: " + script);
  }
  const root = path.resolve(import.meta.dirname, "../..");
  const service = read(root, APP + "/src/services/invitationService.ts");
  assert.ok(!service.includes("Invitation lifecycle is not implemented"), "replace the starter service");
  const source = listFiles(root, APP + "/src").filter((p) => /\.tsx?$/.test(p) && !p.includes("/legacy/"));
  assert.ok(source.every((p) => !/quickInvite/.test(read(root,p))), "do not reuse the legacy helper");
  const ui = source.filter((p) => p.endsWith(".tsx")).map((p) => read(root,p)).join("\n");
  const consumers = source.filter((p) => p !== APP + "/src/services/invitationService.ts").map((p) => read(root,p)).join("\n");
  assert.match(ui, /Team Invitations/, "include the required interface section");
  assert.match(consumers, /invitationService/, "connect the interface to the shared service");
  for (const action of ["createInvitation", "acceptInvitation", "revokeInvitation"]) assert.match(consumers, new RegExp("\\b" + action + "\\s*\\("), "wire UI action: " + action);
  console.log("PASS invitation behavior, learner regressions, and basic UI wiring. Recorded browser review verifies usability.");
} catch (error) {
  console.error("Feature verification failed: " + error.message);
  process.exitCode = 1;
}
