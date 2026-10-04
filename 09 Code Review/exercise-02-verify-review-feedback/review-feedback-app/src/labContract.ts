export interface LabContract {
  title: string; competency: string; domain: string; mission: string; outcome: string;
  entities: string[]; seededDefects: string[]; verificationGates: string[];
  agentWorkflow: string[]; workingDeliverables: string[]; masterySignals: string[];
}

export const labContract: LabContract = {
  "title": "Verify Review Findings Before Changing Code",
  "competency": "09. Code Review",
  "domain": "Browser cache persistence in a workflow queue",
  "mission": "Assess independent review findings and an earlier comment before changing code; accept or dismiss each claim using a focused reproduction.",
  "outcome": "The team can see which feedback was justified, why other feedback was rejected, and how the focused fixes were verified.",
  "entities": [
    "protected review range",
    "fresh reviewer session",
    "workflow cache",
    "structured findings"
  ],
  "seededDefects": [
    "persistence lifecycle risk",
    "untrusted cache data",
    "shared-state mutation risk",
    "reviewer-noise claim"
  ],
  "verificationGates": [
    "protected fixture verification",
    "fresh-context evidence verification",
    "cache acceptance tests",
    "source-SHA scope gate",
    "npm run verify:exercise checks protected inputs, implementation quality, and required submission evidence.",
    "Actual command output, skill provenance, and report artifacts are committed and sealed."
  ],
  "agentWorkflow": [
    "Preserve a fresh review without implementation history or the earlier comment.",
    "Use receiving-code-review to assess each independent finding and the supplied claim.",
    "Write evidence-backed responses explaining accepted and dismissed feedback.",
    "Fix only confirmed blockers and commit focused source changes and regression tests.",
    "Prove the same tests fail before and pass after; obtain a fresh recheck of the fixed commit.",
    "Capture results, cite sources, commit and seal evidence, and run final verification."
  ],
  "workingDeliverables": [
    "Focused application fixes and learner regression tests.",
    "Structured and Markdown original review reports.",
    "Raw reviewer sessions and a recheck bound to the fixed commit.",
    "Original fresh prompt, session metadata, and an evidence-backed feedback response.",
    "evidence/before.md, evidence/after.md, and evidence/comparison.md.",
    "Skill-use record, source audit, sealed manifest, and actual command captures."
  ],
  "masterySignals": [
    "Reviewer independence is explicit and auditable.",
    "Blockers have concrete scenarios and impact.",
    "Unsupported noise is dismissed with code evidence.",
    "Source history contains no unrelated changes."
  ]
};
