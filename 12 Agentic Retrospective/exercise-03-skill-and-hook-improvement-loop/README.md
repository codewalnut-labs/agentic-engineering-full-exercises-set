**Exercise 03**

# Skill and Hook Improvement Loop

**Goal:** Run a mini retro on a flawed team skill and hook setup, then revise both to reduce future rework.

**Outcome:** A flawed skill and hook setup is improved using real session evidence and evals.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/flawed-skill.md](./docs/flawed-skill.md)
- [docs/hook-failures.md](./docs/hook-failures.md)

From the repository root, open the main starter:

```bash
cd "12 Agentic Retrospective/exercise-03-skill-and-hook-improvement-loop/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [12. Agentic Retrospective practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#12-agentic-retrospective)
- [Claude Code hooks](https://docs.anthropic.com/en/docs/claude-code/hooks)
- [Codex skills guide](https://developers.openai.com/codex/skills)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/flawed-skill.md` and `docs/hook-failures.md` for trigger misses, bad output shape, unsafe tool use, and noisy false positives.
2. Review the failure list and decide which problems belong in the skill, which belong in the hook, and which are process expectations.
3. Have the agent revise the skill description, workflow steps, and output contract before changing the hook.
4. Update the hook policy to catch unsafe actions that the skill should not have to remember every time.
5. Build before/after eval cases for trigger accuracy, output shape, allowed hook behavior, and blocked hook behavior.
6. Run a clean-context trial where the new skill and hook combination handles one good case and one unsafe case.

## Deliver

- Revised skill with tighter trigger and output contract.
- Updated hook policy for unsafe or noisy cases.
- Before/after eval results for skill and hook behavior.
- Evidence note explaining which failures moved to skill, hook, or process.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Skill changes improve trigger and output behavior without becoming a broad rule dump.
- Hook changes block unsafe actions while allowing normal work to continue.
- Before/after evals show behavior changed for the documented failures.
- A fresh agent can use the revised skill and understand why the hook exists.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
