import { validateEvidence } from "../../../scripts/test-evidence.mjs";
try {
  validateEvidence(process.cwd());
  console.log("PASS claim audit, skill-use transcript, captured release result, and current source snapshot. Review the claim against the complete output.");
} catch (error) { console.error(error.message); process.exitCode = 1; }
