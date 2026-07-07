**Exercise 03**

# Skill and Hook Improvement Loop

**Goal:** Run a mini retro on a flawed team skill and hook setup, then revise both to reduce future rework.

**Outcome:** A flawed skill and hook setup is improved using real session evidence and evals.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "12 Agentic Retrospective/exercise-03-skill-and-hook-improvement-loop/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/flawed-skill.md](./docs/flawed-skill.md)
- [docs/hook-failures.md](./docs/hook-failures.md)

## Use These Practices

- [12. Agentic Retrospective practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#12-agentic-retrospective)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Run the provided flawed skill/hook against seed scenarios and capture failures.
4. Improve trigger descriptions, references, policy logic, and output shape.
5. Add an eval harness that compares before and after behavior.
6. Document only the decisions needed for future maintainers.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Revised skill and hook implementation.
- Before/after eval harness and results.
- Any starter code changes needed to exercise the workflow.
- Maintenance notes for future retros.

## Verify

Run at least:

```bash
cd "12 Agentic Retrospective/exercise-03-skill-and-hook-improvement-loop/starter-react" && npm test
cd "12 Agentic Retrospective/exercise-03-skill-and-hook-improvement-loop/starter-react" && npm run agent:check
```

Done when:
- before/after eval
- hook policy tests
- trigger negative cases
- maintenance note
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
