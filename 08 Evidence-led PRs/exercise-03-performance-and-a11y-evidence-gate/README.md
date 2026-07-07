**Exercise 03**

# Performance and A11y Evidence Gate

**Goal:** Attach performance and accessibility evidence to a UI change so reviewers can judge risk quickly.

**Outcome:** Performance and accessibility are measured and improved before review.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "08 Evidence-led PRs/exercise-03-performance-and-a11y-evidence-gate/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/quality-gate-brief.md](./docs/quality-gate-brief.md)
- [docs/sample-reports.md](./docs/sample-reports.md)

## Use These Practices

- [08. Evidence-led PRs practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#08-evidence-led-prs)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Run or add automated performance and accessibility checks relevant to the starter.
4. Fix at least one real issue discovered by those checks.
5. Capture before/after evidence.
6. Fail the gate when regressions exceed the chosen threshold.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Performance/a11y check configuration.
- Code fixes for measured issues.
- Before/after reports or screenshots.
- Thresholds documented in the PR evidence pack.

## Verify

Run at least:

```bash
cd "08 Evidence-led PRs/exercise-03-performance-and-a11y-evidence-gate/starter-react" && npm test
cd "08 Evidence-led PRs/exercise-03-performance-and-a11y-evidence-gate/starter-react" && npm run agent:check
```

Done when:
- a11y check
- performance budget
- before/after report
- evidence pack link
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
