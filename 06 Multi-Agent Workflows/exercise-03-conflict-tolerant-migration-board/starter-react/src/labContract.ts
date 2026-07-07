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
  "title": "Conflict-Tolerant Migration Board",
  "competency": "06. Multi-Agent Workflows - Parallel agents on isolated tasks",
  "domain": "Migration board for parallel agent component upgrades",
  "mission": "Plan and execute a batched UI migration where agents must avoid editing shared foundations at the same time.",
  "outcome": "A migration board prevents parallel agents from colliding on shared foundations.",
  "entities": [
    "migration batch",
    "shared foundation",
    "conflict marker",
    "merge window"
  ],
  "seededDefects": [
    "batch edits shared button styles from two lanes",
    "migration order ignores dependency on token update",
    "conflict detection does not inspect generated diffs"
  ],
  "verificationGates": [
    "migration board validation",
    "overlap detector",
    "slice verification",
    "integration smoke"
  ],
  "agentWorkflow": [
    "Ask the coding agent to inspect this lab contract, starter code, docs, and tests before proposing a plan.",
    "Revise the agent plan so it exercises the competency practice and avoids the common mistake.",
    "Implement the smallest working change that addresses the seeded defects.",
    "Run the verification gates and capture command evidence before writing the final review note."
  ],
  "workingDeliverables": [
    "Migration board with ownership and dependency rules.",
    "Two completed migration slices in code.",
    "Conflict detection script or checklist backed by actual file changes.",
    "Integration verification evidence."
  ],
  "masterySignals": [
    "Create a migration board that assigns files, dependencies, and merge order.",
    "Implement at least two migration slices in non-overlapping areas.",
    "Add an integration check that detects shared-file edits or ordering mistakes.",
    "Run final tests after merging slices."
  ]
};
