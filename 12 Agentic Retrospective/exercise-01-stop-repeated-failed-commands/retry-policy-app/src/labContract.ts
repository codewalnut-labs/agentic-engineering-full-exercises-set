export interface LabContract {
  title: string; competency: string; domain: string; mission: string; outcome: string;
  entities: string[]; seededDefects: string[]; verificationGates: string[];
  agentWorkflow: string[]; workingDeliverables: string[]; masterySignals: string[];
}

export const labContract: LabContract = {
  "title": "Stop an Agent from Repeating Failed Commands",
  "competency": "12. Agentic Retrospective - Session review, waste reduction, and improvement",
  "domain": "Event-derived waste analysis and controlled workflow replay",
  "mission": "Diagnose repeated failed commands, correct the measurement, and verify an executable retry policy.",
  "outcome": "A controlled replay reduces avoidable calls while preserving final verification.",
  "entities": [
    "session event",
    "workspace revision",
    "retry preflight",
    "final verification"
  ],
  "seededDefects": [
    "every read is counted as duplicate",
    "first failed commands are counted as retries",
    "completion does not require post-write verification"
  ],
  "verificationGates": [
    "protected baseline metrics",
    "classification edge cases",
    "executable preflight",
    "condition-matched constructed replay",
    "anti-splice event provenance",
    "npm run verify:exercise checks protected inputs, implementation quality, and required submission evidence.",
    "Actual skill use and sealed evidence",
    "npm run verify:exercise"
  ],
  "agentWorkflow": [
    "Use systematic-debugging to separate useful events from repeated failures.",
    "Test the measurement and retry policy.",
    "Construct a new simulated replay and generate metrics.",
    "Compare evidence, state limits, and capture verification."
  ],
  "workingDeliverables": [
    "retry-policy-app/src/retro/analyzeSession.mjs",
    "retry-policy-app/src/retro/preflightPolicy.mjs",
    "retry-policy-app/src/retro/analyzeSession.test.mjs",
    "evidence/retrospective.md",
    "evidence/replay.md",
    "Before and after evidence, source citations, actual skill use, and captured verification."
  ],
  "masterySignals": [
    "Separates useful attempts from preventable repeats.",
    "Resets retry state only after diagnosis or change.",
    "Uses comparable replay conditions.",
    "Proves final verification happened after the last write."
  ]
};
