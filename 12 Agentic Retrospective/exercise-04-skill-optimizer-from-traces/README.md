**Exercise 04**

# Skill Optimizer From Traces

**Goal:** Analyze failed agent traces and turn repeated skill mistakes into a measured skill improvement, hook, or team rule.

**Outcome:** A broken alert-triage skill improves because trace evidence reveals trigger misses, repeated reads, skipped checks, and weak output contracts.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/skill-regression.md](./docs/skill-regression.md)
- [docs/trace-samples.md](./docs/trace-samples.md)

From the repository root, open the main starter:

```bash
cd "12 Agentic Retrospective/exercise-04-skill-optimizer-from-traces/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [12. Agentic Retrospective practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#12-agentic-retrospective)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `trace-backed skill optimizer`
- [OpenAI Evals](https://github.com/openai/evals) for regression-minded evaluation
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to mine `docs/trace-samples.md` and `docs/skill-regression.md` for trigger misses, repeated reads, skipped checks, wrong tool choice, and weak final evidence.
2. Review the trace labels and separate skill defects from missing repo context, missing hooks, or impossible user requests.
3. Have the agent propose one optimizer change to the skill, one eval case that would catch the regression, and one optional hook or rule if the trace proves it is needed.
4. Apply the smallest skill change first, keeping references and examples lean.
5. Run before/after evals on the trace-derived cases and record whether the optimizer reduced false triggers, skipped steps, or weak outputs.
6. Run a clean-context replay where a new agent uses the optimized skill on a trace-like task and produces stronger evidence.

## Deliver

- Trace analysis table with defect type, evidence, and chosen fix.
- Optimized skill, eval case, and optional hook or rule update.
- Before/after eval results from trace-derived cases.
- Evidence note describing improved behavior and remaining regression risk.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Trace findings are tied to concrete failed steps, not general dissatisfaction.
- The skill optimizer change is measured by an eval before it is considered better.
- Hooks or rules are added only when traces show the skill alone cannot prevent recurrence.
- A fresh agent produces stronger output on a trace-like task without extra coaching.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
