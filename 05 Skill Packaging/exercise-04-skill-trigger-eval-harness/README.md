**Exercise 04**

# Skill Trigger Eval Harness

**Goal:** Build an eval harness that scores whether team skills trigger, run the right steps, and produce the expected output shape.

**Outcome:** A skill is treated like production workflow code: trigger cases, process checks, output checks, and regression evidence exist before rollout.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/eval-plan.md](./docs/eval-plan.md)
- [docs/trigger-cases.md](./docs/trigger-cases.md)

From the repository root, open the main starter:

```bash
cd "05 Skill Packaging/exercise-04-skill-trigger-eval-harness/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [05. Skill Packaging practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#05-skill-packaging)
- [OpenAI Evals](https://github.com/openai/evals) for eval mindset
- [Claude Skills overview](https://docs.anthropic.com/en/docs/claude-code/skills)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/eval-plan.md` and `docs/trigger-cases.md`, then define what a good skill run must prove: trigger, process, output, and non-trigger behavior.
2. Review the scoring rubric and reject binary pass or fail checks that cannot explain why the skill misfired.
3. Have the agent build a small eval harness that runs positive trigger cases, negative trigger cases, and malformed-input cases.
4. Ask the agent to score process adherence separately from output shape so a lucky final answer does not hide skipped steps.
5. Use eval failures to tighten the skill description, references, or output schema.
6. Run the harness again and capture before/after results plus remaining false positive or false negative risk.

## Deliver

- Skill eval harness with trigger, process, output, and negative cases.
- Scoring rubric that explains failures in actionable language.
- Before/after eval results after at least one skill revision.
- Evidence note listing false positives, false negatives, and accepted residual risk.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Positive cases prove the skill runs for intended tasks.
- Negative cases prove the skill does not run for adjacent but wrong tasks.
- Output checks validate required sections or schema, not just text length.
- A fresh agent can add a new eval case by following the harness pattern.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
