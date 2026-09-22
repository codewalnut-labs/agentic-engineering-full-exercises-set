import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const contract = JSON.parse(fs.readFileSync(path.join(root, "lab-contract.json"), "utf8"));
for (const field of ["entities", "seededDefects", "verificationGates", "agentWorkflow", "workingDeliverables"]) {
  if (!Array.isArray(contract[field]) || contract[field].length < 3) throw new Error(`${field} must contain at least three concrete entries`);
}
for (const required of ["config/production.json", "tasks/release-readiness.md", "../docs/guardrail-contract.md", "../docs/setup.md"]) {
  if (!fs.existsSync(path.join(root, required))) throw new Error(`missing starter input: ${required}`);
}
console.log(`agent-check passed for ${contract.title}`);
