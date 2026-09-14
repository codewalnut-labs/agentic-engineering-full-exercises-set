import fs from "node:fs";
import path from "node:path";
import { runEvidence, seal } from "../../../../scripts/context-document-evidence.mjs";
import { validateReadiness, verifySetupCommit, expandContract } from "./readiness-validation.mjs";

const appRoot = path.resolve(import.meta.dirname, "..");
const root = path.resolve(appRoot, "..");
try {
  if (process.argv[2] === "seal") {
    const contract = JSON.parse(fs.readFileSync(path.join(appRoot, "evidence-contract.json"), "utf8"));
    const setup = validateReadiness(root);
    verifySetupCommit(root, setup);
    seal(root, appRoot, expandContract(contract, setup));
  } else {
    await runEvidence({ appRoot, validate: (exerciseRoot, contract) => {
      const setup = validateReadiness(exerciseRoot);
      verifySetupCommit(exerciseRoot, setup);
      expandContract(contract, setup);
    } });
  }
} catch (error) {
  console.error(`Readiness evidence verification failed: ${error.message}`);
  process.exitCode = 1;
}
