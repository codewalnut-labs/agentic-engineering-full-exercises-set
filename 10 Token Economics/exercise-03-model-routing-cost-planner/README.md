**Exercise 03**

# Model Routing Cost Planner

**Goal:** Design a model and effort routing policy for a team using agents across planning, coding, reviews, and retros.

**Outcome:** A team routing policy chooses model and effort by task risk, not habit.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "10 Token Economics/exercise-03-model-routing-cost-planner/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/cost-dashboard-sample.md](./docs/cost-dashboard-sample.md)
- [docs/team-usage-scenarios.md](./docs/team-usage-scenarios.md)

## Use These Practices

- [10. Token Economics practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#10-token-economics)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Encode model/effort routing rules for planning, routine edits, tests, reviews, and retros.
4. Build a small estimator or simulation using the provided scenarios and usage logs.
5. Run the estimator against at least three advanced-engineering workflows.
6. Tune the policy when cost, latency, or risk looks wrong.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Routing policy in config or code.
- Cost/latency estimator script.
- Scenario simulation output.
- Leadership recommendation for adoption.

## Verify

Run at least:

```bash
cd "10 Token Economics/exercise-03-model-routing-cost-planner/starter-react" && npm test
cd "10 Token Economics/exercise-03-model-routing-cost-planner/starter-react" && npm run agent:check
```

Done when:
- scenario simulation
- cost estimator
- risk override test
- leadership recommendation
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
