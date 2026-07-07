export interface LabContract {
  title: string;
  competency: string;
  domain: string;
  mission: string;
  outcome: string;
  entities: string[];
  seededDefects: string[];
  verificationGates: string[];
  agentWorkflow: string[];
  workingDeliverables: string[];
  seniorSignals: string[];
}

export const labContract: LabContract = {
  "title": "Runbook Drift Repair",
  "competency": "07. Docs & Diagrams - Diagrams and architecture decision records",
  "domain": "Incident runbook drift for delayed workflow processing",
  "mission": "Update stale support docs and diagrams after verifying how the current app actually handles incidents.",
  "outcome": "A stale runbook is repaired by changing code, checks, and docs together.",
  "entities": [
    "incident step",
    "support command",
    "status page update",
    "runbook diagram"
  ],
  "seededDefects": [
    "runbook command references a deleted script",
    "current app retries twice but docs claim five retries",
    "incident smoke lacks the degraded-state branch"
  ],
  "verificationGates": [
    "runbook command smoke",
    "incident reproduction script",
    "diagram drift check",
    "support handoff review"
  ],
  "agentWorkflow": [
    "Ask the coding agent to inspect this lab contract, starter code, docs, and tests before proposing a plan.",
    "Revise the agent plan so it exercises the competency practice and avoids the common mistake.",
    "Implement the smallest working change that addresses the seeded defects.",
    "Run the verification gates and capture command evidence before writing the final review note."
  ],
  "workingDeliverables": [
    "Runbook update grounded in actual code behavior.",
    "Code/config fixes for discovered drift where needed.",
    "Incident smoke test or reproduction script.",
    "Verification evidence for the support path."
  ],
  "seniorSignals": [
    "Compare the runbook against actual incident handling code and current app behavior.",
    "Fix drift in code, scripts, or docs where the current behavior is wrong or unclear.",
    "Add an incident smoke test or scripted reproduction.",
    "Update diagrams only after the verified behavior is known."
  ]
};
