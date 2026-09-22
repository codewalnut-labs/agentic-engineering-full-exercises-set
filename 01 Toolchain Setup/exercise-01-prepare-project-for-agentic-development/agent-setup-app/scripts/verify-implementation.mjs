import path from "node:path";
import { validateSetup } from "./readiness-validation.mjs";

try {
  const result = validateSetup(path.resolve(import.meta.dirname, "../.."));
  console.log(`Verified setup: ${result.inventory.skills.length} skills and ${result.files.length} portable files. Runtime use requires readiness evidence.`);
} catch (error) {
  console.error(`Agent setup verification failed: ${error.message}`);
  process.exitCode = 1;
}
