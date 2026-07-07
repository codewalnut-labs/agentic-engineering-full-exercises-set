import type { LabContract } from "./types";

export const labContract = {
  "title": "Cross-Agent Skill Portability Pack",
  "competency": "05. Skill Packaging",
  "skillPattern": "cross-agent skill standardization",
  "domain": "Compliance evidence review workflow for SaaS audit controls, screenshots, PR links, policy exceptions, and sign-off notes.",
  "mission": "Package a compliance review workflow so it works cleanly across Codex, Claude Code, Cursor, Gemini CLI, and other skill-aware agents.",
  "outcome": "A reusable team skill has precise metadata, portable paths, scoped tool assumptions, references, and install notes that do not depend on one machine.",
  "entities": [
    "Control",
    "EvidenceItem",
    "PolicyException",
    "Reviewer",
    "AuditPeriod",
    "SignOff"
  ],
  "seededDefects": [
    "The draft skill hard-codes a user directory path.",
    "The description is too vague for implicit triggering.",
    "The workflow assumes every agent has the same browser and shell tools.",
    "Reference material is pasted inline instead of loaded on demand."
  ],
  "verificationGates": [
    "Skill uses portable relative paths and documented project roots.",
    "Metadata explains use and non-use cases in trigger-friendly language.",
    "References are split from the top-level instructions.",
    "Install notes cover at least Codex, Claude Code, Cursor, and Gemini-style skill paths."
  ],
  "agentWorkflow": [
    "Audit the flawed skill for portability and trigger issues.",
    "Refactor instructions into top-level steps plus references.",
    "Add install target matrix and scoped tool notes.",
    "Run the local validator and record unresolved portability risks."
  ],
  "workingDeliverables": [
    "Portable SKILL.md and references.",
    "Cross-agent install matrix.",
    "Validator results for hard-coded paths and broad tool assumptions.",
    "Example prompt showing correct and incorrect trigger behavior."
  ],
  "masterySignals": [
    "The skill can be committed for a team.",
    "Tool assumptions are explicit.",
    "Context stays progressively disclosed."
  ],
  "backlog": [
    {
      "id": "05-01",
      "title": "The draft skill hard-codes a user directory path.",
      "owner": "agent candidate",
      "skill": "cross-agent skill standardization",
      "risk": "high",
      "done": false
    },
    {
      "id": "05-02",
      "title": "The description is too vague for implicit triggering.",
      "owner": "accountable owner",
      "skill": "cross-agent skill standardization",
      "risk": "medium",
      "done": false
    },
    {
      "id": "05-03",
      "title": "The workflow assumes every agent has the same browser and shell tools.",
      "owner": "agent candidate",
      "skill": "cross-agent skill standardization",
      "risk": "critical",
      "done": false
    },
    {
      "id": "05-04",
      "title": "Reference material is pasted inline instead of loaded on demand.",
      "owner": "accountable owner",
      "skill": "cross-agent skill standardization",
      "risk": "medium",
      "done": false
    }
  ],
  "evidence": [
    {
      "gate": "Skill uses portable relative paths and documented project roots.",
      "status": "missing",
      "proof": "needs learner evidence"
    },
    {
      "gate": "Metadata explains use and non-use cases in trigger-friendly language.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "References are split from the top-level instructions.",
      "status": "ready",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "Install notes cover at least Codex, Claude Code, Cursor, and Gemini-style skill paths.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    }
  ],
  "decisions": [
    {
      "question": "How will the team prove step 1?",
      "decision": "Audit the flawed skill for portability and trigger issues.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 2?",
      "decision": "Refactor instructions into top-level steps plus references.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 3?",
      "decision": "Add install target matrix and scoped tool notes.",
      "status": "open"
    },
    {
      "question": "How will the team prove step 4?",
      "decision": "Run the local validator and record unresolved portability risks.",
      "status": "open"
    }
  ]
} satisfies LabContract;
