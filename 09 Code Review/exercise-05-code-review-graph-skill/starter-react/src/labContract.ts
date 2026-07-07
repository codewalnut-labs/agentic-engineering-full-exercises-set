import type { LabContract } from "./types";

export const labContract = {
  "title": "Code Review Graph Skill",
  "competency": "09. Code Review",
  "skillPattern": "code review graph",
  "domain": "Discount engine with eligibility rules, coupon stacking, account tiers, audit logging, and checkout integration.",
  "mission": "Use structural graph context to review a large agent-written discount change by call path, ownership, and risk.",
  "outcome": "Review findings are grounded in diff scope, graph relationships, tests, and NFR checks instead of reading files randomly.",
  "entities": [
    "Coupon",
    "EligibilityRule",
    "AccountTier",
    "StackingPolicy",
    "CheckoutAdapter",
    "AuditLog"
  ],
  "seededDefects": [
    "A refactor changes coupon stacking order for enterprise accounts.",
    "The graph shows checkout adapter depends on audit logging, but tests assert only UI state.",
    "A generated helper bypasses the existing rule owner boundary.",
    "A low-severity copy change hides a high-severity behavioral regression."
  ],
  "verificationGates": [
    "Review starts from diff and issue list, then uses graph paths for risk expansion.",
    "Findings are severity-ranked with file references and reproduction steps.",
    "NFR pass covers security, accessibility, performance, and maintainability where relevant.",
    "Accepted, deferred, and dismissed findings are triaged with rationale."
  ],
  "agentWorkflow": [
    "Ask a fresh agent or session for graph-assisted review.",
    "Review the diff yourself before accepting findings.",
    "Patch at least one confirmed blocker.",
    "Run a re-review or focused check on the patched area."
  ],
  "workingDeliverables": [
    "Graph-guided review report.",
    "Confirmed blocker fix in React code.",
    "Regression test or script check.",
    "Triage table for every finding."
  ],
  "masterySignals": [
    "Review is neither blind trust nor duplicate implementation.",
    "Graph context broadens risk only where useful.",
    "Findings are actionable and verified."
  ],
  "backlog": [
    {
      "id": "05-01",
      "title": "A refactor changes coupon stacking order for enterprise accounts.",
      "owner": "agent candidate",
      "skill": "code review graph",
      "risk": "high",
      "done": false
    },
    {
      "id": "05-02",
      "title": "The graph shows checkout adapter depends on audit logging, but tests assert only UI state.",
      "owner": "accountable owner",
      "skill": "code review graph",
      "risk": "medium",
      "done": false
    },
    {
      "id": "05-03",
      "title": "A generated helper bypasses the existing rule owner boundary.",
      "owner": "agent candidate",
      "skill": "code review graph",
      "risk": "critical",
      "done": false
    },
    {
      "id": "05-04",
      "title": "A low-severity copy change hides a high-severity behavioral regression.",
      "owner": "accountable owner",
      "skill": "code review graph",
      "risk": "medium",
      "done": false
    }
  ],
  "evidence": [
    {
      "gate": "Review starts from diff and issue list, then uses graph paths for risk expansion.",
      "status": "missing",
      "proof": "needs learner evidence"
    },
    {
      "gate": "Findings are severity-ranked with file references and reproduction steps.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "NFR pass covers security, accessibility, performance, and maintainability where relevant.",
      "status": "ready",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "Accepted, deferred, and dismissed findings are triaged with rationale.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    }
  ],
  "decisions": [
    {
      "question": "How will the team prove step 1?",
      "decision": "Ask a fresh agent or session for graph-assisted review.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 2?",
      "decision": "Review the diff yourself before accepting findings.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 3?",
      "decision": "Patch at least one confirmed blocker.",
      "status": "open"
    },
    {
      "question": "How will the team prove step 4?",
      "decision": "Run a re-review or focused check on the patched area.",
      "status": "open"
    }
  ]
} satisfies LabContract;
