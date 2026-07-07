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
  "title": "Repo Context Pack for Bugfix Agents",
  "competency": "03. Context Engineering - Agent working-context curation",
  "domain": "Bugfix handoff context for a customer escalation queue",
  "mission": "Build a compact context layer so future bugfix agents understand ownership, commands, and safe inspection paths.",
  "outcome": "A fresh agent can fix a seeded bug using project context files instead of chat paste.",
  "entities": [
    "repo map",
    "bug report",
    "module owner",
    "safe inspection path"
  ],
  "seededDefects": [
    "fresh agent reads unrelated billing modules first",
    "module ownership is missing for escalation routing",
    "bugfix plan loses task state after compaction"
  ],
  "verificationGates": [
    "context-pack check",
    "regression test",
    "fresh-agent handoff simulation",
    "do-not-touch path audit"
  ],
  "agentWorkflow": [
    "Ask the coding agent to inspect this lab contract, starter code, docs, and tests before proposing a plan.",
    "Revise the agent plan so it exercises the competency practice and avoids the common mistake.",
    "Implement the smallest working change that addresses the seeded defects.",
    "Run the verification gates and capture command evidence before writing the final review note."
  ],
  "workingDeliverables": [
    "Versioned context layer under the exercise.",
    "Actual bug fix in the React starter.",
    "Regression test or smoke check.",
    "Fresh-agent handoff note showing what context was loaded and why."
  ],
  "masterySignals": [
    "Create a compact repo map, architecture/context file, command list, and do-not-touch list.",
    "Seed or use the provided bug report, then have the context guide a real code fix in the starter.",
    "Add a regression test proving the bug is fixed.",
    "Keep deep detail linked, not stuffed into the always-on file."
  ]
};
