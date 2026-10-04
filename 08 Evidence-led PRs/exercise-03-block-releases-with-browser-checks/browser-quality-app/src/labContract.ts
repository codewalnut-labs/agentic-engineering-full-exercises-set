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
  "title": "Block a Release That Fails Browser Quality Checks",
  "competency": "08. Evidence-led PRs",
  "domain": "Production-build Lighthouse and axe evidence used for an enforceable pull-request release decision.",
  "mission": "Fix the dashboard defects and prepare a PR whose browser quality decision is reproducible from current raw reports.",
  "outcome": "A reviewer can reproduce the worst-case decision, confirm evidence covers the PR code, and see the remaining manual accessibility checks.",
  "entities": [
    "source commit",
    "production build",
    "Lighthouse run",
    "axe scan",
    "quality threshold",
    "release decision"
  ],
  "seededDefects": [
    "The first render is delayed beyond the LCP budget.",
    "An icon-only action has no accessible name.",
    "No executable gate aggregates the worst of three Lighthouse runs.",
    "Existing evidence can be hand-written and does not prove a failing exit code.",
    "The supplied PR description makes unsupported claims that the reviewer challenges."
  ],
  "verificationGates": [
    "Exactly three comparable raw Lighthouse reports meet protected thresholds.",
    "A real Chrome axe scan reports zero violations.",
    "A generated summary matches raw artifact SHA-256 digests and metrics.",
    "Performance and accessibility negative controls both return non-zero.",
    "Git history binds implementation and evidence to one source SHA.",
    "npm run verify:exercise checks protected inputs, implementation quality, and required submission evidence."
  ],
  "agentWorkflow": [
    "Inspect the supplied PR draft and reviewer comment in docs/pr-review-brief.md.",
    "Inspect the starting state and record observed gaps in evidence/before.md.",
    "Inspect the UI, thresholds, gate CLI contract, and baseline reports.",
    "Fix the measured render and accessible-name defects.",
    "Implement Lighthouse configuration and the quality-gate CLI.",
    "Commit the implementation, capture browser evidence, and verify the submission.",
    "Use verification-before-completion to check each PR claim against fresh command output.",
    "Write the reviewer decision, source citations, and evidence/after.md and evidence/comparison.md.",
    "Correct the PR title and body, map claims to the diff and proof, and answer QUALITY-01 in evidence/review-response.md.",
    "After local verification, open a focused PR, link the evidence, and refresh proof after any implementation change."
  ],
  "workingDeliverables": [
    "Corrected dashboard startup and accessible action.",
    "Pessimistic Lighthouse CI configuration.",
    "Quality-gate CLI that writes a decision before exiting.",
    "Raw reports, generated summary, comparison, and verification output.",
    "evidence/comparison.md",
    "evidence/before.md and evidence/after.md",
    "Reviewer summary, skill-use record, source audit, sealed manifest, and actual command captures.",
    "evidence/review-response.md addressing the supplied comment.",
    "A focused hosted PR with a corrected title, evidence map, accessible proof, and a supported review decision."
  ],
  "masterySignals": [
    "One failing run cannot be hidden by better runs.",
    "Any axe violation blocks release.",
    "Every reported metric and claim traces to a raw artifact digest.",
    "A reviewer can reproduce the exact decision from the source commit.",
    "PR claims and reviewer responses stay within the scope of the measured evidence."
  ]
};
