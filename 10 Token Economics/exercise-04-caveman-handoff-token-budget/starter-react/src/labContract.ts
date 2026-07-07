import type { LabContract } from "./types";

export const labContract = {
  "title": "Caveman Handoff Token Budget",
  "competency": "10. Token Economics",
  "skillPattern": "caveman, handoff, and token optimizer",
  "domain": "Design system migration with component variants, accessibility states, visual review notes, package boundaries, and release coordination.",
  "mission": "Reduce session waste during a long design-system migration by compressing agent output, pruning context, and creating a precise handoff.",
  "outcome": "A migration session remains understandable and cheap because prose is compressed, repeated context is removed, and handoff state is surgical.",
  "entities": [
    "ComponentVariant",
    "A11yState",
    "VisualReview",
    "PackageBoundary",
    "MigrationStep",
    "HandoffNote"
  ],
  "seededDefects": [
    "The agent repeats the full migration plan after every small check.",
    "The context file includes stale component lists that are no longer used.",
    "The handoff omits failed commands and unresolved visual risk.",
    "The output compression rule accidentally removes required file references."
  ],
  "verificationGates": [
    "Token ledger separates useful context from repeated narration and stale files.",
    "Compressed update format preserves file paths, commands, risks, and decisions.",
    "Handoff note lets a fresh agent continue without rereading the whole thread.",
    "One migration step is implemented with lower context churn."
  ],
  "agentWorkflow": [
    "Audit session transcript for repeated output and stale context.",
    "Define a compressed communication mode with safety exceptions.",
    "Implement one migration task using the budget.",
    "Write a handoff that preserves decisions, commands, failures, and next steps."
  ],
  "workingDeliverables": [
    "Token ledger and context-pruning patch.",
    "Compressed status/update template.",
    "Working React migration slice.",
    "Handoff note tested by a fresh planning pass."
  ],
  "seniorSignals": [
    "Compression keeps signal.",
    "Handoffs avoid lossy compaction.",
    "Cost savings do not hide risk."
  ],
  "backlog": [
    {
      "id": "04-01",
      "title": "The agent repeats the full migration plan after every small check.",
      "owner": "agent candidate",
      "skill": "caveman, handoff, and token optimizer",
      "risk": "high",
      "done": false
    },
    {
      "id": "04-02",
      "title": "The context file includes stale component lists that are no longer used.",
      "owner": "senior owner",
      "skill": "caveman, handoff, and token optimizer",
      "risk": "medium",
      "done": false
    },
    {
      "id": "04-03",
      "title": "The handoff omits failed commands and unresolved visual risk.",
      "owner": "agent candidate",
      "skill": "caveman, handoff, and token optimizer",
      "risk": "critical",
      "done": false
    },
    {
      "id": "04-04",
      "title": "The output compression rule accidentally removes required file references.",
      "owner": "senior owner",
      "skill": "caveman, handoff, and token optimizer",
      "risk": "medium",
      "done": false
    }
  ],
  "evidence": [
    {
      "gate": "Token ledger separates useful context from repeated narration and stale files.",
      "status": "missing",
      "proof": "needs learner evidence"
    },
    {
      "gate": "Compressed update format preserves file paths, commands, risks, and decisions.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "Handoff note lets a fresh agent continue without rereading the whole thread.",
      "status": "ready",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "One migration step is implemented with lower context churn.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    }
  ],
  "decisions": [
    {
      "question": "How will the team prove step 1?",
      "decision": "Audit session transcript for repeated output and stale context.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 2?",
      "decision": "Define a compressed communication mode with safety exceptions.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 3?",
      "decision": "Implement one migration task using the budget.",
      "status": "open"
    },
    {
      "question": "How will the team prove step 4?",
      "decision": "Write a handoff that preserves decisions, commands, failures, and next steps.",
      "status": "open"
    }
  ]
} satisfies LabContract;
