import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
function findFiles(directory, relative = "") {
  const results = [];
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (["node_modules", "target", ".git", "reports"].includes(entry.name)) continue;
    const nextRelative = path.join(relative, entry.name);
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) results.push(...findFiles(absolute, nextRelative));
    if (entry.isFile()) results.push(nextRelative);
  }
  return results;
}

const files = findFiles(root);
const readmes = files.filter(
  (relative) => path.basename(relative) === "README.md" && path.basename(path.dirname(relative)).startsWith("exercise-"),
);
assert.equal(readmes.length, 35, `Expected 35 exercise READMEs, found ${readmes.length}`);
const challengeHeadings = ["Your Mission", "Project", "How To Go About It", "Evidence", "Completion Criteria"];
const challengeReadmes = new Set(readmes);
for (const relative of challengeReadmes) {
  const source = readFileSync(path.join(root, relative), "utf8");
  const headings = challengeHeadings;
  for (const heading of headings) assert.ok(source.includes(`## ${heading}`), `${relative} is missing ${heading}`);
  assert.ok(!source.includes("## Evaluation"), `${relative} still contains an evaluation rubric`);
  assert.ok(source.includes("docs/SUBMISSION_STANDARD.md"), `${relative} does not link to the submission standard`);
  const exerciseDirectory = path.dirname(relative);
  const contractPath = files.find((file) => path.dirname(path.dirname(file)) === exerciseDirectory && path.basename(file) === "evidence-contract.json");
  const evidenceMode = contractPath ? JSON.parse(readFileSync(path.join(root, contractPath), "utf8")).mode : "matched";
  const artifacts = evidenceMode === "matched"
    ? ["evidence/before.md", "evidence/before.patch", "evidence/after.md", "evidence/after.patch", "evidence/comparison.md"]
    : ["evidence/before.md", "evidence/after.md", "evidence/comparison.md"];
  for (const artifact of artifacts) {
    assert.ok(source.includes(artifact), `${relative} does not require ${artifact}`);
  }
  assert.ok(
    source.includes("[evidence instructions and template](./docs/evidence-template.md)"),
    `${relative} does not direct before/after evidence to its instructions and template`,
  );
  assert.ok(source.includes("npm run verify:exercise"), `${relative} does not identify the final verification command`);
  const evidenceTemplate = path.join(path.dirname(relative), "docs", "evidence-template.md");
  assert.ok(files.includes(evidenceTemplate), `${relative} is missing docs/evidence-template.md`);
  const evidenceSource = readFileSync(path.join(root, evidenceTemplate), "utf8");
  for (const artifact of artifacts.map((item) => path.basename(item))) {
    assert.ok(evidenceSource.includes(artifact), `${evidenceTemplate} does not explain ${artifact}`);
  }
}
const requiredArtifacts = [
  "10 Token Economics/scripts/economics-evidence.mjs",
  "10 Token Economics/scripts/economics-evidence.test.mjs",
  "10 Token Economics/scripts/capture-economics-check.mjs",
  "10 Token Economics/scripts/run-baseline.mjs",
  "10 Token Economics/scripts/replay-scope-regression.mjs",
  "10 Token Economics/exercise-01-reduce-context-without-losing-rules/docs/setup.md",
  "10 Token Economics/exercise-02-evaluate-cheaper-model-routing/docs/setup.md",
  "10 Token Economics/exercise-03-ship-a-small-change-without-a-rewrite/docs/setup.md",
  "09 Code Review/exercise-01-find-and-fix-review-risks/docs/setup.md",
  "09 Code Review/exercise-01-find-and-fix-review-risks/review-fix-app/evidence-contract.json",
  "09 Code Review/exercise-01-find-and-fix-review-risks/review-fix-app/scripts/verify-code-review-evidence.mjs",
  "09 Code Review/exercise-02-verify-review-feedback/docs/setup.md",
  "09 Code Review/exercise-02-verify-review-feedback/review-feedback-app/evidence-contract.json",
  "09 Code Review/exercise-02-verify-review-feedback/review-feedback-app/scripts/verify-code-review-evidence.mjs",
  "09 Code Review/exercise-03-improve-review-skill/docs/setup.md",
  "09 Code Review/exercise-03-improve-review-skill/review-skill-app/evidence-contract.json",
  "09 Code Review/exercise-03-improve-review-skill/review-skill-app/scripts/verify-code-review-evidence.mjs",
  "09 Code Review/scripts/code-review-evidence.mjs",
  "09 Code Review/scripts/capture-review-check.mjs",
  "09 Code Review/scripts/code-review-evidence.test.mjs",
  "09 Code Review/exercise-03-improve-review-skill/review-skill-app/scripts/run-review-session.test.mjs",
  "08 Evidence-led PRs/exercise-01-preserve-evidence-when-checks-fail/docs/pr-review-brief.md",
  "08 Evidence-led PRs/exercise-02-prove-a-feature-can-be-switched-off/docs/pr-review-brief.md",
  "08 Evidence-led PRs/exercise-03-block-releases-with-browser-checks/docs/pr-review-brief.md",
  "08 Evidence-led PRs/scripts/pr-review-evidence.mjs",
  "08 Evidence-led PRs/scripts/pr-review-evidence.test.mjs",
  "08 Evidence-led PRs/scripts/capture-proof.mjs",
  "08 Evidence-led PRs/exercise-01-preserve-evidence-when-checks-fail/docs/setup.md",
  "08 Evidence-led PRs/exercise-01-preserve-evidence-when-checks-fail/failed-check-evidence-app/evidence-contract.json",
  "08 Evidence-led PRs/exercise-01-preserve-evidence-when-checks-fail/failed-check-evidence-app/scripts/verify-review-evidence.mjs",
  "08 Evidence-led PRs/exercise-02-prove-a-feature-can-be-switched-off/docs/setup.md",
  "08 Evidence-led PRs/exercise-02-prove-a-feature-can-be-switched-off/feature-rollback-app/evidence-contract.json",
  "08 Evidence-led PRs/exercise-02-prove-a-feature-can-be-switched-off/feature-rollback-app/scripts/verify-review-evidence.mjs",
  "08 Evidence-led PRs/exercise-03-block-releases-with-browser-checks/docs/setup.md",
  "08 Evidence-led PRs/exercise-03-block-releases-with-browser-checks/browser-quality-app/evidence-contract.json",
  "08 Evidence-led PRs/exercise-03-block-releases-with-browser-checks/browser-quality-app/scripts/verify-review-evidence.mjs",
  "06 Multi-Agent Workflows/scripts/multi-agent-evidence.mjs",
  "06 Multi-Agent Workflows/scripts/multi-agent-evidence.test.mjs",
  "06 Multi-Agent Workflows/scripts/capture-command.mjs",
  "06 Multi-Agent Workflows/exercise-01-integrate-parallel-agent-features/docs/setup.md",
  "06 Multi-Agent Workflows/exercise-01-integrate-parallel-agent-features/parallel-feature-app/evidence-contract.json",
  "06 Multi-Agent Workflows/exercise-02-resolve-risks-with-specialist-reviews/docs/setup.md",
  "06 Multi-Agent Workflows/exercise-02-resolve-risks-with-specialist-reviews/specialist-review-app/evidence-contract.json",
  "06 Multi-Agent Workflows/exercise-03-assign-agent-work-without-conflicts/docs/setup.md",
  "06 Multi-Agent Workflows/exercise-03-assign-agent-work-without-conflicts/agent-task-board-app/evidence-contract.json",
  "05 Skill Packaging/scripts/packaging-evidence.mjs",
  "05 Skill Packaging/scripts/packaging-evidence.test.mjs",
  "05 Skill Packaging/exercise-01-build-a-reusable-agent-skill/release-notes-app/evidence-contract.json",
  "05 Skill Packaging/exercise-01-build-a-reusable-agent-skill/docs/setup.md",
  "05 Skill Packaging/exercise-02-fix-agent-skill-activation/skill-trigger-app/evidence-contract.json",
  "05 Skill Packaging/exercise-02-fix-agent-skill-activation/docs/setup.md",
  "05 Skill Packaging/exercise-03-prove-a-skill-is-ready-to-share/skill-benchmark-app/evidence-contract.json",
  "05 Skill Packaging/exercise-03-prove-a-skill-is-ready-to-share/docs/setup.md",
  "01 Toolchain Setup/exercise-01-prepare-project-for-agentic-development/agent-setup-app/scripts/verify-implementation.mjs",
  "01 Toolchain Setup/exercise-01-prepare-project-for-agentic-development/agent-setup-app/challenge-integrity.json",
  "01 Toolchain Setup/exercise-02-enforce-team-rules-with-agent-hooks/agent-hooks-app/tasks/release-readiness.md",
  "01 Toolchain Setup/exercise-02-enforce-team-rules-with-agent-hooks/agent-hooks-app/fixtures/production-customer-export.json",
  "01 Toolchain Setup/exercise-02-enforce-team-rules-with-agent-hooks/agent-hooks-app/fixtures/public-workflow-sample.json",
  "02 Spec Framing/exercise-01-unclear-feature-request-to-clear-specification/subscription-management-app/docs/stakeholder-notes.md",
  "02 Spec Framing/exercise-01-unclear-feature-request-to-clear-specification/subscription-management-app/docs/billing-constraints.md",
  "02 Spec Framing/exercise-01-unclear-feature-request-to-clear-specification/subscription-management-app/scripts/challenge-integrity.json",
  "02 Spec Framing/exercise-02-specification-to-verified-feature/team-collaboration-app/docs/support-incidents.md",
  "02 Spec Framing/exercise-02-specification-to-verified-feature/team-collaboration-app/src/legacy/quickInvite.ts",
  "02 Spec Framing/exercise-02-specification-to-verified-feature/team-collaboration-app/tests/invitationService.test.ts",
  "02 Spec Framing/exercise-02-specification-to-verified-feature/team-collaboration-app/scripts/challenge-integrity.json",
  "03 Context Engineering/exercise-01-session-handover-from-claude-to-codex/docs/evidence-template.md",
  "03 Context Engineering/exercise-01-session-handover-from-claude-to-codex/bugfix-context-app/incidents/INC-2047.md",
  "03 Context Engineering/exercise-01-session-handover-from-claude-to-codex/bugfix-context-app/docs/raw-session-history.md",
  "03 Context Engineering/exercise-01-session-handover-from-claude-to-codex/bugfix-context-app/docs/failed-test-output.txt",
  "03 Context Engineering/exercise-01-session-handover-from-claude-to-codex/bugfix-context-app/docs/current-sla-policy.md",
  "03 Context Engineering/exercise-01-session-handover-from-claude-to-codex/bugfix-context-app/docs/sla-rollout-proposal.md",
  "03 Context Engineering/exercise-01-session-handover-from-claude-to-codex/bugfix-context-app/scripts/run-incident-tests.mjs",
  "03 Context Engineering/exercise-01-session-handover-from-claude-to-codex/bugfix-context-app/scripts/verify-handoff.mjs",
  "03 Context Engineering/exercise-01-session-handover-from-claude-to-codex/bugfix-context-app/scripts/challenge-integrity.json",
  "07 Docs & Diagrams/exercise-04-extract-domain-model-from-entire-repo/docs/current-access-policy.md",
  "07 Docs & Diagrams/exercise-04-extract-domain-model-from-entire-repo/docs/legacy-rollout-notes.md",
  "07 Docs & Diagrams/exercise-04-extract-domain-model-from-entire-repo/product-rules-app/src/services/aiHistoryExportPolicy.ts",
  "07 Docs & Diagrams/exercise-04-extract-domain-model-from-entire-repo/product-rules-app/scripts/run-product-rule-tests.mjs",
  "07 Docs & Diagrams/exercise-04-extract-domain-model-from-entire-repo/product-rules-app/challenge-integrity.json",
  "03 Context Engineering/exercise-03-create-queryable-repo-context-for-agent/docs/current-metric-contract.md",
  "03 Context Engineering/exercise-03-create-queryable-repo-context-for-agent/billing-graph-app/src/billing/recognizedRevenue.ts",
  "03 Context Engineering/exercise-03-create-queryable-repo-context-for-agent/billing-graph-app/scripts/run-billing-tests.mjs",
  "03 Context Engineering/exercise-03-create-queryable-repo-context-for-agent/billing-graph-app/challenge-integrity.json",
  "04 Test Automation/exercise-01-stabilize-flaky-browser-tests/checkout-e2e-app/tests/e2e/starter-smoke.spec.ts",
  "04 Test Automation/exercise-01-stabilize-flaky-browser-tests/checkout-e2e-app/scripts/verify-checkout-submission.mjs",
  "04 Test Automation/exercise-01-stabilize-flaky-browser-tests/checkout-e2e-app/challenge-integrity.json",
  "04 Test Automation/exercise-02-repair-ui-states-with-test-first-development/case-dashboard-app/src/test/server.ts",
  "04 Test Automation/exercise-02-repair-ui-states-with-test-first-development/case-dashboard-app/src/App.acceptance.test.tsx",
  "04 Test Automation/exercise-02-repair-ui-states-with-test-first-development/case-dashboard-app/challenge-integrity.json",
  "04 Test Automation/exercise-03-catch-hidden-release-failures/docs/evidence-template.md",
  "04 Test Automation/exercise-03-catch-hidden-release-failures/scripts/previous-release-check.mjs",
  "04 Test Automation/exercise-03-catch-hidden-release-failures/scripts/verification-gate.mjs",
  "04 Test Automation/exercise-03-catch-hidden-release-failures/workflow-gate-app/scripts/verify-gate-contract.mjs",
  "04 Test Automation/exercise-03-catch-hidden-release-failures/workflow-rules-api/src/test/java/dev/agentic/exercise/workflow/WorkflowReleaseGateTest.java",
  "04 Test Automation/exercise-03-catch-hidden-release-failures/workflow-gate-app/challenge-integrity.json",
  "05 Skill Packaging/exercise-01-build-a-reusable-agent-skill/fixtures/release-history.bundle",
  "05 Skill Packaging/exercise-01-build-a-reusable-agent-skill/docs/monolithic-skill-draft.md",
  "05 Skill Packaging/exercise-01-build-a-reusable-agent-skill/docs/eval-scenarios.md",
  "05 Skill Packaging/exercise-01-build-a-reusable-agent-skill/release-notes-app/scripts/materialize-fixture.mjs",
  "05 Skill Packaging/exercise-01-build-a-reusable-agent-skill/release-notes-app/scripts/verify-extractor.mjs",
  "05 Skill Packaging/exercise-01-build-a-reusable-agent-skill/release-notes-app/challenge-integrity.json",
  "05 Skill Packaging/exercise-02-fix-agent-skill-activation/skill-trigger-app/evals/trigger-evals.json",
  "05 Skill Packaging/exercise-02-fix-agent-skill-activation/docs/evidence-template.md",
  "05 Skill Packaging/exercise-02-fix-agent-skill-activation/skill-trigger-app/fixtures/change-review-baseline/SKILL.md",
  "05 Skill Packaging/exercise-02-fix-agent-skill-activation/skill-trigger-app/scripts/score-trigger-results.mjs",
  "05 Skill Packaging/exercise-02-fix-agent-skill-activation/skill-trigger-app/scripts/test-trigger-evaluation.mjs",
  "05 Skill Packaging/exercise-02-fix-agent-skill-activation/skill-trigger-app/scripts/validate-change-review-skill.mjs",
  "05 Skill Packaging/exercise-02-fix-agent-skill-activation/skill-trigger-app/scripts/verify-trigger-submission.mjs",
  "05 Skill Packaging/exercise-02-fix-agent-skill-activation/skill-trigger-app/skills/change-review/SKILL.md",
  "05 Skill Packaging/exercise-02-fix-agent-skill-activation/skill-trigger-app/challenge-integrity.json",
  "05 Skill Packaging/exercise-03-prove-a-skill-is-ready-to-share/skill-benchmark-app/evals/evals.json",
  "05 Skill Packaging/exercise-03-prove-a-skill-is-ready-to-share/docs/evidence-template.md",
  "05 Skill Packaging/exercise-03-prove-a-skill-is-ready-to-share/docs/incident-output-contract.md",
  "05 Skill Packaging/exercise-03-prove-a-skill-is-ready-to-share/skill-benchmark-app/fixtures/incident-summary-starter/SKILL.md",
  "05 Skill Packaging/exercise-03-prove-a-skill-is-ready-to-share/skill-benchmark-app/scripts/aggregate-benchmark.mjs",
  "05 Skill Packaging/exercise-03-prove-a-skill-is-ready-to-share/skill-benchmark-app/scripts/grade-incident-output.mjs",
  "05 Skill Packaging/exercise-03-prove-a-skill-is-ready-to-share/skill-benchmark-app/scripts/package-skill.py",
  "05 Skill Packaging/exercise-03-prove-a-skill-is-ready-to-share/skill-benchmark-app/scripts/test-package-framework.py",
  "05 Skill Packaging/exercise-03-prove-a-skill-is-ready-to-share/skill-benchmark-app/scripts/verify-skill-package.py",
  "05 Skill Packaging/exercise-03-prove-a-skill-is-ready-to-share/skill-benchmark-app/skills/incident-summary/SKILL.md",
  "05 Skill Packaging/exercise-03-prove-a-skill-is-ready-to-share/skill-benchmark-app/challenge-integrity.json",
  "09 Code Review/exercise-01-find-and-fix-review-risks/fixtures/review-target.bundle",
  "09 Code Review/exercise-02-verify-review-feedback/fixtures/review-target.bundle",
  "06 Multi-Agent Workflows/exercise-01-integrate-parallel-agent-features/parallel-feature-app/submission-contract.json",
  "06 Multi-Agent Workflows/exercise-01-integrate-parallel-agent-features/docs/evidence-template.md",
  "06 Multi-Agent Workflows/exercise-01-integrate-parallel-agent-features/docs/integration-contract.md",
  "06 Multi-Agent Workflows/exercise-01-integrate-parallel-agent-features/parallel-feature-app/acceptance/lane-a.saved-filters.test.tsx",
  "06 Multi-Agent Workflows/exercise-01-integrate-parallel-agent-features/parallel-feature-app/acceptance/lane-b.sla-risk.test.tsx",
  "06 Multi-Agent Workflows/exercise-01-integrate-parallel-agent-features/parallel-feature-app/acceptance/lane-c.evidence-export.test.tsx",
  "06 Multi-Agent Workflows/exercise-01-integrate-parallel-agent-features/parallel-feature-app/scripts/worktree-verification.mjs",
  "06 Multi-Agent Workflows/exercise-01-integrate-parallel-agent-features/parallel-feature-app/scripts/test-worktree-verifier.mjs",
  "06 Multi-Agent Workflows/exercise-02-resolve-risks-with-specialist-reviews/specialist-review-app/submission-contract.json",
  "06 Multi-Agent Workflows/exercise-02-resolve-risks-with-specialist-reviews/docs/evidence-template.md",
  "06 Multi-Agent Workflows/exercise-02-resolve-risks-with-specialist-reviews/docs/remediation-contract.md",
  "06 Multi-Agent Workflows/exercise-02-resolve-risks-with-specialist-reviews/specialist-review-app/acceptance/security.review.test.tsx",
  "06 Multi-Agent Workflows/exercise-02-resolve-risks-with-specialist-reviews/specialist-review-app/acceptance/accessibility.review.test.tsx",
  "06 Multi-Agent Workflows/exercise-02-resolve-risks-with-specialist-reviews/specialist-review-app/acceptance/performance.review.test.ts",
  "06 Multi-Agent Workflows/exercise-02-resolve-risks-with-specialist-reviews/specialist-review-app/acceptance/testability.review.test.ts",
  "06 Multi-Agent Workflows/exercise-02-resolve-risks-with-specialist-reviews/specialist-review-app/scripts/measure-performance.mjs",
  "06 Multi-Agent Workflows/exercise-02-resolve-risks-with-specialist-reviews/specialist-review-app/scripts/specialist-review-verification.mjs",
  "06 Multi-Agent Workflows/exercise-02-resolve-risks-with-specialist-reviews/specialist-review-app/scripts/test-specialist-review-verifier.mjs",
  "06 Multi-Agent Workflows/exercise-03-assign-agent-work-without-conflicts/agent-task-board-app/submission-contract.json",
  "06 Multi-Agent Workflows/exercise-03-assign-agent-work-without-conflicts/docs/evidence-template.md",
  "06 Multi-Agent Workflows/exercise-03-assign-agent-work-without-conflicts/agent-task-board-app/acceptance/esc-120.inherited-severity.test.tsx",
  "06 Multi-Agent Workflows/exercise-03-assign-agent-work-without-conflicts/agent-task-board-app/scripts/board-verification.mjs",
  "06 Multi-Agent Workflows/exercise-03-assign-agent-work-without-conflicts/agent-task-board-app/scripts/control-plane-verification.mjs",
  "06 Multi-Agent Workflows/exercise-03-assign-agent-work-without-conflicts/agent-task-board-app/scripts/run-feature-check.mjs",
  "06 Multi-Agent Workflows/exercise-03-assign-agent-work-without-conflicts/agent-task-board-app/scripts/test-control-plane-verifier.mjs",
  "07 Docs & Diagrams/exercise-01-reverse-engineer-sequence-diagram/docs/legacy-workflow-description.md",
  "07 Docs & Diagrams/exercise-01-reverse-engineer-sequence-diagram/docs/diagram-contract.md",
  "07 Docs & Diagrams/exercise-01-reverse-engineer-sequence-diagram/docs/evidence-template.md",
  "07 Docs & Diagrams/exercise-01-reverse-engineer-sequence-diagram/workflow-reconstruction-app/scripts/diagram-verification.mjs",
  "07 Docs & Diagrams/exercise-01-reverse-engineer-sequence-diagram/workflow-reconstruction-app/scripts/mermaid-parser.mjs",
  "07 Docs & Diagrams/exercise-01-reverse-engineer-sequence-diagram/workflow-reconstruction-app/scripts/parse-diagrams.mjs",
  "07 Docs & Diagrams/exercise-01-reverse-engineer-sequence-diagram/workflow-reconstruction-app/scripts/trace-workflow.mjs",
  "07 Docs & Diagrams/exercise-01-reverse-engineer-sequence-diagram/workflow-reconstruction-app/scripts/test-diagram-verifier.mjs",
  "07 Docs & Diagrams/exercise-01-reverse-engineer-sequence-diagram/workflow-reconstruction-app/scripts/verify-diagrams.mjs",
  "07 Docs & Diagrams/exercise-02-generate-design-document-from-code/notification-mesh-app/scripts/run-routing-tests.mjs",
  "07 Docs & Diagrams/exercise-02-generate-design-document-from-code/docs/graph-contract.md",
  "07 Docs & Diagrams/exercise-02-generate-design-document-from-code/docs/evidence-template.md",
  "07 Docs & Diagrams/exercise-02-generate-design-document-from-code/notification-mesh-app/scripts/code-graph.mjs",
  "07 Docs & Diagrams/exercise-02-generate-design-document-from-code/notification-mesh-app/scripts/graph-verification.mjs",
  "07 Docs & Diagrams/exercise-02-generate-design-document-from-code/notification-mesh-app/scripts/test-code-graph.mjs",
  "07 Docs & Diagrams/exercise-02-generate-design-document-from-code/notification-mesh-app/scripts/test-graph-verifier.mjs",
  "07 Docs & Diagrams/exercise-03-payment-module-visualization/payment-workflow-app/scripts/run-webhook-tests.mjs",
  "07 Docs & Diagrams/exercise-03-payment-module-visualization/docs/diagram-contract.md",
  "07 Docs & Diagrams/exercise-03-payment-module-visualization/docs/evidence-template.md",
  "07 Docs & Diagrams/exercise-03-payment-module-visualization/payment-workflow-app/scripts/run-payment-tests.ts",
  "07 Docs & Diagrams/exercise-03-payment-module-visualization/payment-workflow-app/scripts/visualization-verification.mjs",
  "07 Docs & Diagrams/exercise-03-payment-module-visualization/payment-workflow-app/scripts/test-visualization-verifier.mjs",
  "08 Evidence-led PRs/exercise-01-preserve-evidence-when-checks-fail/fixtures/check-results.json",
  "08 Evidence-led PRs/exercise-01-preserve-evidence-when-checks-fail/fixtures/check-results-pass.json",
  "08 Evidence-led PRs/exercise-01-preserve-evidence-when-checks-fail/fixtures/check-results-multiple-failures.json",
  "08 Evidence-led PRs/exercise-01-preserve-evidence-when-checks-fail/fixtures/artifacts/checkout-smoke.txt",
  "08 Evidence-led PRs/exercise-01-preserve-evidence-when-checks-fail/fixtures/artifacts/checkout.svg",
  "08 Evidence-led PRs/exercise-01-preserve-evidence-when-checks-fail/docs/evidence-contract.md",
  "08 Evidence-led PRs/exercise-01-preserve-evidence-when-checks-fail/docs/action-pins.json",
  "08 Evidence-led PRs/exercise-01-preserve-evidence-when-checks-fail/failed-check-evidence-app/scripts/evidence-verification.mjs",
  "08 Evidence-led PRs/exercise-01-preserve-evidence-when-checks-fail/failed-check-evidence-app/scripts/test-evidence-verifier.mjs",
  "08 Evidence-led PRs/exercise-02-prove-a-feature-can-be-switched-off/feature-rollback-app/scripts/run-rollout-tests.mjs",
  "08 Evidence-led PRs/exercise-02-prove-a-feature-can-be-switched-off/docs/rollback-contract.md",
  "08 Evidence-led PRs/exercise-02-prove-a-feature-can-be-switched-off/docs/evidence-contract.md",
  "08 Evidence-led PRs/exercise-02-prove-a-feature-can-be-switched-off/feature-rollback-app/config/invoice-preview.json",
  "08 Evidence-led PRs/exercise-02-prove-a-feature-can-be-switched-off/feature-rollback-app/fixtures/rollout-scenarios.json",
  "08 Evidence-led PRs/exercise-02-prove-a-feature-can-be-switched-off/feature-rollback-app/scripts/rollout-harness.mjs",
  "08 Evidence-led PRs/exercise-02-prove-a-feature-can-be-switched-off/feature-rollback-app/scripts/capture-rollout-evidence.mjs",
  "08 Evidence-led PRs/exercise-02-prove-a-feature-can-be-switched-off/feature-rollback-app/scripts/run-rollback-drill.mjs",
  "08 Evidence-led PRs/exercise-02-prove-a-feature-can-be-switched-off/feature-rollback-app/scripts/rollout-verification.mjs",
  "08 Evidence-led PRs/exercise-02-prove-a-feature-can-be-switched-off/feature-rollback-app/scripts/test-rollout-verifier.mjs",
  "08 Evidence-led PRs/exercise-03-block-releases-with-browser-checks/fixtures/lighthouse-before.json",
  "08 Evidence-led PRs/exercise-03-block-releases-with-browser-checks/fixtures/a11y-before.json",
  "08 Evidence-led PRs/exercise-03-block-releases-with-browser-checks/fixtures/quality-thresholds.json",
  "08 Evidence-led PRs/exercise-03-block-releases-with-browser-checks/docs/gate-cli-contract.md",
  "08 Evidence-led PRs/exercise-03-block-releases-with-browser-checks/docs/evidence-contract.md",
  "08 Evidence-led PRs/exercise-03-block-releases-with-browser-checks/browser-quality-app/scripts/capture-browser-evidence.mjs",
  "08 Evidence-led PRs/exercise-03-block-releases-with-browser-checks/browser-quality-app/scripts/quality-verification.mjs",
  "08 Evidence-led PRs/exercise-03-block-releases-with-browser-checks/browser-quality-app/scripts/test-quality-verifier.mjs",
  "09 Code Review/exercise-01-find-and-fix-review-risks/review-fix-app/submission-contract.json",
  "09 Code Review/exercise-01-find-and-fix-review-risks/docs/finding-contract.md",
  "09 Code Review/exercise-01-find-and-fix-review-risks/review-fix-app/scripts/review-component-behavior.test.tsx",
  "09 Code Review/exercise-01-find-and-fix-review-risks/review-fix-app/scripts/run-protected-semgrep.mjs",
  "09 Code Review/exercise-01-find-and-fix-review-risks/review-fix-app/scripts/review-verification.mjs",
  "09 Code Review/exercise-01-find-and-fix-review-risks/review-fix-app/scripts/test-review-verifier.mjs",
  "09 Code Review/exercise-01-find-and-fix-review-risks/review-fix-app/scripts/replay-regression-tests.mjs",
  "09 Code Review/exercise-02-verify-review-feedback/review-feedback-app/submission-contract.json",
  "09 Code Review/exercise-02-verify-review-feedback/docs/review-brief.md",
  "09 Code Review/exercise-02-verify-review-feedback/docs/finding-contract.md",
  "09 Code Review/exercise-02-verify-review-feedback/review-feedback-app/src/services/workflowApi.acceptance.test.ts",
  "09 Code Review/exercise-02-verify-review-feedback/review-feedback-app/scripts/triage-verification.mjs",
  "09 Code Review/exercise-02-verify-review-feedback/review-feedback-app/scripts/test-triage-verifier.mjs",
  "09 Code Review/exercise-02-verify-review-feedback/review-feedback-app/scripts/replay-regression-tests.mjs",
  "09 Code Review/exercise-03-improve-review-skill/review-skill-app/submission-contract.json",
  "09 Code Review/exercise-03-improve-review-skill/docs/skill-contract.md",
  "09 Code Review/exercise-03-improve-review-skill/docs/evaluation-contract.md",
  "09 Code Review/exercise-03-improve-review-skill/review-skill-app/skills/regression-review/SKILL.md",
  "09 Code Review/exercise-03-improve-review-skill/review-skill-app/scripts/review-eval-verification.mjs",
  "09 Code Review/exercise-03-improve-review-skill/review-skill-app/scripts/score-review-eval.mjs",
  "09 Code Review/exercise-03-improve-review-skill/review-skill-app/scripts/test-review-eval-verifier.mjs",
  "09 Code Review/exercise-03-improve-review-skill/review-skill-app/scripts/verify-review-eval-submission.mjs",
  "09 Code Review/exercise-03-improve-review-skill/review-skill-app/scripts/run-review-session.mjs",
  "10 Token Economics/exercise-01-reduce-context-without-losing-rules/context-budget-app/scripts/run-context-tests.mjs",
  "10 Token Economics/exercise-01-reduce-context-without-losing-rules/context-budget-app/scripts/run-adapter-acceptance.mjs",
  "10 Token Economics/exercise-01-reduce-context-without-losing-rules/docs/adapter-refactor-request.md",
  "10 Token Economics/exercise-01-reduce-context-without-losing-rules/docs/ledger-contract.md",
  "10 Token Economics/exercise-01-reduce-context-without-losing-rules/docs/context-sources/AGENTS.md",
  "10 Token Economics/exercise-01-reduce-context-without-losing-rules/docs/context-sources/current-adapter-contract.md",
  "10 Token Economics/exercise-01-reduce-context-without-losing-rules/context-budget-app/scripts/context-verification.mjs",
  "10 Token Economics/exercise-01-reduce-context-without-losing-rules/context-budget-app/scripts/test-context-verifier.mjs",
  "10 Token Economics/exercise-01-reduce-context-without-losing-rules/context-budget-app/scripts/verify-context-submission.mjs",
  "10 Token Economics/exercise-01-reduce-context-without-losing-rules/context-budget-app/src/session/adaptSession.mjs",
  "10 Token Economics/exercise-02-evaluate-cheaper-model-routing/evals/routing-cases.json",
  "10 Token Economics/exercise-02-evaluate-cheaper-model-routing/evals/recorded-runs.json",
  "10 Token Economics/exercise-02-evaluate-cheaper-model-routing/docs/routing-policy-contract.md",
  "10 Token Economics/exercise-02-evaluate-cheaper-model-routing/docs/measurement-contract.md",
  "10 Token Economics/exercise-02-evaluate-cheaper-model-routing/model-routing-eval-app/scripts/routing-verification.mjs",
  "10 Token Economics/exercise-02-evaluate-cheaper-model-routing/model-routing-eval-app/scripts/score-routing-eval.mjs",
  "10 Token Economics/exercise-02-evaluate-cheaper-model-routing/model-routing-eval-app/scripts/test-routing-verifier.mjs",
  "10 Token Economics/exercise-02-evaluate-cheaper-model-routing/model-routing-eval-app/scripts/verify-routing-submission.mjs",
  "10 Token Economics/exercise-02-evaluate-cheaper-model-routing/model-routing-eval-app/src/routing/dispatchTasks.mjs",
  "10 Token Economics/exercise-03-ship-a-small-change-without-a-rewrite/scope-budget-app/scripts/run-migration-tests.mjs",
  "10 Token Economics/exercise-03-ship-a-small-change-without-a-rewrite/scope-budget-app/scripts/scope-verification.mjs",
  "10 Token Economics/exercise-03-ship-a-small-change-without-a-rewrite/scope-budget-app/scripts/test-scope-verifier.mjs",
  "10 Token Economics/exercise-03-ship-a-small-change-without-a-rewrite/scope-budget-app/src/migration/actionButtons.mjs",
  "11 Agentic Refactoring/exercise-01-simplify-legacy-rules-without-changing-behavior/docs/renewal-golden-cases.json",
  "11 Agentic Refactoring/exercise-01-simplify-legacy-rules-without-changing-behavior/behavior-refactor-app/scripts/refactor-verification.mjs",
  "11 Agentic Refactoring/exercise-01-simplify-legacy-rules-without-changing-behavior/behavior-refactor-app/scripts/test-refactor-verifier.mjs",
  "11 Agentic Refactoring/exercise-01-simplify-legacy-rules-without-changing-behavior/behavior-refactor-app/scripts/verify-refactor-submission.mjs",
  "11 Agentic Refactoring/exercise-02-move-one-checkout-route-out-of-legacy-code/docs/checkout-cases.json",
  "11 Agentic Refactoring/exercise-02-move-one-checkout-route-out-of-legacy-code/checkout-migration-app/src/checkout/legacyCheckout.mjs",
  "11 Agentic Refactoring/exercise-02-move-one-checkout-route-out-of-legacy-code/checkout-migration-app/scripts/strangler-verification.mjs",
  "11 Agentic Refactoring/exercise-02-move-one-checkout-route-out-of-legacy-code/checkout-migration-app/scripts/test-strangler-verifier.mjs",
  "11 Agentic Refactoring/exercise-02-move-one-checkout-route-out-of-legacy-code/checkout-migration-app/scripts/verify-strangler-submission.mjs",
  "11 Agentic Refactoring/exercise-03-extract-business-rules/docs/contract-observations.json",
  "11 Agentic Refactoring/exercise-03-extract-business-rules/workflow-rules-api/src/test/java/dev/agentic/exercise/workflow/WorkflowApiContractTest.java",
  "11 Agentic Refactoring/exercise-03-extract-business-rules/api-refactor-app/src/services/workflowDecisionContract.mjs",
  "11 Agentic Refactoring/exercise-03-extract-business-rules/api-refactor-app/scripts/run-client-contract.mjs",
  "11 Agentic Refactoring/exercise-03-extract-business-rules/api-refactor-app/scripts/run-rules-contract.mjs",
  "11 Agentic Refactoring/exercise-03-extract-business-rules/api-refactor-app/scripts/rules-refactor-verification.mjs",
  "11 Agentic Refactoring/exercise-03-extract-business-rules/api-refactor-app/scripts/test-rules-verifier.mjs",
  "11 Agentic Refactoring/exercise-03-extract-business-rules/api-refactor-app/scripts/verify-rules-submission.mjs",
  "12 Agentic Retrospective/exercise-01-stop-repeated-failed-commands/docs/session-metadata.json",
  "12 Agentic Retrospective/exercise-01-stop-repeated-failed-commands/docs/metric-contract.md",
  "12 Agentic Retrospective/exercise-01-stop-repeated-failed-commands/docs/replay-contract.md",
  "12 Agentic Retrospective/exercise-01-stop-repeated-failed-commands/docs/preflight-contract.md",
  "12 Agentic Retrospective/exercise-01-stop-repeated-failed-commands/retry-policy-app/scripts/retro-verification.mjs",
  "12 Agentic Retrospective/exercise-01-stop-repeated-failed-commands/retry-policy-app/scripts/test-retro-verifier.mjs",
  "12 Agentic Retrospective/exercise-01-stop-repeated-failed-commands/retry-policy-app/scripts/verify-retro-submission.mjs",
  "12 Agentic Retrospective/exercise-02-turn-corrections-into-agent-guidance/docs/correction-history.json",
  "12 Agentic Retrospective/exercise-02-turn-corrections-into-agent-guidance/docs/guidance-contract.md",
  "12 Agentic Retrospective/exercise-02-turn-corrections-into-agent-guidance/fixtures/filterPersistence.starter.mjs",
  "12 Agentic Retrospective/exercise-02-turn-corrections-into-agent-guidance/guidance-eval-app/scripts/rule-hardening-verification.mjs",
  "12 Agentic Retrospective/exercise-02-turn-corrections-into-agent-guidance/guidance-eval-app/scripts/test-rule-hardening-verifier.mjs",
  "12 Agentic Retrospective/exercise-02-turn-corrections-into-agent-guidance/guidance-eval-app/scripts/verify-rule-hardening-submission.mjs",
  "12 Agentic Retrospective/exercise-03-evaluate-a-workflow-change/docs/failure-traces.json",
  "12 Agentic Retrospective/exercise-03-evaluate-a-workflow-change/docs/benchmark-contract.md",
  "12 Agentic Retrospective/exercise-03-evaluate-a-workflow-change/docs/trace-analysis-contract.md",
  "12 Agentic Retrospective/exercise-03-evaluate-a-workflow-change/workflow-eval-app/fixtures/workflow-baseline.md",
  "12 Agentic Retrospective/exercise-03-evaluate-a-workflow-change/workflow-eval-app/scripts/workflow-grading.mjs",
  "12 Agentic Retrospective/exercise-03-evaluate-a-workflow-change/workflow-eval-app/scripts/workflow-submission-verification.mjs",
  "12 Agentic Retrospective/exercise-03-evaluate-a-workflow-change/workflow-eval-app/scripts/score-workflow-results.mjs",
  "12 Agentic Retrospective/exercise-03-evaluate-a-workflow-change/workflow-eval-app/scripts/write-workflow-patches.mjs",
  "12 Agentic Retrospective/exercise-03-evaluate-a-workflow-change/workflow-eval-app/scripts/test-workflow-verifier.mjs",
  "11 Agentic Refactoring/exercise-02-move-one-checkout-route-out-of-legacy-code/checkout-migration-app/scripts/run-checkout-tests.mjs",
  "11 Agentic Refactoring/exercise-03-extract-business-rules/workflow-rules-api/src/test/java/dev/agentic/exercise/workflow/WorkflowContractCharacterizationTest.java",
  "12 Agentic Retrospective/exercise-01-stop-repeated-failed-commands/docs/session-events.json",
  "12 Agentic Retrospective/exercise-01-stop-repeated-failed-commands/tasks/implementation-request.md",
  "12 Agentic Retrospective/exercise-01-stop-repeated-failed-commands/tasks/policy-217-replay.md",
  "12 Agentic Retrospective/exercise-02-turn-corrections-into-agent-guidance/tasks/proving-change.md",
  "12 Agentic Retrospective/exercise-03-evaluate-a-workflow-change/docs/action-schema.md",
  "12 Agentic Retrospective/exercise-03-evaluate-a-workflow-change/workflow-eval-app/evals/replay-cases.json",
  "scripts/capture-verification.mjs",
];
for (const relative of requiredArtifacts) assert.ok(existsSync(path.join(root, relative)), `Missing starter artifact: ${relative}`);

const packageFiles = files.filter((relative) => path.basename(relative) === "package.json");
assert.equal(packageFiles.length, 36, `Expected 36 package.json files, found ${packageFiles.length}`);
for (const relative of packageFiles) {
  const lockfile = path.join(path.dirname(relative), "package-lock.json");
  assert.ok(files.includes(lockfile), `${relative} is missing its committed package-lock.json`);
}
const exercisePackages = packageFiles.filter((relative) => relative !== "package.json");
assert.equal(exercisePackages.length, 35, `Expected 35 exercise packages, found ${exercisePackages.length}`);
for (const relative of exercisePackages) {
  const project = path.dirname(relative);
  for (const artifact of ["lab-contract.json", "challenge-integrity.json"]) {
    assert.ok(files.includes(path.join(project, artifact)), `${relative} is missing ${artifact}`);
  }
  const manifest = JSON.parse(readFileSync(path.join(root, relative), "utf8"));
  const integrity = JSON.parse(readFileSync(path.join(root, project, "challenge-integrity.json"), "utf8"));
  assert.ok(integrity.protectedFiles?.["../../../scripts/verify-submission-contract.mjs"], `${relative} must protect the shared submission verifier`);
  assert.ok(manifest.scripts?.["test:integrity"], `${relative} is missing test:integrity`);
  assert.ok(manifest.scripts?.["agent:check"]?.startsWith("npm run test:integrity"), `${relative} must run integrity first`);
  assert.ok(manifest.scripts?.["verify:implementation"], `${relative} is missing verify:implementation`);
  assert.ok(manifest.scripts?.["verify:submission"], `${relative} is missing verify:submission`);
  assert.ok(manifest.scripts?.["verify:exercise:core"], `${relative} is missing verify:exercise:core`);
  assert.ok(manifest.scripts?.["verify:exercise"], `${relative} is missing verify:exercise`);
  assert.ok(manifest.scripts["verify:exercise:core"].includes("agent:check"), `${relative} verify:exercise:core must run agent:check`);
  assert.ok(manifest.scripts["verify:exercise:core"].includes("verify:implementation"), `${relative} verify:exercise:core must run verify:implementation`);
  assert.ok(manifest.scripts["verify:exercise:core"].includes("verify:submission"), `${relative} verify:exercise:core must run verify:submission`);
  assert.equal(manifest.scripts["verify:exercise"], "node ../../../scripts/run-clean-verification.mjs", `${relative} verify:exercise must use the shared clean-verification guard`);
  const submissionContractPath = path.join(root, project, "submission-contract.json");
  if (existsSync(submissionContractPath)) {
    const submissionContract = JSON.parse(readFileSync(submissionContractPath, "utf8"));
    const requiredPaths = new Set((submissionContract.requiredFiles ?? []).map((item) => item.path));
    const submissionScripts = manifest.scripts["verify:submission"] + "\n" + files.filter((file) => file.startsWith(path.join(project, "scripts") + path.sep) && file.endsWith(".mjs")).map((file) => readFileSync(path.join(root, file), "utf8")).join("\n");
    const requiresComparableEvidence = !["observation", "handover", "workflow"].includes(submissionContract.evidenceMode) && ["evidence/before.md", "evidence/after.md", "evidence/comparison.md"].every((required) => requiredPaths.has(required));
    if (requiresComparableEvidence) {
      assert.ok(submissionScripts.includes("comparable-evidence.mjs"), `${relative} requires matched before and after evidence but does not call the shared verifier`);
    }
    if (submissionContract.evidenceMode === "workflow") {
      assert.ok(manifest.scripts["verify:submission"].includes("multi-agent-evidence.mjs"), relative + " must verify workflow evidence");
      const evidenceContract = JSON.parse(readFileSync(path.join(root, project, "evidence-contract.json"), "utf8"));
      assert.equal(evidenceContract.mode, "observation");
      assert.ok(manifest.scripts["evidence:verify"].includes("workflow:verify") && !manifest.scripts["evidence:verify"].includes("test:submission"), relative + " must capture workflow checks before requiring the final capture");
      const exerciseRoot = path.dirname(path.join(root, project));
      const readme = readFileSync(path.join(exerciseRoot, "README.md"), "utf8");
      const setup = readFileSync(path.join(exerciseRoot, "docs/setup.md"), "utf8");
      const evidence = readFileSync(path.join(exerciseRoot, "docs/evidence-template.md"), "utf8");
      for (const artifact of [...evidenceContract.artifacts, "evidence/manifest.json", "evidence/commands/verify.txt"]) assert.ok(requiredPaths.has(artifact), relative + " does not require " + artifact);
      for (const skill of evidenceContract.requiredSkills) assert.ok(readme.includes(skill.name) && setup.includes(skill.name), relative + " must name its workflow skills");
      for (const artifact of ["evidence/skill-use.md", "evidence/skill-session.txt", "evidence/agent-sessions.json"]) assert.ok(evidence.includes(artifact), relative + " must explain " + artifact);
      for (const helper of ["../../scripts/multi-agent-evidence.mjs", "../../scripts/capture-command.mjs", "../../../scripts/capture-verification.mjs", "../../../scripts/context-document-evidence.mjs"]) assert.ok(integrity.protectedFiles[helper], relative + " must protect " + helper);
    }
    if (project.startsWith("08 Evidence-led PRs")) {
      assert.equal(submissionContract.evidenceMode, "observation", relative + " must use observed before and after evidence");
      const proofContract = JSON.parse(readFileSync(path.join(root, project, "evidence-contract.json"), "utf8"));
      assert.ok(manifest.scripts["proof:capture"].includes("capture-proof.mjs"), relative + " must capture actual domain proof");
      assert.ok(requiredPaths.has("evidence/commands/checks.txt"), relative + " must retain focused proof output");
      assert.ok(requiredPaths.has("evidence/commands/verify.txt"), relative + " must retain final verification output");
      assert.ok(requiredPaths.has("evidence/review-response.md"), relative + " must require a reviewer response");
      assert.ok(proofContract.outputs.some((output) => output.path === "evidence/review-response.md"), relative + " must seal the reviewer response");
      assert.ok(proofContract.outputs.find((output) => output.path === "evidence/pr-summary.md")?.headings.includes("Evidence map"), relative + " must map PR claims to proof");
      const reviewBrief = readFileSync(path.resolve(root, project, "../docs/pr-review-brief.md"), "utf8");
      assert.ok(proofContract.reviewCommentId && reviewBrief.includes(proofContract.reviewCommentId), relative + " must identify its supplied review comment");
      assert.ok(integrity.protectedFiles["../docs/pr-review-brief.md"], relative + " must protect the review brief");
      for (const helper of ["../../scripts/pr-review-evidence.mjs", "../../scripts/capture-proof.mjs", "../../../scripts/context-document-evidence.mjs", "../../../scripts/capture-verification.mjs"]) assert.ok(integrity.protectedFiles[helper], relative + " must protect " + helper);
      assert.ok(proofContract.extraEvidence.includes("evidence/commands/checks.txt"), relative + " must seal actual proof output");
      assert.ok(!proofContract.extraEvidence.includes("evidence/commands/verify.txt"), relative + " must capture final verification after sealing");
    }
    if (project.startsWith("09 Code Review")) {
      assert.equal(submissionContract.evidenceMode, "observation", relative + " must use observed review evidence");
      const reviewContract = JSON.parse(readFileSync(path.join(root, project, "evidence-contract.json"), "utf8"));
      assert.ok(manifest.scripts["proof:capture"].includes("capture-review-check.mjs"), relative + " must capture actual review checks");
      for (const helper of ["../../scripts/code-review-evidence.mjs", "../../scripts/capture-review-check.mjs", "../../../scripts/context-document-evidence.mjs", "../../../scripts/capture-verification.mjs"]) assert.ok(integrity.protectedFiles[helper], relative + " must protect " + helper);
      for (const check of Object.values(reviewContract.checkCaptures)) assert.ok(reviewContract.extraEvidence.includes(check.path) && requiredPaths.has(check.path), relative + " must seal its captured review checks");
      assert.ok(!reviewContract.extraEvidence.includes("evidence/commands/verify.txt"), relative + " must capture final verification after sealing");
      if (reviewContract.reviewSessionField) for (const artifact of ["evidence/review-session.txt", "evidence/recheck-session.txt", "evidence/recheck.json"]) assert.ok(requiredPaths.has(artifact), relative + " must retain independent review proof");
      if (project.endsWith("review-skill-app")) assert.ok(!integrity.protectedFiles["skills/regression-review/SKILL.md"], relative + " must allow learners to improve the skill");
    }
    if (project.startsWith("10 Token Economics")) {
      assert.equal(submissionContract.evidenceMode, "observation", relative + " must use observed economics evidence");
      const economics = JSON.parse(readFileSync(path.join(root, project, "evidence-contract.json"), "utf8"));
      assert.ok(manifest.scripts["proof:capture"].includes("capture-economics-check.mjs"), relative + " must capture actual economics checks");
      assert.ok(manifest.scripts["evidence:verify"].includes("economics:check"), relative + " must rerun the domain checks before final capture");
      for (const helper of ["../../scripts/economics-evidence.mjs", "../../scripts/capture-economics-check.mjs", "../../scripts/run-baseline.mjs", "../../../scripts/context-document-evidence.mjs", "../../../scripts/capture-verification.mjs"]) assert.ok(integrity.protectedFiles[helper], relative + " must protect " + helper);
      for (const check of Object.values(economics.checkCaptures)) assert.ok(economics.extraEvidence.includes(check.path) && requiredPaths.has(check.path), relative + " must seal its captured checks");
      for (const file of economics.allowedSourceFiles) {
        const appPath = file.slice(path.basename(project).length + 1);
        assert.ok(!integrity.protectedFiles[appPath], relative + " must leave the learner implementation editable: " + file);
      }
      assert.ok(!economics.extraEvidence.includes("evidence/commands/verify.txt"), relative + " must capture final verification after sealing");
      assert.ok(economics.starterSources && Object.keys(economics.starterSources).length, relative + " must bind baseline evidence to the actual starter");
    }
    if (project.startsWith("11 Agentic Refactoring")) {
      assert.equal(submissionContract.evidenceMode, "observation", relative + " must use observed refactoring evidence");
      const phases = JSON.parse(readFileSync(path.join(root, project, "evidence-contract.json"), "utf8"));
      for (const helper of ["../../../scripts/challenge-phase-evidence.mjs", "../../../scripts/capture-challenge-check.mjs", "../../../scripts/test-challenge-phase-evidence.mjs", "../../../scripts/context-document-evidence.mjs", "../../../scripts/capture-verification.mjs"]) assert.ok(integrity.protectedFiles[helper], relative + " must protect " + helper);
      assert.ok(manifest.scripts["proof:capture"].includes("capture-challenge-check.mjs"), relative + " must capture actual phase checks");
      for (const check of Object.values(phases.checkCaptures)) assert.ok(phases.extraEvidence.includes(check.path) && requiredPaths.has(check.path), relative + " must seal phase checks");
      for (const file of [...phases.productionFiles, ...phases.preparedFiles]) {
        const appPath = path.relative(path.join(root, project), path.resolve(root, project, "..", file)).split(path.sep).join("/");
        assert.ok(!integrity.protectedFiles[appPath], relative + " must leave learner files editable: " + file);
      }
      assert.ok(!phases.extraEvidence.includes("evidence/commands/verify.txt"), relative + " must capture final verification after sealing");
      assert.ok(Object.keys(phases.starterSources).length, relative + " must bind checks to the supplied starter");
    }
    if (project.startsWith("12 Agentic Retrospective")) {
      assert.equal(submissionContract.evidenceMode, "observation", relative + " must use sealed retrospective evidence");
      const retrospective = JSON.parse(readFileSync(path.join(root, project, "evidence-contract.json"), "utf8"));
      for (const helper of ["../../scripts/retrospective-evidence.mjs", "../../../scripts/challenge-phase-evidence.mjs", "../../../scripts/capture-challenge-check.mjs", "../../../scripts/context-document-evidence.mjs", "../../../scripts/capture-verification.mjs"]) assert.ok(integrity.protectedFiles[helper], relative + " must protect " + helper);
      for (const check of Object.values(retrospective.checkCaptures)) assert.ok(retrospective.extraEvidence.includes(check.path) && requiredPaths.has(check.path), relative + " must seal captured checks");
      for (const file of retrospective.productionFiles) {
        const appPath = path.relative(path.join(root, project), path.resolve(root, project, "..", file)).split(path.sep).join("/");
        assert.ok(!integrity.protectedFiles[appPath], relative + " must leave learner files editable: " + file);
      }
      if (retrospective.study === "guidance") {
        assert.ok(manifest.scripts["rules:compare"].includes("comparable-evidence.mjs"), relative + " must preserve matched guidance experiments");
        for (const file of ["evidence/before-session.txt", "evidence/after-session.txt"]) assert.ok(retrospective.extraEvidence.includes(file), relative + " must seal original sessions");
      }
      if (retrospective.study === "workflow") {
        assert.equal(retrospective.extraEvidence.filter((file) => file.startsWith("evidence/raw/")).length, 48, relative + " must seal all 48 raw captures");
        assert.ok(manifest.scripts["workflow:run"].includes("run-workflow-batch.mjs"), relative + " must provide the complete batch recorder");
      }
      assert.ok(!retrospective.extraEvidence.includes("evidence/commands/verify.txt"), relative + " must capture final verification after sealing");
    }
    if (["observation", "handover"].includes(submissionContract.evidenceMode)) {
      assert.ok(submissionScripts.includes("context-document-evidence.mjs"), `${relative} must verify its observation evidence`);
      const evidenceContract = JSON.parse(readFileSync(path.join(root, project, "evidence-contract.json"), "utf8"));
      if (evidenceContract.requiredSkills?.length) {
        const exerciseRoot = path.dirname(path.join(root, project));
        const readme = readFileSync(path.join(exerciseRoot, "README.md"), "utf8");
        const setup = readFileSync(path.join(exerciseRoot, "docs/setup.md"), "utf8");
        const evidence = readFileSync(path.join(exerciseRoot, "docs/evidence-template.md"), "utf8");
        for (const file of ["evidence/skill-use.md", "evidence/skill-session.txt"]) {
          assert.ok(evidenceContract.extraEvidence?.includes(file), `${relative} must seal ${file}`);
          assert.ok(evidence.includes(file), `${relative} must explain ${file}`);
        }
        for (const skill of evidenceContract.requiredSkills) {
          assert.ok(readme.includes(skill.name) && setup.includes(skill.name), `${relative} must name and explain ${skill.name}`);
          assert.ok(setup.includes(skill.source.replace("https://github.com/", "")), `${relative} must link the skill source`);
        }
      }
      for (const artifact of [...evidenceContract.outputs.map((item) => item.path), "evidence/source-audit.json", "evidence/manifest.json", ...(evidenceContract.extraEvidence ?? [])]) {
        assert.ok(requiredPaths.has(artifact), `${relative} does not require ${artifact}`);
      }
    }
    const requiresCapturedExitCode = (submissionContract.requiredFiles ?? []).some((item) =>
      item.path?.startsWith("evidence/commands/") && item.includeAll?.includes("exit code: 0"),
    );
    if (requiresCapturedExitCode) {
      assert.equal(manifest.scripts["evidence:capture"], "node ../../../scripts/capture-verification.mjs", `${relative} must use the shared verification capture`);
      assert.ok(manifest.scripts["evidence:verify"], `${relative} must provide a non-circular evidence:verify command`);
      assert.ok(!manifest.scripts["evidence:verify"].includes("verify:submission") && !manifest.scripts["evidence:verify"].includes("evidence:capture"), `${relative} evidence:verify must not call submission verification or capture itself`);
      for (const item of submissionContract.requiredFiles ?? []) {
        if (!item.path?.startsWith("evidence/commands/") || !item.includeAll?.includes("exit code: 0")) continue;
        for (const marker of ["Command: npm run evidence:verify", "Repository commit:", "Started at:", "Finished at:"]) {
          assert.ok(item.includeAll.includes(marker), `${relative} command transcript ${item.path} must require ${marker}`);
        }
      }
    }
  }
}
assert.equal(readFileSync(path.join(root, ".nvmrc"), "utf8").trim(), "22.12.0", "Unexpected Node version");
assert.equal(readFileSync(path.join(root, ".java-version"), "utf8").trim(), "21", "Unexpected Java version");

const pomFiles = files.filter((relative) => path.basename(relative) === "pom.xml");
assert.equal(pomFiles.length, 2, `Expected two Maven projects, found ${pomFiles.length}`);
for (const relative of pomFiles) {
  const project = path.dirname(relative);
  for (const wrapperFile of ["mvnw", "mvnw.cmd", path.join(".mvn", "wrapper", "maven-wrapper.jar"), path.join(".mvn", "wrapper", "maven-wrapper.properties")]) {
    assert.ok(files.includes(path.join(project, wrapperFile)), `${relative} is missing ${wrapperFile}`);
  }
}

console.log(`Verified ${readmes.length} exercise contracts, ${requiredArtifacts.length} real starter artifacts, ${packageFiles.length} npm lockfiles, and ${pomFiles.length} Maven wrappers.`);
