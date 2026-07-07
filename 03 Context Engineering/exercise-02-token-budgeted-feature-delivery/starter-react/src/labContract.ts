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
  "title": "Token-Budgeted Feature Delivery",
  "competency": "03. Context Engineering - Agent working-context curation",
  "domain": "Context-bounded feature delivery for an account health widget",
  "mission": "Implement a small UI change while staying inside a strict context budget and documenting every file included.",
  "outcome": "A feature ships under an explicit context budget, with the agent reading the right files and no more.",
  "entities": [
    "context manifest",
    "architecture map",
    "feature slice",
    "task scratchpad"
  ],
  "seededDefects": [
    "context manifest omits the owning component",
    "feature plan reads raw fixture dumps before repo pointers",
    "task state is only kept in chat"
  ],
  "verificationGates": [
    "context file check",
    "repo-map coverage check",
    "feature test",
    "context budget check"
  ],
  "agentWorkflow": [
    "Ask the coding agent to inspect this lab contract, starter code, docs, and tests before proposing a plan.",
    "Revise the agent plan so it exercises the competency practice and avoids the common mistake.",
    "Implement the smallest working change that addresses the seeded defects.",
    "Run the verification gates and capture command evidence before writing the final review note."
  ],
  "workingDeliverables": [
    "Working feature change in the starter.",
    "Focused tests for the feature.",
    "Context manifest and budget check.",
    "Evidence that build/typecheck/tests pass."
  ],
  "seniorSignals": [
    "Create a project context file with overview, module map, ownership, commands, conventions, and do-not-touch areas.",
    "Implement the requested UI behavior using only files justified by that context layer.",
    "Keep task state in a session-readable spec/plan/scratchpad so a fresh agent can resume after compaction.",
    "Add tests for the changed behavior and update context when the agent misses a project rule."
  ]
};
