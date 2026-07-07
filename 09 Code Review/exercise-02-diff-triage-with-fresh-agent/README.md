**Exercise 02**

# Diff Triage With Fresh Agent

**Goal:** Use a fresh review pass to find what the implementing agent missed, then decide which findings are merge blockers.

**Outcome:** A fresh agent review produces signal, and the accountable owner decides what actually blocks merge.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "09 Code Review/exercise-02-diff-triage-with-fresh-agent/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/implementer-notes.md](./docs/implementer-notes.md)
- [docs/review-diff.md](./docs/review-diff.md)
- [pr/review-target.diff](./pr/review-target.diff)

## Use These Practices

- [09. Code Review practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#09-code-review)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Ask a fresh model/session to review the diff with explicit NFR checks.
4. Verify each finding manually against the surrounding code.
5. Fix true merge blockers in code and tests.
6. Record why noisy findings were dismissed.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Fresh-agent review prompt and findings.
- Code/test fixes for verified blockers.
- Triage evidence separating signal from noise.
- Final merge confidence note.

## Verify

Run at least:

```bash
cd "09 Code Review/exercise-02-diff-triage-with-fresh-agent/starter-react" && npm test
cd "09 Code Review/exercise-02-diff-triage-with-fresh-agent/starter-react" && npm run agent:check
```

Done when:
- fresh-agent finding verification
- cache regression test
- human triage
- merge confidence note
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
