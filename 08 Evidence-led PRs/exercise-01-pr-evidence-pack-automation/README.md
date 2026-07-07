**Exercise 01**

# PR Evidence Pack Automation

**Goal:** Create a PR evidence pack that automatically gathers test output, build proof, screenshots, and residual risks.

**Outcome:** A PR can explain itself with automated proof instead of reviewer guesswork.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "08 Evidence-led PRs/exercise-01-pr-evidence-pack-automation/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/evidence-fixtures.md](./docs/evidence-fixtures.md)
- [docs/pr-brief.md](./docs/pr-brief.md)

## Use These Practices

- [08. Evidence-led PRs practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#08-evidence-led-prs)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Implement an evidence pack script that runs checks, captures output, and writes a PR-ready summary.
4. Add or repair tests so the evidence pack is meaningful.
5. Include screenshots, coverage, traces, or logs where useful for the starter.
6. Make failure states visible rather than silently swallowed.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Evidence pack generator.
- Updated tests/checks feeding the pack.
- Generated artifact folder with logs and summary.
- PR template section wired to the generated evidence.

## Verify

Run at least:

```bash
cd "08 Evidence-led PRs/exercise-01-pr-evidence-pack-automation/starter-react" && npm test
cd "08 Evidence-led PRs/exercise-01-pr-evidence-pack-automation/starter-react" && npm run agent:check
```

Done when:
- evidence generator
- artifact path check
- PR template fill
- failure-output capture
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
