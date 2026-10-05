import type { LabContract } from "./types";

export const labContract: LabContract = {
  backlog: [
    { id: "scope-01", title: "Migrate export within the agreed scope", owner: "learner", skill: "test-driven-development", risk: "high", done: false },
    { id: "scope-02", title: "Prove checkout and delete remain unchanged", owner: "learner", skill: "Regression test", risk: "critical", done: false },
    { id: "scope-03", title: "Compare the complete source diff with the plan", owner: "reviewer", skill: "Evidence", risk: "medium", done: false },
  ],
  evidence: [
    { gate: "Plan before code", status: "missing", proof: "requires learner history" },
    { gate: "Behavior preserved", status: "partial", proof: "protected test supplied" },
    { gate: "Actual diff within budget", status: "missing", proof: "requires final implementation commit" },
  ],
  decisions: [
    { question: "Expand shared code?", decision: "Keep shared consumers outside the agreed scope.", status: "decided" },
    { question: "How is scope measured?", decision: "Use the complete source diff from plan to final implementation.", status: "decided" },
    { question: "Has the migration passed?", decision: "Pending learner implementation and evidence.", status: "open" },
  ],
  "title": "Ship a Small Change Without a Broad Rewrite",
  "competency": "10. Token Economics - bounded implementation scope",
  "skillPattern": "Pre-committed minimal-diff budget",
  "domain": "Single-action design-system variant migration",
  "mission": "Ship the export variant migration within a pre-declared Git scope budget while preserving legacy actions.",
  "outcome": "The export change and its test fit the precommitted scope budget while legacy behavior remains unchanged.",
  "entities": [
    "pre-change scope plan",
    "variant helper",
    "learner regression test",
    "Git numstat ledger"
  ],
  "seededDefects": [
    "export remains legacy-primary",
    "declared scope can be self-reported",
    "shared cleanup is tempting",
    "unknown legacy fallback is easy to lose"
  ],
  "verificationGates": [
    "Complete source diff: two files and at most 30 changed lines",
    "Identical learner regression tests on starter and fixed helpers",
    "Starter identity and source history",
    "Skill use, source citations, and sealed command evidence",
    "npm run verify:exercise"
  ],
  "agentWorkflow": [
    "Capture the supplied starter before editing.",
    "Use test-driven-development for the challenge decisions and retain its actual session.",
    "Commit the budget plan before making focused source changes.",
    "Capture checks at the final implementation commit, then commit and seal evidence."
  ],
  "workingDeliverables": [
    "src/migration/exportButton.mjs",
    "tests/export-button.test.mjs",
    "evidence/verification.md",
    "evidence/scope-plan.json",
    "evidence/scope-plan.md",
    "evidence/scope-budget.json",
    "evidence/avoided-work.json",
    "evidence/before.md, evidence/after.md, and evidence/comparison.md",
    "Skill session, source audit, and captured checks."
  ],
  "masterySignals": [
    "Scope is agreed before editing.",
    "Regression tests prove the requested behavior.",
    "A small diff preserves real neighboring consumers.",
    "Diff size is reported without inventing token or money savings."
  ]
};
