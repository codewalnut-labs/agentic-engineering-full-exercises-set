import fs from "node:fs";
import path from "node:path";
import { runEvidence, seal } from "../../../../scripts/context-document-evidence.mjs";
import { validateDelivery } from "./delivery-validation.mjs";
import { listFiles } from "./delivery-common.mjs";

try {
  const appRoot = path.resolve(import.meta.dirname, "..");
  const root = path.resolve(appRoot, "..");
  const validate = (exercise, contract) => {
    contract.extraEvidence = [...new Set([...contract.extraEvidence, ...validateDelivery(exercise), ...listFiles(exercise, "evidence/runs"), ...listFiles(exercise, "evidence/sessions")])];
  };
  if (process.argv[2] === "seal") {
    const contract = JSON.parse(fs.readFileSync(path.join(appRoot,"evidence-contract.json")));
    validate(root,contract);
    seal(root,appRoot,contract);
  } else {
    await runEvidence({ appRoot, validate });
  }
} catch (error) {
  console.error("Delivery evidence verification failed: " + error.message);
  process.exitCode = 1;
}
