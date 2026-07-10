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
  "title": "jscodeshift Migration Playbook Skill",
  "competency": "05. Skill Packaging - Workflow packaging into reusable skills",
  "domain": "Legacy component migration skill with before/after evals",
  "mission": "Package a migration workflow for converting legacy components to typed React modules with tests and review notes.",
  "outcome": "A migration recipe becomes a skill and proves itself by migrating a real starter component.",
  "entities": [
    "legacy component",
    "migration phase",
    "stop condition",
    "skill eval"
  ],
  "seededDefects": [
    "skill migrates shared foundations without owner approval",
    "converted component loses keyboard behavior",
    "when-not-to-use case still triggers the migration"
  ],
  "verificationGates": [
    "migration eval",
    "component behavior test",
    "trigger negative case",
    "before/after skill comparison"
  ],
  "agentWorkflow": [
    "Ask the coding agent to inspect this lab contract, starter code, docs, and tests before proposing a plan.",
    "Revise the agent plan so it exercises the competency practice and avoids the common mistake.",
    "Implement the smallest working change that addresses the seeded defects.",
    "Run the verification gates and capture command evidence before writing the final review note."
  ],
  "workingDeliverables": [
    "Migration skill folder.",
    "A completed component migration in `migration-playbook-app`.",
    "Tests proving migrated behavior.",
    "Before/after skill eval notes."
  ],
  "masterySignals": [
    "Package the migration workflow as a focused skill with references for edge cases.",
    "Apply the skill to convert a legacy component to typed React with tests.",
    "Add an eval case for when the skill should not run.",
    "Record the gaps discovered during real use and refine the skill."
  ]
};
