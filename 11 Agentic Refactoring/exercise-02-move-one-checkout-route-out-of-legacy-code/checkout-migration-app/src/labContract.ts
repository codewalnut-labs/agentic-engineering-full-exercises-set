export interface LabContract {
  title: string; competency: string; domain: string; mission: string; outcome: string;
  entities: string[]; seededDefects: string[]; verificationGates: string[];
  agentWorkflow: string[]; workingDeliverables: string[]; masterySignals: string[];
}

export const labContract: LabContract = {
  "title": "Move One Checkout Route Out of Legacy Code",
  "competency": "11. Agentic Refactoring - Test-driven tech-debt cleanup",
  "domain": "Card-payment strangler with authorization-safe fallback",
  "mission": "Move only card checkout behind a new slice while every legacy consumer and public result remains stable.",
  "outcome": "An injectable and reversible router proves safe rollout without duplicate authorization.",
  "entities": [
    "checkout request",
    "public payment result",
    "legacy path",
    "card authorization"
  ],
  "seededDefects": [
    "all payment types still use legacy",
    "card slice is absent",
    "authorization-safe fallback is unimplemented"
  ],
  "verificationGates": [
    "legacy-to-card result comparison",
    "protected route matrix",
    "primitive and ambiguous authorization failures never fall back",
    "flag-off rollback",
    "focused source history",
    "npm run verify:exercise checks protected inputs, implementation quality, and required submission evidence.",
    "Actual phase captures, frozen characterization evidence, and sealed source citations."
  ],
  "agentWorkflow": [
    "Observe the supplied starter and identify the public behavior to preserve.",
    "Use test-driven-development and retain its real invocation and relevant session.",
    "Commit characterization tests and required snapshots before production work.",
    "Make focused production changes and rerun the unchanged tests.",
    "Compare actual before and after results, then capture and seal the evidence."
  ],
  "workingDeliverables": [
    "checkout-migration-app/src/checkout/checkoutRouter.test.mjs",
    "checkout-migration-app/src/checkout/cardCheckout.mjs",
    "checkout-migration-app/src/checkout/checkoutRouter.mjs",
    "evidence/route-matrix.md",
    "evidence/contract-comparison.md",
    "evidence/rollback.md",
    "evidence/history.json",
    "evidence/before.md, evidence/after.md, and evidence/comparison.md",
    "Skill-use proof, source audit, and captured checks."
  ],
  "masterySignals": [
    "Keeps gift-card, invoice, and unknown types legacy.",
    "Matches exact approved and declined outputs including rounding.",
    "Falls back only before authorization.",
    "Disables the new slice without deleting legacy code."
  ]
};
