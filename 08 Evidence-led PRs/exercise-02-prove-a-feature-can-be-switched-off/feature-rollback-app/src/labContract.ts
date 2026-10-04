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
  "title": "Prove a Feature Can Be Switched Off Safely",
  "competency": "08. Evidence-led PRs",
  "domain": "Provider-independent invoice preview rollout with a configuration kill switch and commit-bound rollback evidence.",
  "mission": "Repair the feature flag boundary and prove that a configuration command safely disables the new behavior.",
  "outcome": "A reviewer can reproduce the flag states and safely run the audited local rollback drill.",
  "entities": [
    "flag evaluation",
    "targeting context",
    "preview API",
    "telemetry event",
    "rollback configuration",
    "source commit"
  ],
  "seededDefects": [
    "The boundary evaluates with a true default and accepts invalid targeting context.",
    "Disabled and provider-error states still call the preview API and emit telemetry.",
    "The preview telemetry omits required identity fields and API failures do not fail closed.",
    "There is no atomic, audited rollback command."
  ],
  "verificationGates": [
    "Protected tests cover enabled, disabled, provider-error, invalid-context, and API-error behavior.",
    "The rollback drill rejects invalid input without mutation and atomically changes a temporary configuration.",
    "Generated JSON and Markdown record observed calls, telemetry, timing, configuration digests, and audit data.",
    "One source SHA contains the implementation and later changes are evidence only.",
    "npm run verify:exercise checks protected inputs, implementation quality, and required submission evidence."
  ],
  "agentWorkflow": [
    "Inspect the starting state and record observed gaps in evidence/before.md.",
    "Inspect the protected flag, rollback, and evidence contracts.",
    "Repair the provider-independent boundary without changing the protected scenarios.",
    "Implement the rollback CLI and prove invalid-input and successful rollback behavior.",
    "Commit the implementation, generate evidence for that SHA, and run the submission verifier.",
    "Use verification-before-completion to check each PR claim against fresh command output.",
    "Write the reviewer decision, source citations, and evidence/after.md and evidence/comparison.md."
  ],
  "workingDeliverables": [
    "Corrected invoice preview rollout boundary.",
    "Atomic rollback CLI with audit metadata.",
    "Three generated rollout scenario documents.",
    "Generated rollback JSON, reviewer Markdown, and verification output.",
    "evidence/comparison.md",
    "evidence/before.md and evidence/after.md",
    "Reviewer summary, skill-use record, source audit, sealed manifest, and actual command captures."
  ],
  "masterySignals": [
    "Every non-enabled path returns legacy behavior with zero preview side effects.",
    "Flag evaluation and telemetry use the same stable account identity.",
    "Rollback is validated, audited, atomic, deterministic, and completes within the objective.",
    "Evidence is generated, reproducible, and bound to the reviewed source commit."
  ]
};
