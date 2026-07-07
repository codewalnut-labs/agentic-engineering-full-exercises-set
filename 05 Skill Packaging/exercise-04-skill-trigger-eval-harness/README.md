**Exercise 04**

# Skill Trigger Eval Harness

**Goal:** Build an eval harness that scores whether team skills trigger, run the right steps, and produce the expected output shape.

**Outcome:** A skill is treated like production workflow code: trigger cases, process checks, output checks, and regression evidence exist before rollout.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "05 Skill Packaging/exercise-04-skill-trigger-eval-harness/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/eval-plan.md](./docs/eval-plan.md)
- [docs/trigger-cases.md](./docs/trigger-cases.md)

## Use These Practices

- [05. Skill Packaging practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#05-skill-packaging)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `skill evals / skill optimizer`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Inspect the bundled skill and find trigger ambiguity.
4. Write eval cases before changing the skill.
5. Patch the skill metadata and instructions.
6. Run the harness and capture the regression report.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Updated SKILL.md with precise use-when and do-not-use boundaries.
- Eval cases for trigger and output behavior.
- Runnable harness or script check.
- Versioned report showing improvement.

## Verify

Run at least:

```bash
cd "05 Skill Packaging/exercise-04-skill-trigger-eval-harness/starter-react" && npm test
cd "05 Skill Packaging/exercise-04-skill-trigger-eval-harness/starter-react" && npm run agent:check
```

Done when:
- Trigger cases include positive, negative, and ambiguous prompts.
- Process checks verify commands, touched files, and required artifacts.
- Output checks validate schema and reviewer-ready language.
- The harness produces a versioned pass/fail report.
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
