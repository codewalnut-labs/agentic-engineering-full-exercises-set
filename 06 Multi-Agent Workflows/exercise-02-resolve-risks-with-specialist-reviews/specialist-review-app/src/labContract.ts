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
  "title": "Resolve Release Risks with Specialist Reviews",
  "competency": "06. Multi-Agent Workflows - Specialist review and accountable integration",
  "domain": "An access-approval workflow with interacting security, accessibility, performance, and testability risks",
  "mission": "Run four independent specialist reviews against one baseline SHA, triage every finding, remediate the required blockers, and obtain fresh rechecks against one remediation SHA.",
  "outcome": "The merge decision is supported by reproducible specialist evidence, deterministic checks, comparable performance measurements, and Git-bound review records.",
  "entities": [
    "baseline and remediation SHA",
    "specialist role and fresh session",
    "source-backed finding and severity",
    "integration decision and residual risk",
    "focused recheck and command evidence"
  ],
  "seededDefects": [
    "untrusted request notes are rendered as dynamic HTML",
    "privileged approval trusts the UI instead of enforcing authorization and evidence at the service boundary",
    "clickable div rows prevent keyboard-native review selection",
    "portfolio risk repeats an expensive calculation on every render",
    "approval behavior depends on window and real time, making boundary tests unreliable",
    "a supplied specialist claim incorrectly recommends keeping authorization in the UI"
  ],
  "verificationGates": [
    "four distinct before sessions reviewing the same baseline SHA",
    "complete finding triage with required blockers fixed",
    "source-backed dismissal of the supplied incorrect finding and explicit security-testability interaction review",
    "protected security, accessibility, performance, and testability checks",
    "four fresh after sessions reviewing the same remediation SHA",
    "Git-scoped remediation and comparable before-after performance evidence",
    "npm run verify:exercise checks protected inputs, implementation quality, and required submission evidence."
  ],
  "agentWorkflow": [
    "Use dispatching-parallel-agents with fresh bounded agent sessions and retained raw transcripts.",
    "Record the clean baseline SHA and run four read-only specialist agents in parallel.",
    "Require each specialist to produce source-located findings and captured command output.",
    "Triage every unique and supplied finding, reject unsupported advice, and identify cross-specialist interactions.",
    "Commit the application remediation before adding evidence.",
    "Run four fresh specialist rechecks and verify the complete evidence against Git.",
    "Record baseline and verified outcomes, seal committed evidence, and capture final verification."
  ],
  "workingDeliverables": [
    "Eight specialist reports and eight captured focused-command outputs.",
    "One machine-readable review cycle and complete decision log.",
    "A focused application remediation with participant-owned regression tests.",
    "Comparable performance measurements tied to both Git SHAs.",
    "An integration record with final checks, merge decision, rollback, and remaining risk.",
    "evidence/comparison.md",
    "Actual prompts, agent sessions, skill provenance, and sealed command evidence."
  ],
  "masterySignals": [
    "Specialists remain independent, read-only, scoped, and synchronized to one code version.",
    "Findings contain enough evidence for the integration owner to reproduce and decide them.",
    "Required cross-cutting risks are fixed at the correct boundaries.",
    "The integration owner rejects a confident but unsupported specialist recommendation with proof.",
    "Fresh rechecks validate the code that is actually proposed for merge.",
    "Automated verification rejects stale SHAs, duplicated sessions, incomplete triage, and unverifiable performance claims."
  ]
};
