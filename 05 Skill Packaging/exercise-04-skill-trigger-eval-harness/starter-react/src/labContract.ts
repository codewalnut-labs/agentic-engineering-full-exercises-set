import type { LabContract } from "./types";

export const labContract = {
  "title": "Skill Trigger Eval Harness",
  "competency": "05. Skill Packaging",
  "skillPattern": "skill evals and skill optimizer",
  "domain": "Team skill catalog for PR review, release notes, incident response, and migration planning workflows.",
  "mission": "Build an eval harness that scores whether team skills trigger, run the right steps, and produce the expected output shape.",
  "outcome": "A skill is treated like production workflow code: trigger cases, process checks, output checks, and regression evidence exist before rollout.",
  "entities": [
    "SkillDefinition",
    "TriggerCase",
    "TraceEvent",
    "RubricCheck",
    "Regression",
    "SkillVersion"
  ],
  "seededDefects": [
    "The release skill triggers on incident prompts because the description is too broad.",
    "The review skill skips the required diff-only inspection step.",
    "A migration skill leaves scratch files outside the exercise folder.",
    "The eval report cannot compare v1 and v2 skill behavior."
  ],
  "verificationGates": [
    "Trigger cases include positive, negative, and ambiguous prompts.",
    "Process checks verify commands, touched files, and required artifacts.",
    "Output checks validate schema and reviewer-ready language.",
    "The harness produces a versioned pass/fail report."
  ],
  "agentWorkflow": [
    "Inspect the bundled skill and find trigger ambiguity.",
    "Write eval cases before changing the skill.",
    "Patch the skill metadata and instructions.",
    "Run the harness and capture the regression report."
  ],
  "workingDeliverables": [
    "Updated SKILL.md with precise use-when and do-not-use boundaries.",
    "Eval cases for trigger and output behavior.",
    "Runnable harness or script check.",
    "Versioned report showing improvement."
  ],
  "seniorSignals": [
    "Skill quality is measured, not guessed.",
    "The description is concise enough for implicit selection.",
    "Regression cases protect the workflow over time."
  ],
  "backlog": [
    {
      "id": "04-01",
      "title": "The release skill triggers on incident prompts because the description is too broad.",
      "owner": "agent candidate",
      "skill": "skill evals and skill optimizer",
      "risk": "high",
      "done": false
    },
    {
      "id": "04-02",
      "title": "The review skill skips the required diff-only inspection step.",
      "owner": "senior owner",
      "skill": "skill evals and skill optimizer",
      "risk": "medium",
      "done": false
    },
    {
      "id": "04-03",
      "title": "A migration skill leaves scratch files outside the exercise folder.",
      "owner": "agent candidate",
      "skill": "skill evals and skill optimizer",
      "risk": "critical",
      "done": false
    },
    {
      "id": "04-04",
      "title": "The eval report cannot compare v1 and v2 skill behavior.",
      "owner": "senior owner",
      "skill": "skill evals and skill optimizer",
      "risk": "medium",
      "done": false
    }
  ],
  "evidence": [
    {
      "gate": "Trigger cases include positive, negative, and ambiguous prompts.",
      "status": "missing",
      "proof": "needs learner evidence"
    },
    {
      "gate": "Process checks verify commands, touched files, and required artifacts.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "Output checks validate schema and reviewer-ready language.",
      "status": "ready",
      "proof": "seeded check ready for implementation"
    },
    {
      "gate": "The harness produces a versioned pass/fail report.",
      "status": "partial",
      "proof": "seeded check ready for implementation"
    }
  ],
  "decisions": [
    {
      "question": "How will the team prove step 1?",
      "decision": "Inspect the bundled skill and find trigger ambiguity.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 2?",
      "decision": "Write eval cases before changing the skill.",
      "status": "decided"
    },
    {
      "question": "How will the team prove step 3?",
      "decision": "Patch the skill metadata and instructions.",
      "status": "open"
    },
    {
      "question": "How will the team prove step 4?",
      "decision": "Run the harness and capture the regression report.",
      "status": "open"
    }
  ]
} satisfies LabContract;
