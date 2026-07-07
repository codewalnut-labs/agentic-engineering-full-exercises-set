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
  masterySignals: string[];
}

export const labContract: LabContract = {
  "title": "Contract-First Scheduling API",
  "competency": "02. Spec Framing - Requirements decomposition and testable spec creation",
  "domain": "Scheduling slots and booking holds across time zones",
  "mission": "Frame the contract between a scheduling UI and a Spring Boot availability API before implementation begins.",
  "outcome": "The UI and Spring Boot scheduling API agree on a testable contract before the implementation drifts.",
  "entities": [
    "slot",
    "booking hold",
    "clinician calendar",
    "conflict response"
  ],
  "seededDefects": [
    "hold expiration is not enforced",
    "duplicate holds return success instead of conflict",
    "invalid time zone is accepted"
  ],
  "verificationGates": [
    "OpenAPI contract check",
    "Spring integration tests",
    "frontend state smoke",
    "timezone validation test"
  ],
  "agentWorkflow": [
    "Ask the coding agent to inspect this lab contract, starter code, docs, and tests before proposing a plan.",
    "Revise the agent plan so it exercises the competency practice and avoids the common mistake.",
    "Implement the smallest working change that addresses the seeded defects.",
    "Run the verification gates and capture command evidence before writing the final review note."
  ],
  "workingDeliverables": [
    "Spring Boot endpoint behavior matching the contract.",
    "React client states for loading, success, validation, conflict, and retry.",
    "Backend contract or integration tests plus frontend smoke coverage.",
    "Contract notes that cite the tests and payload examples."
  ],
  "masterySignals": [
    "Use the OpenAPI draft as the source of truth for slots, holds, conflicts, validation errors, time zones, and concurrency.",
    "Implement or repair the Spring Boot endpoints and React client states against that contract.",
    "Add contract/integration tests for successful holds, stale slots, duplicate holds, invalid time zones, and conflict responses.",
    "Generate a small frontend state matrix from real API payload examples."
  ]
};
