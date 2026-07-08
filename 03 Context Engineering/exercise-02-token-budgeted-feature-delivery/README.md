**Exercise 02**

# Token-Budgeted Feature Delivery

**Goal:** Ship the requested UI change in `starter-react` using a written context budget that limits exactly which files the agent may read before editing.

**Outcome:** The feature works, the context manifest explains every file read, and a fresh agent can understand the change without rereading the long architecture notes.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- [OpenAI prompt caching guide](https://platform.openai.com/docs/guides/prompt-caching)
- [Anthropic prompt caching guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/token-budget-worksheet.md`, skim `docs/long-architecture-notes.md` only for headings, and propose a file-read budget before broad scanning.
2. Review the proposed budget and require a decision-value reason for every included file.
3. Have the agent create a context manifest with `include`, `exclude`, and `read-later` sections before implementing the UI change.
4. Implement the requested UI change using only the manifest, expanding it only when a new file is necessary to make a safe decision.
5. Ask the agent to compare planned versus actual context: files read, files skipped, why budget expanded, and what was intentionally not loaded.
6. Run the relevant checks for the UI change.
7. Run a clean-context replay where a new agent uses the manifest and final diff to explain the change without rereading the full long notes file.

## Deliver

- Context manifest with included, excluded, deferred, and added-later files.
- Working UI change tied to the manifest.
- Budget variance note explaining every file added after the first plan.
- Evidence note with checks run, final command output, and context intentionally not loaded.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The agent reads targeted files before raw long-form notes or broad source scans.
- The context manifest explains why each file was included, excluded, deferred, or added later.
- The feature works without hidden chat context.
- A fresh agent can understand the implemented change from the manifest and final diff.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
