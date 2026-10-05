import fs from "node:fs";
import path from "node:path";
import { checkCapture, validatePhaseEvidence } from "../../scripts/challenge-phase-evidence.mjs";

export function validateRetrospectiveEvidence(root, contract) {
  if (contract.study === "retry-policy") return validatePhaseEvidence(root, contract);
  const history = JSON.parse(fs.readFileSync(path.join(root, "evidence/history.json"), "utf8"));
  for (const check of Object.values(contract.checkCaptures)) {
    checkCapture(fs.readFileSync(path.join(root, check.path), "utf8"), check, history[check.shaField]);
  }
  console.log("PASS captured retrospective checks at the recorded implementation commit");
}
