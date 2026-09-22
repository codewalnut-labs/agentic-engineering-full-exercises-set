import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import path from "node:path";
import { summaryFailures } from "./summary-validation.mjs";

const appRoot = path.resolve(import.meta.dirname, "..");
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

const vite = await createServer({
  root: appRoot,
  appType: "custom",
  logLevel: "silent",
  server: { middlewareMode: true }
});

try {
  const app = await vite.ssrLoadModule("/src/App.tsx");
  const workflow = await vite.ssrLoadModule("/src/data/workflows.ts");
  const approval = await vite.ssrLoadModule("/src/services/approvalEngine.ts");
  const classifications = workflow.workflows.map((item) => approval.classifyWorkflow(item));
  const editable = classifications.filter((item) => item.agentEditable).length;
  const approvalRequired = classifications.filter((item) => item.requiresApproval).length;
  check(editable === 1, "workflow classifications must keep one agent-editable workflow");
  check(approvalRequired === 3, "workflow classifications must keep three approval-required workflows");
  failures.push(...summaryFailures(renderToStaticMarkup(React.createElement(app.default)), editable, approvalRequired));
  const original = [...workflow.workflows];
  try {
    // Adding each category catches a summary that hard-codes the starter's 1 and 3.
    for (const category of ["agentEditable", "requiresApproval"]) {
      const example = original.find((item) => approval.classifyWorkflow(item)[category]);
      workflow.workflows.push({ ...example, id: "verification-only-" + category });
    }
    failures.push(...summaryFailures(renderToStaticMarkup(React.createElement(app.default)), editable + 1, approvalRequired + 1)
      .map((failure) => "With additional workflows: " + failure));
  } finally {
    workflow.workflows.splice(0, workflow.workflows.length, ...original);
  }
} catch (error) {
  failures.push(`could not verify the application: ${error.message}`);
} finally {
  await vite.close();
}

if (failures.length) {
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log("Release Readiness implementation verified.");
