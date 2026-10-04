export interface LabContract {
  title: string;
  competency: string;
  domain: string;
  mission: string;
  outcome: string;
  entities: string[];
  seededDefects: string[];
  verificationGates: string[];
  agentWorkflow: string[];
  workingDeliverables: string[];
  masterySignals: string[];
}

export const labContract: LabContract = {
  "title": "Find and Fix Security and Accessibility Gaps",
  "competency": "09. Code Review",
  "domain": "Evidence-backed review of an exact access-approval PR containing scanner signal, scanner noise, and manual behavior defects.",
  "mission": "Review the exact change, distinguish real security and accessibility gaps from scanner noise, and fix confirmed blockers with regression proof.",
  "outcome": "The original review explains the risks, the same tests fail before and pass after, and a fresh recheck covers the fixed commit.",
  "entities": [
    "protected Git range",
    "scanner finding",
    "manual finding",
    "server transition",
    "regression test",
    "merge decision"
  ],
  "seededDefects": [
    "scanner signal mixed with scanner noise",
    "manual interaction risk",
    "cross-boundary policy risk"
  ],
  "verificationGates": [
    "Bundle SHAs and generated diff match the protected manifest.",
    "Every submitted finding is anchored, classified, and proved.",
    "Protected component and server tests prove the repaired behavior.",
    "Learner regression tests cover each confirmed blocker.",
    "Git history binds fixes and tests to the submitted evidence.",
    "npm run verify:exercise checks protected inputs, implementation quality, and required submission evidence.",
    "Actual command output, skill provenance, and report artifacts are committed and sealed."
  ],
  "agentWorkflow": [
    "Record the initial state and verify the supplied Git comparison.",
    "Use requesting-code-review to obtain an independent review of the exact change.",
    "Reproduce scanner findings and inspect security, accessibility, and trusted server boundaries.",
    "Fix confirmed blockers and commit focused source changes and learner regression tests.",
    "Replay tests on vulnerable and fixed code, then obtain a fresh recheck.",
    "Capture command results, cite sources, commit and seal evidence, and run final verification."
  ],
  "workingDeliverables": [
    "Focused application fixes and learner regression tests.",
    "Structured and Markdown original review reports.",
    "Raw reviewer sessions and a recheck bound to the fixed commit.",
    "Raw Semgrep results and justified scanner dismissals.",
    "evidence/before.md, evidence/after.md, and evidence/comparison.md.",
    "Skill-use record, source audit, sealed manifest, and actual command captures."
  ],
  "masterySignals": [
    "Scanner output is reproduced and classified rather than copied.",
    "Important manual findings are identified despite no scanner warning.",
    "Trusted-boundary conclusions are supported by direct reproduction.",
    "Every blocker maps to a focused regression test and exact evidence."
  ]
};
