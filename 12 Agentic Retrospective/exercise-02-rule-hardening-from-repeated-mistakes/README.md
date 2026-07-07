**Exercise 02**

# Rule Hardening From Repeated Mistakes

**Goal:** Turn repeated agent corrections into durable AGENTS.md rules, skills, or hooks with clear trigger criteria.

**Outcome:** Repeated agent mistakes become durable rules, skills, or hooks with tests.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "12 Agentic Retrospective/exercise-02-rule-hardening-from-repeated-mistakes/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/agents-md-before.md](./docs/agents-md-before.md)
- [docs/correction-history.md](./docs/correction-history.md)

## Use These Practices

- [12. Agentic Retrospective practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#12-agentic-retrospective)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Cluster repeated corrections from the provided history into root causes.
4. Choose the right fix type: rule, context file, skill, hook, or human habit.
5. Implement at least two durable fixes.
6. Add tests or simulations proving the fixes catch the repeated mistake.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Updated rules/context/skill/hook files.
- Hook or policy tests where applicable.
- Correction history mapped to fixes.
- Re-run evidence on seed mistakes.

## Verify

Run at least:

```bash
cd "12 Agentic Retrospective/exercise-02-rule-hardening-from-repeated-mistakes/starter-react" && npm test
cd "12 Agentic Retrospective/exercise-02-rule-hardening-from-repeated-mistakes/starter-react" && npm run agent:check
```

Done when:
- correction clustering
- rule specificity test
- hook simulation
- re-run seed mistakes
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
