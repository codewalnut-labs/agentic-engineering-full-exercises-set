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
  "title": "Give Reviewers Complete Evidence When Checks Fail",
  "competency": "08. Evidence-led PRs",
  "domain": "Pull-request evidence generated from protected check results and uploaded by GitHub Actions.",
  "mission": "Correct a misleading PR description and build a complete evidence pack that preserves failed checks and their artifacts.",
  "outcome": "A reviewer can inspect every result, reproduce the checks, and understand why the PR remains in draft and blocked.",
  "entities": [
    "source commit",
    "check result",
    "artifact",
    "evidence pack",
    "workflow run"
  ],
  "seededDefects": [
    "There is no executable generator for the protected results.",
    "The failed smoke result can be omitted or rewritten.",
    "No root workflow uploads stable evidence after failure.",
    "Risk, reviewer action, and rollback are not enforced per check.",
    "The supplied PR description makes unsupported claims that the reviewer challenges."
  ],
  "verificationGates": [
    "The generator passes mixed-result and all-passing protected fixtures.",
    "Every artifact is copied byte-for-byte and receives a SHA-256 digest.",
    "The workflow uses read-only permissions, pinned actions, and always-run verification and upload.",
    "Source SHA and Git history bind evidence to the reviewed implementation.",
    "npm run verify:exercise checks protected inputs, implementation quality, and required submission evidence."
  ],
  "agentWorkflow": [
    "Inspect the supplied PR draft and reviewer comment in docs/pr-review-brief.md.",
    "Inspect the starting state and record observed gaps in evidence/before.md.",
    "Inspect the fixture, evidence schema, and workflow requirements.",
    "Implement one fixture-independent generator.",
    "Add the repository-root pull-request workflow.",
    "Generate, verify, and document the failing evidence pack.",
    "Use verification-before-completion to check each PR claim against fresh command output.",
    "Write the reviewer decision, source citations, and evidence/after.md and evidence/comparison.md.",
    "Correct the PR title and body, map claims to the diff and proof, and answer FAIL-01 in evidence/review-response.md.",
    "After local verification, open a draft PR and link the actual failed workflow run and uploaded evidence."
  ],
  "workingDeliverables": [
    "Evidence generator with the required CLI.",
    "Repository-root GitHub Actions workflow.",
    "Generated JSON pack and copied artifacts.",
    "Reviewer-facing evidence summary and verification output.",
    "evidence/comparison.md",
    "evidence/before.md and evidence/after.md",
    "Reviewer summary, skill-use record, source audit, sealed manifest, and actual command captures.",
    "evidence/review-response.md addressing the supplied comment.",
    "A focused hosted PR with a corrected title, evidence map, accessible proof, and a supported review decision."
  ],
  "masterySignals": [
    "Failure evidence is complete before the generator exits non-zero.",
    "A failed check cannot become a successful workflow.",
    "Every review claim is connected to a commit and immutable artifact.",
    "PR claims and reviewer responses stay within the scope of the measured evidence."
  ]
};
