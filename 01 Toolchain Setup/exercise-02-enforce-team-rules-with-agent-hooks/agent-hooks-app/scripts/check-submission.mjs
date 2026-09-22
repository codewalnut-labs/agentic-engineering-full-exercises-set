import fs from "node:fs";
import path from "node:path";
import { runEvidence, seal } from "../../../../scripts/context-document-evidence.mjs";
import { expandContract, validateHookEvidence } from "./hook-validation.mjs";

const appRoot = path.resolve(import.meta.dirname, "..");
const root = path.resolve(appRoot, "..");
try {
  if (process.argv[2] === "seal") {
    const contract = JSON.parse(fs.readFileSync(path.join(appRoot, "evidence-contract.json"), "utf8"));
    seal(root, appRoot, expandContract(contract, validateHookEvidence(root)));
  } else {
    await runEvidence({ appRoot, validate: (exerciseRoot, contract) => {
      expandContract(contract, validateHookEvidence(exerciseRoot));
    } });
  }
} catch (error) {
  console.error(`Hook evidence verification failed: ${error.message}`);
  process.exitCode = 1;
}
