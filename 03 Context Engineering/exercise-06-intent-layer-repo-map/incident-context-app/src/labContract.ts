import type { LabContract } from "./types";

export const labContract = {
  "title": "Intent Layer Repo Map",
  "competency": "03. Context Engineering",
  "skillPattern": "intent-layer / zoom-out",
  "domain": "Incident response console with alerts, escalation policies, responder schedules, runbook links, and post-incident summaries.",
  "mission": "Add folder-level intent context so agents understand ownership, constraints, and traps before editing an incident workflow.",
  "outcome": "The repo gets a compact intent layer that guides future agents to the right modules, commands, and review boundaries.",
  "entities": [
    "Alert",
    "EscalationPolicy",
    "ResponderSchedule",
    "RunbookLink",
    "IncidentSummary",
    "SlaClock"
  ],
  "seededDefects": [
    "Agents keep editing the alert list when the bug lives in escalation policy resolution.",
    "A folder contains two similarly named schedule helpers with different time zone assumptions.",
    "The current context file says all incidents are P2 by default, but code treats missing severity as P3.",
    "Runbook links are owned by support, not the incident platform team."
  ],
  "verificationGates": [
    "Intent notes explain module purpose, ownership, traps, and safe commands.",
    "Context stays compact enough for every session.",
    "A future bugfix plan cites intent notes before choosing files.",
    "One real workflow bug is fixed using the new context layer."
  ],
  "agentWorkflow": [
    "Zoom out to map folders and boundaries.",
    "Write compact intent notes at the smallest useful scope.",
    "Ask a fresh agent plan to use the intent layer.",
    "Implement one incident workflow fix and update stale context."
  ],
  "workingDeliverables": [
    "Folder intent notes or context map.",
    "Working React fix for escalation or severity behavior.",
    "Evidence that the agent used the context layer.",
    "Before and after notes for any corrected context."
  ],
  "masterySignals": [
    "Context explains why modules exist.",
    "The agent does fewer redundant reads.",
    "The notes help without becoming a second codebase."
  ],
  "backlog": [
    {
      "id": "06-01",
      "title": "Agents keep editing the alert list when the bug lives in escalation policy resolution.",
      "owner": "agent candidate",
      "skill": "intent-layer / zoom-out",
      "risk": "high",
      "done": false
    },
    {
      "id": "06-02",
      "title": "A folder contains two similarly named schedule helpers with different time zone assumptions.",
      "owner": "accountable owner",
      "skill": "intent-layer / zoom-out",
      "risk": "medium",
      "done": false
    },
    {
      "id": "06-03",
      "title": "The current context file says all incidents are P2 by default, but code treats missing severity as P3.",
      "owner": "agent candidate",
      "skill": "intent-layer / zoom-out",
      "risk": "critical",
      "done": false
    },
    {
      "id": "06-04",
      "title": "Runbook links are owned by support, not the incident platform team.",
      "owner": "accountable owner",
      "skill": "intent-layer / zoom-out",
      "risk": "medium",
      "done": false
    }
  ],
  "evidence": [
    {
      "gate": "Intent notes explain module purpose, ownership, traps, and safe commands.",
      "status": "missing",
      "proof": "needs learner evidence"
    },
    {
      "gate": "Context stays compact enough for every session.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "A future bugfix plan cites intent notes before choosing files.",
      "status": "ready",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "One real workflow bug is fixed using the new context layer.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    }
  ],
  "decisions": [
    {
      "question": "How will the team prove step 1?",
      "decision": "Zoom out to map folders and boundaries.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 2?",
      "decision": "Write compact intent notes at the smallest useful scope.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 3?",
      "decision": "Ask a fresh agent plan to use the intent layer.",
      "status": "open"
    },
    {
      "question": "How will the team prove step 4?",
      "decision": "Implement one incident workflow fix and update stale context.",
      "status": "open"
    }
  ]
} satisfies LabContract;
