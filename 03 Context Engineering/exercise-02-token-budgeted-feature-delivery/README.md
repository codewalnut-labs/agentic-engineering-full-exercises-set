**Exercise 02**

# Token-Budgeted Feature Delivery

**Goal:** Implement a small UI change while staying inside a strict context budget and documenting every file included.

**Outcome:** A feature ships under an explicit context budget, with the agent reading the right files and no more.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/long-architecture-notes.md](./docs/long-architecture-notes.md)
- [docs/token-budget-worksheet.md](./docs/token-budget-worksheet.md)

From the repository root, open the main starter:

```bash
cd "03 Context Engineering/exercise-02-token-budgeted-feature-delivery/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- [OpenAI prompt caching guide](https://platform.openai.com/docs/guides/prompt-caching)
- [Anthropic prompt caching guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/token-budget-worksheet.md`, `docs/long-architecture-notes.md`, and the starter, then propose a file budget before reading broadly.
2. Review the proposed budget and require the agent to justify each included file by decision value, not curiosity.
3. Have the agent build a context manifest with include, exclude, and read-later sections before implementing the UI change.
4. Implement the feature using the manifest, updating it only when a new file is genuinely needed.
5. Ask the agent to compare the final manifest against the original budget and explain any context expansion.
6. Run a clean-context replay where the new agent uses the manifest to understand the change without rereading the whole long notes file.

## Deliver

- Context budget worksheet with included, excluded, and deferred files.
- Working UI change tied to that context manifest.
- Budget variance note explaining any file added after the first plan.
- Evidence note with checks run and what context was intentionally not loaded.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The agent reads targeted files before raw long-form notes or broad source scans.
- The context manifest explains why each file was included or excluded.
- The feature works without using hidden chat context.
- A fresh agent can understand the implemented change from the manifest and final diff.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
