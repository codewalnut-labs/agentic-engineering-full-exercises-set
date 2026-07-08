**Exercise 01**

# Review Checklist Skill Pack

**Goal:** Package the repeated React review checklist into a reusable `SKILL.md`, then run it against the provided sample change and eval cases.

**Outcome:** The exercise produces a review skill that triggers for code review work, stays quiet for non-review work, and finds real issues in the sample React change.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [05. Skill Packaging practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#05-skill-packaging)
- [Codex skills guide](https://developers.openai.com/codex/skills)
- [Claude Skills overview](https://docs.anthropic.com/en/docs/claude-code/skills)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/repeated-review-prompt.md`, `docs/skill-eval-cases.md`, and the sample React change, then extract the repeated review workflow.
2. Review the workflow and remove one-off project notes, vague quality advice, and anything that belongs in repo rules instead of the skill.
3. Have the agent create an in-repo review skill with a precise trigger, non-use cases, input expectations, output sections, and checklist.
4. Run the skill against the sample React change and capture findings in the required output format.
5. Build a tiny eval or smoke harness from `docs/skill-eval-cases.md` that checks positive trigger, negative trigger, required sections, and evidence quality.
6. Revise the skill after the eval: tighten the trigger if it fires too broadly or add missing review steps if it misses real risk.
7. Run a clean-context trial where a new agent uses the skill to review the sample change.

## Deliver

- Packaged review skill folder with `SKILL.md` or equivalent instructions.
- Sample review output for the provided React change.
- Eval or smoke harness covering positive trigger, negative trigger, required sections, and evidence quality.
- Evidence note showing first-draft weaknesses, final command output, and what changed after eval.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The skill trigger loads for review work and stays quiet for unrelated tasks.
- The checklist asks for security, accessibility, behavior, tests, and evidence without becoming a generic essay.
- Eval cases include at least one positive trigger and one negative trigger.
- A fresh agent can use the skill and produce the expected review sections on the sample change.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
