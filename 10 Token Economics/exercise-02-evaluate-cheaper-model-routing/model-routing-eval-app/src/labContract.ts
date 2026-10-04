export interface LabContract {
  title: string; competency: string; domain: string; mission: string; outcome: string;
  entities: string[]; seededDefects: string[]; verificationGates: string[];
  agentWorkflow: string[]; workingDeliverables: string[]; masterySignals: string[];
}

export const labContract: LabContract = {
  "title": "Decide Whether Cheaper Model Routing Is Safe",
  "competency": "10. Token Economics - measured model routing",
  "domain": "Coding-agent task routing by risk, ambiguity, and scope",
  "mission": "Evaluate a proposed cheaper routing policy using measured quality, safety, retry cost, and clarification behavior.",
  "outcome": "A field-based router and a complete offline evaluation support an honest adopt-or-reject decision; savings alone do not establish safety.",
  "entities": [
    "routing decision",
    "eligible tier lane",
    "raw response",
    "expected escalation cost"
  ],
  "seededDefects": [
    "every task uses reasoning",
    "ambiguity never clarifies",
    "retry and escalation are unpriced",
    "quality and safety are unmeasured"
  ],
  "verificationGates": [
    "36 protected measurements and reconciled retry costs",
    "Adoption decision matches every routing, quality, safety, and savings gate",
    "Starter identity and source history",
    "Skill use, source citations, and sealed command evidence",
    "npm run verify:exercise"
  ],
  "agentWorkflow": [
    "Capture the supplied starter before editing.",
    "Use evaluation for the challenge decisions and retain its actual session.",
    "Implement and measure a field-based policy against the complete protected benchmark.",
    "Capture checks at the final implementation commit, then commit and seal evidence."
  ],
  "workingDeliverables": [
    "src/routing/routeTask.mjs",
    "tests/route-task.test.mjs",
    "evidence/adoption.md",
    "evidence/routing-policy.md",
    "evidence/routing-measurements.json",
    "evidence/measurement-run.json",
    "evidence/cost-model.json",
    "evidence/before.md, evidence/after.md, and evidence/comparison.md",
    "Skill session, source audit, and captured checks."
  ],
  "masterySignals": [
    "Unclear work requests clarification before model execution.",
    "High-risk routes retain their safety boundary.",
    "Failed calls and one escalation are charged.",
    "Synthetic benchmark results are distinguished from live provider measurements."
  ]
};
