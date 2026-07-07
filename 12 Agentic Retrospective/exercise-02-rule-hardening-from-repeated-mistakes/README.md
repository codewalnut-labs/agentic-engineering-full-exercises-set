**Exercise 02**

# Rule Hardening From Repeated Mistakes

**Goal:** Turn repeated agent corrections into durable AGENTS.md rules, skills, or hooks with clear trigger criteria.

**Outcome:** Repeated agent mistakes become durable rules, skills, or hooks with tests.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/agents-md-before.md](./docs/agents-md-before.md)
- [docs/correction-history.md](./docs/correction-history.md)

From the repository root, open the main starter:

```bash
cd "12 Agentic Retrospective/exercise-02-rule-hardening-from-repeated-mistakes/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [12. Agentic Retrospective practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#12-agentic-retrospective)
- [Codex AGENTS.md guide](https://developers.openai.com/codex/guides/agents-md)
- [Claude Code hooks](https://docs.anthropic.com/en/docs/claude-code/hooks)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to compare `docs/correction-history.md` with `docs/agents-md-before.md` and cluster repeated corrections by trigger, missing context, and consequence.
2. Review the clusters and decide whether each needs a rule, hook, skill, script, or no durable change.
3. Have the agent rewrite the rules file with only stable, specific rules that prevent repeated mistakes without bloating every session.
4. Add a small rule-quality or hook simulation check for the highest-risk repeated mistake.
5. Ask the agent to test the new rule against positive and negative examples from the correction history.
6. Run a clean-context handoff where a new agent reads the hardened rules and avoids the repeated mistake while still completing a normal task.

## Deliver

- Correction clusters with chosen fix type and reason.
- Hardened rules file or hook/skill update derived from repeated evidence.
- Rule-quality or hook simulation check.
- Evidence note from positive, negative, and clean-context rule tests.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Every new rule traces to repeated correction evidence.
- Rules are specific enough to guide behavior and short enough to stay useful.
- Positive and negative tests show the rule catches the right case without blocking normal work.
- A fresh agent changes behavior because of the hardened rule, not extra prompting.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
