**Exercise 02**

# Context Cache Hygiene Challenge

**Goal:** Rewrite the bloated always-on agent context into a lean rules file plus references, then add a check that prevents it from growing again.

**Outcome:** Future sessions load shorter stable guidance, stale commands are removed, and a hygiene check catches size or stale-phrase regressions.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/bloated-agents-file.md](./docs/bloated-agents-file.md)
- [docs/stale-context.md](./docs/stale-context.md)

From the repository root, open the main starter:

```bash
cd "10 Token Economics/exercise-02-context-cache-hygiene-challenge/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [10. Token Economics practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#10-token-economics)
- [OpenAI prompt caching guide](https://platform.openai.com/docs/guides/prompt-caching)
- [Anthropic prompt caching guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to audit `docs/bloated-agents-file.md` and `docs/stale-context.md` for always-on rules, stale commands, one-time notes, duplicated rules, oversized examples, and content better suited to a skill.
2. Review the audit and classify each item as keep always-on, move to linked reference, delete, or convert to a skill.
3. Rewrite the context into a lean rules file plus optional deeper references, preserving only stable guidance future sessions need.
4. Add a lightweight size or stale-command check so context bloat is caught before it grows again.
5. Simulate a handoff using the lean context and record what information was missing or still too noisy.
6. Revise the context once from the handoff result without adding task-specific instructions back into always-on rules.
7. Run the hygiene check and capture output.

## Deliver

- Lean replacement for the bloated context file.
- Keep, move, delete, or skill conversion table for removed material.
- Size or stale-command check for future context hygiene.
- Evidence note from the handoff simulation, final revision, and hygiene-check output.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Always-on context is shorter and contains only stable project guidance.
- Stale commands and one-time task notes are removed or moved out of the hot path.
- The hygiene check catches size growth or forbidden stale phrases.
- A fresh agent can still choose correct commands and boundaries from the lean context.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
