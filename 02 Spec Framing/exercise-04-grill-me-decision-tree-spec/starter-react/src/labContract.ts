import type { LabContract } from "./types";

export const labContract = {
  "title": "Grill-Me Decision Tree Spec",
  "competency": "02. Spec Framing",
  "skillPattern": "grill-me / grill-with-docs",
  "domain": "B2B entitlement policy editor with plans, seats, billing cycles, admin overrides, child accounts, and audit events.",
  "mission": "Use a grill-me style interview to turn a vague entitlement redesign into a testable implementation contract before coding.",
  "outcome": "A high-risk entitlement change is understood through a decision tree, examples, non-goals, and mergeable slices before implementation begins.",
  "entities": [
    "Account",
    "Plan",
    "EntitlementRule",
    "AdminOverride",
    "BillingCycle",
    "AuditEvent"
  ],
  "seededDefects": [
    "Enterprise child accounts inherit trial-only entitlements when an override expires.",
    "Seat count errors use billing language that support cannot map to the entitlement screen.",
    "The current plan ignores what happens to active overrides during a plan downgrade.",
    "Audit events are written only for successful saves, not blocked entitlement attempts."
  ],
  "verificationGates": [
    "Question log covers decision branches, dependencies, defaults, non-goals, and open risks.",
    "Spec examples cover eligible, blocked, expired, downgrade, and override conflict paths.",
    "React contract panel reflects the frozen decisions and rejects unknown entitlement states.",
    "Tests or script checks prove the implementation uses the decision table rather than free text."
  ],
  "agentWorkflow": [
    "Run a one-question-at-a-time interview before asking for an implementation plan.",
    "Answer code-discoverable questions by inspecting the starter instead of asking the user.",
    "Convert answers into a decision table and PR-sized slices.",
    "Implement one vertical slice and link each test to a question it resolves."
  ],
  "workingDeliverables": [
    "Updated entitlement decision table and question log.",
    "Working React behavior for selected entitlement states.",
    "Tests or script checks for at least five concrete examples.",
    "Evidence note showing which questions became code and which stayed deferred."
  ],
  "masterySignals": [
    "The agent resists premature planning.",
    "Ambiguity is reduced by examples, not broad prose.",
    "The final slice is small enough to review independently."
  ],
  "backlog": [
    {
      "id": "04-01",
      "title": "Enterprise child accounts inherit trial-only entitlements when an override expires.",
      "owner": "agent candidate",
      "skill": "grill-me / grill-with-docs",
      "risk": "high",
      "done": false
    },
    {
      "id": "04-02",
      "title": "Seat count errors use billing language that support cannot map to the entitlement screen.",
      "owner": "accountable owner",
      "skill": "grill-me / grill-with-docs",
      "risk": "medium",
      "done": false
    },
    {
      "id": "04-03",
      "title": "The current plan ignores what happens to active overrides during a plan downgrade.",
      "owner": "agent candidate",
      "skill": "grill-me / grill-with-docs",
      "risk": "critical",
      "done": false
    },
    {
      "id": "04-04",
      "title": "Audit events are written only for successful saves, not blocked entitlement attempts.",
      "owner": "accountable owner",
      "skill": "grill-me / grill-with-docs",
      "risk": "medium",
      "done": false
    }
  ],
  "evidence": [
    {
      "gate": "Question log covers decision branches, dependencies, defaults, non-goals, and open risks.",
      "status": "missing",
      "proof": "needs learner evidence"
    },
    {
      "gate": "Spec examples cover eligible, blocked, expired, downgrade, and override conflict paths.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "React contract panel reflects the frozen decisions and rejects unknown entitlement states.",
      "status": "ready",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "Tests or script checks prove the implementation uses the decision table rather than free text.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    }
  ],
  "decisions": [
    {
      "question": "How will the team prove step 1?",
      "decision": "Run a one-question-at-a-time interview before asking for an implementation plan.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 2?",
      "decision": "Answer code-discoverable questions by inspecting the starter instead of asking the user.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 3?",
      "decision": "Convert answers into a decision table and PR-sized slices.",
      "status": "open"
    },
    {
      "question": "How will the team prove step 4?",
      "decision": "Implement one vertical slice and link each test to a question it resolves.",
      "status": "open"
    }
  ]
} satisfies LabContract;
