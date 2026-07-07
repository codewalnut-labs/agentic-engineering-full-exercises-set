**Exercise 01**

# Review Checklist Skill Pack

**Goal:** Package a repeated code review checklist into a focused skill and use it against the provided React change.

**Outcome:** A repeated code review workflow becomes a runnable team skill with an eval harness.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/repeated-review-prompt.md](./docs/repeated-review-prompt.md)
- [docs/skill-eval-cases.md](./docs/skill-eval-cases.md)

From the repository root, open the main starter:

```bash
cd "05 Skill Packaging/exercise-01-review-checklist-skill-pack/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [05. Skill Packaging practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#05-skill-packaging)
- [Codex skills guide](https://developers.openai.com/codex/skills)
- [Claude Skills overview](https://docs.anthropic.com/en/docs/claude-code/skills)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/repeated-review-prompt.md`, `docs/skill-eval-cases.md`, and the starter diff target, then identify the repeated review workflow worth packaging.
2. Review the workflow and remove one-off project notes, vague quality advice, and instructions that belong in repo rules instead of the skill.
3. Have the agent create an in-repo skill with a precise use-when description, non-use cases, input expectations, output shape, and review checklist.
4. Run the skill against the sample React change and capture findings in the expected output format.
5. Ask the agent to build a tiny eval or smoke harness from `skill-eval-cases.md` that checks trigger fit and output sections.
6. Revise the skill after the eval: tighten the trigger if it fires too broadly or add missing review steps if it misses real risk.

## Deliver

- Packaged review skill folder with `SKILL.md` or equivalent instructions.
- Sample review output for the provided React change.
- Eval or smoke harness covering trigger and output shape.
- Evidence note showing what changed after the first skill draft.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The skill trigger is specific enough to load for code review work and stay quiet for unrelated tasks.
- The checklist asks for security, accessibility, behavior, tests, and evidence without becoming a generic essay.
- Eval cases include at least one positive and one negative trigger case.
- A fresh agent can use the skill and produce the expected review sections.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
