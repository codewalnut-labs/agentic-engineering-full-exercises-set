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
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `skill evals / skill optimizer`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan this exercise and summarize: skill pattern, trigger conditions, source files, expected artifact, checks, and likely failure modes.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- Updated SKILL.md with precise use-when and do-not-use boundaries.
- Eval cases for trigger and output behavior.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Trigger cases include positive, negative, and ambiguous prompts.
- Process checks verify commands, touched files, and required artifacts.
- Output checks validate schema and reviewer-ready language.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
