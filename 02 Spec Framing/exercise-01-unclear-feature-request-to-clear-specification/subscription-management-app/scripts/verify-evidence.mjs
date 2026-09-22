import path from "node:path";
import fs from "node:fs";
import { runEvidence, seal } from "../../../../scripts/context-document-evidence.mjs";
import { validateDocuments, validateReviewEvidence } from "./spec-validation.mjs";
import { validateWorkflow } from "./workflow-validation.mjs";

try {
  const appRoot = path.resolve(import.meta.dirname, "..");
  const validate = (root, contract) => {
    validateDocuments(root);
    validateReviewEvidence(root);
    contract.extraEvidence = [...new Set([...contract.extraEvidence, ...validateWorkflow(root)])];
  };
  if (process.argv[2] === "seal") {
    const root = path.resolve(appRoot, "..");
    const contract = JSON.parse(fs.readFileSync(path.join(appRoot, "evidence-contract.json")));
    validate(root, contract);
    seal(root, appRoot, contract);
  } else {
    await runEvidence({ appRoot, validate });
  }
} catch (error) {
  console.error(`Specification evidence verification failed: ${error.message}`);
  process.exitCode = 1;
}
