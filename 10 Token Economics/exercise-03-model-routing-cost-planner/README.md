**Exercise 03**

# Model Routing Cost Planner

**Goal:** Build a model and effort routing planner for the provided team scenarios, including cost, context size, risk, and override reasons.

**Outcome:** The planner routes planning, coding, testing, review, docs, and retro work by risk and cost instead of habit.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/cost-dashboard-sample.md](./docs/cost-dashboard-sample.md)
- [docs/team-usage-scenarios.md](./docs/team-usage-scenarios.md)

From the repository root, open the main starter:

```bash
cd "10 Token Economics/exercise-03-model-routing-cost-planner/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [10. Token Economics practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#10-token-economics)
- [OpenAI API pricing](https://openai.com/api/pricing/)
- [OpenAI prompt caching guide](https://platform.openai.com/docs/guides/prompt-caching)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/team-usage-scenarios.md` and `docs/cost-dashboard-sample.md`, then classify each scenario by risk, reversibility, context size, and review burden.
2. Review the classification and define routing rules for planning, coding, tests, code review, docs, and retrospectives.
3. Build a cost planner or worksheet that estimates model or effort choice, context cost, caching assumption, and override reason per scenario.
4. Add override cases where safety, architecture, or review risk justifies a stronger model or slower workflow despite higher cost.
5. Run the scenarios through the planner and produce a dashboard-style summary with savings and risk notes.
6. Add one new scenario and route it through the policy as a smoke test.
7. Run a clean-context policy review where a new agent chooses a route for a new task and explains the trade-off.

## Deliver

- Model and effort routing policy by task class and risk level.
- Cost planner or worksheet for the provided scenarios.
- Scenario output with normal route, override route, cost assumption, and reason.
- Evidence note showing how routing reduces waste without hiding risk plus one new-scenario smoke result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Routing choices are based on task risk and context needs, not habit.
- The planner explains assumptions and can be updated when pricing or model options change.
- Risk overrides choose safer routing when cheaper routing would be irresponsible.
- A fresh agent can apply the policy to a new scenario and justify the choice.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
