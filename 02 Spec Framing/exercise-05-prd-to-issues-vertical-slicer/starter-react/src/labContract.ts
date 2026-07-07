import type { LabContract } from "./types";

export const labContract = {
  "title": "PRD to Issues Vertical Slicer",
  "competency": "02. Spec Framing",
  "skillPattern": "to-prd / to-issues",
  "domain": "Usage-based upgrade prompt experiment with cohorts, limits, analytics, notification copy, and billing handoff.",
  "mission": "Turn a messy growth experiment conversation into a PRD and independently grabbable vertical slice issues.",
  "outcome": "A broad experiment idea becomes a PRD, dependency graph, and issue set that multiple agents can implement without stepping on each other.",
  "entities": [
    "Experiment",
    "Cohort",
    "UsageLimit",
    "PromptVariant",
    "AnalyticsEvent",
    "BillingHandoff"
  ],
  "seededDefects": [
    "The prompt fires for internal test accounts and pollutes analytics.",
    "The draft issue list splits work by UI, API, and analytics layers instead of vertical behavior.",
    "Rollback requirements are missing for customers who opt out of usage prompts.",
    "The PRD does not say which metric defines experiment success."
  ],
  "verificationGates": [
    "PRD includes problem, users, success metric, constraints, non-goals, and examples.",
    "Issues are vertical slices with acceptance criteria and explicit dependencies.",
    "At least one issue ships a thin behavior across UI, state, analytics, and test evidence.",
    "The board marks human-review and agent-ready tasks separately."
  ],
  "agentWorkflow": [
    "Extract product intent from the conversation before writing issues.",
    "Inspect the starter to verify what modules already exist.",
    "Create vertical slices that reveal integration risk early.",
    "Implement one agent-ready issue and leave the rest ready for delegation."
  ],
  "workingDeliverables": [
    "PRD draft tied to concrete examples.",
    "Issue board with dependency and ownership notes.",
    "Working React slice for one upgrade prompt path.",
    "Evidence that the implemented slice passes local gates."
  ],
  "masterySignals": [
    "Slices cut through product behavior, not architecture layers.",
    "Unknowns become questions or spikes, not hidden assumptions.",
    "Parallel work can start without re-reading the original conversation."
  ],
  "backlog": [
    {
      "id": "05-01",
      "title": "The prompt fires for internal test accounts and pollutes analytics.",
      "owner": "agent candidate",
      "skill": "to-prd / to-issues",
      "risk": "high",
      "done": false
    },
    {
      "id": "05-02",
      "title": "The draft issue list splits work by UI, API, and analytics layers instead of vertical behavior.",
      "owner": "accountable owner",
      "skill": "to-prd / to-issues",
      "risk": "medium",
      "done": false
    },
    {
      "id": "05-03",
      "title": "Rollback requirements are missing for customers who opt out of usage prompts.",
      "owner": "agent candidate",
      "skill": "to-prd / to-issues",
      "risk": "critical",
      "done": false
    },
    {
      "id": "05-04",
      "title": "The PRD does not say which metric defines experiment success.",
      "owner": "accountable owner",
      "skill": "to-prd / to-issues",
      "risk": "medium",
      "done": false
    }
  ],
  "evidence": [
    {
      "gate": "PRD includes problem, users, success metric, constraints, non-goals, and examples.",
      "status": "missing",
      "proof": "needs learner evidence"
    },
    {
      "gate": "Issues are vertical slices with acceptance criteria and explicit dependencies.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "At least one issue ships a thin behavior across UI, state, analytics, and test evidence.",
      "status": "ready",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "The board marks human-review and agent-ready tasks separately.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    }
  ],
  "decisions": [
    {
      "question": "How will the team prove step 1?",
      "decision": "Extract product intent from the conversation before writing issues.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 2?",
      "decision": "Inspect the starter to verify what modules already exist.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 3?",
      "decision": "Create vertical slices that reveal integration risk early.",
      "status": "open"
    },
    {
      "question": "How will the team prove step 4?",
      "decision": "Implement one agent-ready issue and leave the rest ready for delegation.",
      "status": "open"
    }
  ]
} satisfies LabContract;
