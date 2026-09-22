import assert from "node:assert/strict";
import { after, test } from "node:test";
import path from "node:path";
import { createServer } from "vite";

const vite = await createServer({
  root: path.resolve(import.meta.dirname, ".."),
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true }
});
after(() => vite.close());
const { classifyWorkflow } = await vite.ssrLoadModule("/src/services/approvalEngine.ts");
const { workflows } = await vite.ssrLoadModule("/src/data/workflows.ts");
const ordinary = { risk: "low", touchesProduction: false, touchesMigration: false, touchesGeneratedCode: false };

test("ordinary local work remains editable", () => {
  assert.deepEqual(classifyWorkflow(ordinary), { risk: "low", requiresApproval: false, agentEditable: true });
});
test("each protected category requires approval independently", () => {
  for (const field of ["touchesProduction", "touchesMigration", "touchesGeneratedCode"]) {
    const result = classifyWorkflow({ ...ordinary, [field]: true });
    assert.equal(result.requiresApproval, true, field);
    assert.equal(result.agentEditable, false, field);
  }
});
test("critical work requires approval even without a protected category", () => {
  assert.equal(classifyWorkflow({ ...ordinary, risk: "critical" }).requiresApproval, true);
  assert.equal(classifyWorkflow({ ...ordinary, risk: "critical" }).agentEditable, false);
});
test("supplied workflow classifications retain their baseline counts", () => {
  assert.equal(workflows.filter((item) => classifyWorkflow(item).agentEditable).length, 1);
  assert.equal(workflows.filter((item) => classifyWorkflow(item).requiresApproval).length, 3);
});
