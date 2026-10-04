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
  "mission": "Repair the feature flag boundary and prepare a rollout PR with reproducible proof that the local rollback safely disables new behavior.",
  "outcome": "A reviewer can assess the proposed rollout, reproduce the local rollback drill, and see which production checks remain.",
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
    "There is no atomic, audited rollback command.",
    "The supplied PR description makes unsupported claims that the reviewer challenges."
  ],
  "verificationGates": [
    "Protected tests cover enabled, disabled, provider-error, invalid-context, and API-error behavior.",
    "The rollback drill rejects invalid input without mutation and atomically changes a temporary configuration.",
    "Generated JSON and Markdown record observed calls, telemetry, timing, configuration digests, and audit data.",
    "One source SHA contains the implementation and later changes are evidence only.",
    "npm run verify:exercise checks protected inputs, implementation quality, and required submission evidence."
  ],
  "agentWorkflow": [
    "Inspect the supplied PR draft and reviewer comment in docs/pr-review-brief.md.",
    "Inspect the starting state and record observed gaps in evidence/before.md.",
    "Inspect the protected flag, rollback, and evidence contracts.",
    "Repair the provider-independent boundary without changing the protected scenarios.",
    "Implement the rollback CLI and prove invalid-input and successful rollback behavior.",
    "Commit the implementation, generate evidence for that SHA, and run the submission verifier.",
    "Use verification-before-completion to check each PR claim against fresh command output.",
    "Write the reviewer decision, source citations, and evidence/after.md and evidence/comparison.md.",
    "Correct the PR title and body, map claims to the diff and proof, and answer ROLLBACK-01 in evidence/review-response.md.",
    "After local verification, open a focused PR, link the evidence, and refresh proof after any implementation change."
  ],
  "workingDeliverables": [
    "Corrected invoice preview rollout boundary.",
    "Atomic rollback CLI with audit metadata.",
    "Three generated rollout scenario documents.",
    "Generated rollback JSON, reviewer Markdown, and verification output.",
    "evidence/comparison.md",
    "evidence/before.md and evidence/after.md",
    "Reviewer summary, skill-use record, source audit, sealed manifest, and actual command captures.",
    "evidence/review-response.md addressing the supplied comment.",
    "A focused hosted PR with a corrected title, evidence map, accessible proof, and a supported review decision."
  ],
  "masterySignals": [
    "Disabled, invalid-context, and provider-error paths produce no preview side effects; API failure returns legacy after one attempted call and emits no preview telemetry.",
    "Flag evaluation and telemetry use the same stable account identity.",
    "Rollback is validated, audited, atomic, deterministic, and completes within the objective.",
    "Evidence is generated, reproducible, and bound to the reviewed source commit.",
    "PR claims and reviewer responses stay within the scope of the measured evidence."
  ]
};
