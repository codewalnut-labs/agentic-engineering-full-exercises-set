**Exercise 02**

# Feature Flag Rollback Proof

**Goal:** Put the risky UI path behind a feature flag and prove flag-on, flag-off, bad-config, observability, and rollback behavior.

**Outcome:** The feature can be enabled, disabled, observed, and rolled back without changing code after review.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/flag-brief.md](./docs/flag-brief.md)
- [docs/rollback-template.md](./docs/rollback-template.md)

From the repository root, open the main starter:

```bash
cd "08 Evidence-led PRs/exercise-02-feature-flag-rollback-proof/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [08. Evidence-led PRs practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#08-evidence-led-prs)
- [Feature Toggles by Martin Fowler](https://martinfowler.com/articles/feature-toggles.html)
- [LaunchDarkly feature flag concepts](https://docs.launchdarkly.com/home/flags)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/flag-brief.md`, `docs/rollback-template.md`, and the risky UI path, then identify the flag boundary and rollback trigger.
2. Review the boundary and ensure flag-off preserves current behavior, data shape, and user expectations.
3. Implement the feature behind a clear flag with default, enabled, disabled, missing-config, and invalid-config behavior.
4. Add tests or smoke checks for flag on, flag off, invalid configuration, missing configuration, and rollback path.
5. Add telemetry, logging, or visible diagnostic evidence that proves which path a user took without exposing sensitive data.
6. Fill the rollback template for this feature and run a rollback rehearsal.
7. Run a clean-context rollback rehearsal where a new agent follows the template and proves the feature can be disabled safely.

## Deliver

- Feature flag implementation with safe default and documented ownership.
- Rollback template filled for this feature.
- Tests or smoke evidence for flag on, flag off, invalid config, missing config, and rollback states.
- Evidence note with telemetry or observable proof, final command output, and residual launch risk.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Flag-off behavior matches the pre-feature user path.
- Flag-on behavior is observable and covered by checks.
- Missing and invalid config fail safely.
- Rollback steps are specific enough to execute without redesigning the feature.
- A fresh agent can explain how to disable the feature and what evidence proves it worked.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
