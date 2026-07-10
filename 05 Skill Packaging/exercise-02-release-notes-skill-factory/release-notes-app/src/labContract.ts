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
  "title": "Release Notes Skill Factory",
  "competency": "05. Skill Packaging - Workflow packaging into reusable skills",
  "domain": "Release-note skill backed by commit parsing and evidence checks",
  "mission": "Turn a messy release-note prompt into a reusable skill that reads changes, groups them, and flags missing evidence.",
  "outcome": "Release-note generation becomes a repeatable workflow backed by parsing, grouping, and evidence checks.",
  "entities": [
    "commit log",
    "change group",
    "breaking change",
    "missing evidence flag"
  ],
  "seededDefects": [
    "internal refactors appear as customer-facing changes",
    "breaking change is buried under fixes",
    "release note includes items with no verification evidence"
  ],
  "verificationGates": [
    "parser fixture test",
    "snapshot output",
    "missing evidence check",
    "skill trigger eval"
  ],
  "agentWorkflow": [
    "Ask the coding agent to inspect this lab contract, starter code, docs, and tests before proposing a plan.",
    "Revise the agent plan so it exercises the competency practice and avoids the common mistake.",
    "Implement the smallest working change that addresses the seeded defects.",
    "Run the verification gates and capture command evidence before writing the final review note."
  ],
  "workingDeliverables": [
    "Release-notes skill and reference files.",
    "Parser or helper script with tests.",
    "Generated release notes from the fixture set.",
    "Eval evidence showing improvements after refinement."
  ],
  "masterySignals": [
    "Create a release-notes skill that reads commit/change fixtures and groups work by customer impact.",
    "Build or wire a parser script so deterministic extraction is not spent on expensive model turns.",
    "Add snapshot or fixture tests for grouping, missing evidence, and breaking-change detection.",
    "Run the skill on the provided release data and refine it from failures."
  ]
};
