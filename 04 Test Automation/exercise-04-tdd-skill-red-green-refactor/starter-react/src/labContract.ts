import type { LabContract } from "./types";

export const labContract = {
  "title": "TDD Skill Red-Green Refactor",
  "competency": "04. Test Automation",
  "skillPattern": "tdd",
  "domain": "Invoice retry orchestration with payment methods, retry windows, dunning notices, account holds, and recovery events.",
  "mission": "Use a TDD-style skill loop to implement invoice retry rules without letting the agent jump straight to a broad rewrite.",
  "outcome": "Payment retry behavior is specified test-first, implemented one rule at a time, and refactored only after the suite proves behavior.",
  "entities": [
    "Invoice",
    "PaymentMethod",
    "RetryWindow",
    "DunningNotice",
    "AccountHold",
    "RecoveryEvent"
  ],
  "seededDefects": [
    "Expired payment methods still schedule a third retry.",
    "Enterprise accounts receive consumer dunning copy.",
    "The retry counter resets when the page refreshes local state.",
    "Recovered invoices do not clear account hold warnings."
  ],
  "verificationGates": [
    "Tests are written before each behavior change.",
    "Each red-green-refactor step is recorded with command evidence.",
    "Mocks are deterministic and cover network failure, expired card, recovery, and enterprise copy.",
    "Refactoring happens after behavior is green, not as a speculative rewrite."
  ],
  "agentWorkflow": [
    "Confirm the behavior contract and interfaces to test.",
    "Write one failing test for the smallest rule.",
    "Implement only enough code to pass.",
    "Refactor after the test suite protects behavior."
  ],
  "workingDeliverables": [
    "Tests for retry scheduling and copy decisions.",
    "Working React retry state behavior.",
    "Refactor notes explaining protected behavior.",
    "Evidence log showing red, green, and refactor commands."
  ],
  "masterySignals": [
    "The agent follows the loop under pressure.",
    "Tests describe user-visible behavior.",
    "Refactor scope stays bounded by characterization."
  ],
  "backlog": [
    {
      "id": "04-01",
      "title": "Expired payment methods still schedule a third retry.",
      "owner": "agent candidate",
      "skill": "tdd",
      "risk": "high",
      "done": false
    },
    {
      "id": "04-02",
      "title": "Enterprise accounts receive consumer dunning copy.",
      "owner": "accountable owner",
      "skill": "tdd",
      "risk": "medium",
      "done": false
    },
    {
      "id": "04-03",
      "title": "The retry counter resets when the page refreshes local state.",
      "owner": "agent candidate",
      "skill": "tdd",
      "risk": "critical",
      "done": false
    },
    {
      "id": "04-04",
      "title": "Recovered invoices do not clear account hold warnings.",
      "owner": "accountable owner",
      "skill": "tdd",
      "risk": "medium",
      "done": false
    }
  ],
  "evidence": [
    {
      "gate": "Tests are written before each behavior change.",
      "status": "missing",
      "proof": "needs learner evidence"
    },
    {
      "gate": "Each red-green-refactor step is recorded with command evidence.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "Mocks are deterministic and cover network failure, expired card, recovery, and enterprise copy.",
      "status": "ready",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "Refactoring happens after behavior is green, not as a speculative rewrite.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    }
  ],
  "decisions": [
    {
      "question": "How will the team prove step 1?",
      "decision": "Confirm the behavior contract and interfaces to test.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 2?",
      "decision": "Write one failing test for the smallest rule.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 3?",
      "decision": "Implement only enough code to pass.",
      "status": "open"
    },
    {
      "question": "How will the team prove step 4?",
      "decision": "Refactor after the test suite protects behavior.",
      "status": "open"
    }
  ]
} satisfies LabContract;
