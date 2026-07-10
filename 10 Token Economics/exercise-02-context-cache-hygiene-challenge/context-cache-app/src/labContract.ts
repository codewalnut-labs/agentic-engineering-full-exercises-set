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
  "title": "Context Cache Hygiene Challenge",
  "competency": "10. Token Economics - Right model and token cost optimizations",
  "domain": "Always-on context cleanup for lower-cost agent sessions",
  "mission": "Clean up stale instructions and oversized always-on context so future sessions stop rebilling irrelevant information.",
  "outcome": "Always-on context becomes lean, versioned, and cheaper without losing necessary guidance.",
  "entities": [
    "AGENTS.md",
    "reference file",
    "context budget",
    "stale rule"
  ],
  "seededDefects": [
    "always-on rules include long migration instructions",
    "stale command stays in context after scripts change",
    "cache is churned by changing tool setup mid-task"
  ],
  "verificationGates": [
    "context-size check",
    "stale command check",
    "handoff simulation",
    "cache-churn prevention note"
  ],
  "agentWorkflow": [
    "Ask the coding agent to inspect this lab contract, starter code, docs, and tests before proposing a plan.",
    "Revise the agent plan so it exercises the competency practice and avoids the common mistake.",
    "Implement the smallest working change that addresses the seeded defects.",
    "Run the verification gates and capture command evidence before writing the final review note."
  ],
  "workingDeliverables": [
    "Lean AGENTS/CLAUDE context plus linked references.",
    "Context-size or stale-reference check.",
    "Before/after handoff comparison.",
    "Evidence that starter checks still pass."
  ],
  "masterySignals": [
    "Audit oversized or stale agent instructions and split deep detail into linked references.",
    "Implement a size/check script that fails when always-on context grows past the agreed budget.",
    "Update starter rules so repeated corrections live in durable context.",
    "Run a simulated agent handoff before and after cleanup."
  ]
};
