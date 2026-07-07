**Exercise 02**

# Feature Flag Rollback Proof

**Goal:** Prove that a risky UI feature is gated, observable, and reversible before a reviewer sees the PR.

**Outcome:** A risky agent-written feature is gated, observable, and reversible.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "08 Evidence-led PRs/exercise-02-feature-flag-rollback-proof/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/flag-brief.md](./docs/flag-brief.md)
- [docs/rollback-template.md](./docs/rollback-template.md)

## Use These Practices

- [08. Evidence-led PRs practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#08-evidence-led-prs)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Implement a real feature flag around the risky UI behavior.
4. Add telemetry/audit events for enabled, disabled, and rollback paths.
5. Build a rollback script or documented command that changes behavior without a deploy.
6. Test both flag states and the failure path.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Feature flag implementation in code/config.
- Telemetry or audit behavior.
- Tests for on/off/rollback states.
- Rollback evidence suitable for a PR.

## Verify

Run at least:

```bash
cd "08 Evidence-led PRs/exercise-02-feature-flag-rollback-proof/starter-react" && npm test
cd "08 Evidence-led PRs/exercise-02-feature-flag-rollback-proof/starter-react" && npm run agent:check
```

Done when:
- flag on/off tests
- rollback script
- telemetry assertion
- PR evidence capture
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
