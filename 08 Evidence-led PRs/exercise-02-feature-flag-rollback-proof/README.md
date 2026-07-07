**Exercise 02**

# Feature Flag Rollback Proof

**Goal:** Prove that a risky UI feature is gated, observable, and reversible before a reviewer sees the PR.

**Outcome:** A risky agent-written feature is gated, observable, and reversible.

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

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [08. Evidence-led PRs practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#08-evidence-led-prs)
- [Feature Toggles by Martin Fowler](https://martinfowler.com/articles/feature-toggles.html)
- [LaunchDarkly feature flag concepts](https://docs.launchdarkly.com/home/flags)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/flag-brief.md`, `docs/rollback-template.md`, and the risky UI path to identify the flag boundary and rollback trigger.
2. Review the proposed boundary and ensure the off state preserves current behavior, data shape, and user expectations.
3. Have the agent implement the feature behind a clear flag with default, enabled, disabled, and missing-config behavior.
4. Add tests or smoke checks for flag on, flag off, invalid configuration, and rollback path.
5. Ask the agent to add telemetry or observable evidence that proves which path a user took without exposing sensitive data.
6. Run a clean-context rollback rehearsal where a new agent follows the template and proves the feature can be disabled safely.

## Deliver

- Feature flag implementation with safe default and documented ownership.
- Rollback template filled for this feature.
- Tests or smoke evidence for on, off, and rollback states.
- Evidence note with telemetry or observable proof and residual launch risk.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Flag-off behavior matches the pre-feature user path.
- Flag-on behavior is observable and covered by checks.
- Rollback steps are specific enough to execute without redesigning the feature.
- A fresh agent can explain how to disable the feature and what evidence proves it worked.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
