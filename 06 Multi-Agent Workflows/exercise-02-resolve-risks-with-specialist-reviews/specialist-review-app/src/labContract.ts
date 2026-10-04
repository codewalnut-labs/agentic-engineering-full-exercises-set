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
  "mission": "Coordinate four agents to review security, keyboard use, speed, and reliable testing. Check their findings, fix confirmed problems, and have four new sessions review the repaired code.",
  "outcome": "All required problems are fixed, the four checks pass, and saved reviews show which code version was checked and why the change is ready.",
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
    "Use dispatching-parallel-agents to start one reviewing agent per role on the same starting commit.",
    "Have reviewers inspect code and run their checks without editing the application.",
    "Check every finding, record a fix/postpone/dismiss decision, and reject the supplied incorrect recommendation.",
    "Fix the required problems in one code commit and measure performance with the same inputs.",
    "Start four new review sessions on the fixed commit and save their check results.",
    "Record the before and after results, seal the committed evidence, and capture final verification."
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
