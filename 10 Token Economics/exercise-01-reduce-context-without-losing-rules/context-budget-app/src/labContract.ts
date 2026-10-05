export interface LabContract {
  title: string; competency: string; domain: string; mission: string; outcome: string;
  entities: string[]; seededDefects: string[]; verificationGates: string[];
  agentWorkflow: string[]; workingDeliverables: string[]; masterySignals: string[];
}

export const labContract: LabContract = {
  "title": "Reduce Context Without Losing Required Rules",
  "competency": "10. Token Economics - minimum sufficient authoritative context",
  "domain": "Session-adapter refactor context selection",
  "mission": "Select current task context under an exact byte budget without dropping mandatory rules or primary contracts.",
  "outcome": "A smaller reproducible context selection preserves current rules and the refactored adapter behavior; byte savings are reported without inferring billed token savings.",
  "entities": [
    "real context source",
    "protected catalog",
    "pre-change plan",
    "selector ledger",
    "session adapter"
  ],
  "seededDefects": [
    "all sources are loaded",
    "stale and irrelevant sources consume budget",
    "maximum bytes are ignored",
    "no decision reason is recorded"
  ],
  "verificationGates": [
    "Exact source bytes and selector ledger",
    "Protected selector and adapter behavior",
    "Starter identity and source history",
    "Skill use, source citations, and sealed command evidence",
    "npm run verify:exercise"
  ],
  "agentWorkflow": [
    "Capture the supplied starter before editing.",
    "Use context-optimization for the challenge decisions and retain its actual session.",
    "Commit the budget plan before making focused source changes.",
    "Capture checks at the final implementation commit, then commit and seal evidence."
  ],
  "workingDeliverables": [
    "src/budget/selectContext.mjs",
    "src/session/adaptSession.mjs",
    "tests/context-selector.test.mjs",
    "tests/session-adapter.test.mjs",
    "evidence/decision.md",
    "evidence/context-plan.json",
    "evidence/context-plan.md",
    "evidence/context-ledger.json",
    "evidence/before.md, evidence/after.md, and evidence/comparison.md",
    "Skill session, source audit, and captured checks."
  ],
  "masterySignals": [
    "Context cost is known before work.",
    "Authority and priority preserve correctness.",
    "Expansion follows an open question.",
    "Every omitted source has a reason."
  ]
};
