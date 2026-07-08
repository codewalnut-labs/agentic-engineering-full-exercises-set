**Exercise 01**

# Repo Context Pack for Bugfix Agents

**Goal:** Create a compact `CONTEXT.md` for this React starter, then use it to fix the seeded bug without relying on chat-only hints.

**Outcome:** The bugfix proves that future agents can find the right files, commands, conventions, and forbidden paths from checked-in context alone.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/hidden-conventions.md](./docs/hidden-conventions.md)
- [docs/repo-map-starter.md](./docs/repo-map-starter.md)

From the repository root, open the main starter:

```bash
cd "03 Context Engineering/exercise-01-repo-context-pack-for-bugfix-agents/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- [Codex AGENTS.md guide](https://developers.openai.com/codex/guides/agents-md)
- [Claude Code memory docs](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan `starter-react`, `docs/repo-map-starter.md`, and `docs/hidden-conventions.md` for entry points, ownership boundaries, commands, generated artifacts, and bug-prone conventions.
2. Review the scan and delete folklore that is not supported by files or seed docs.
3. Have the agent create `CONTEXT.md` for future bugfix agents with purpose, architecture map, likely change paths, commands, forbidden paths, and test expectations.
4. Start a new prompt using only `CONTEXT.md` plus repo files, then ask the agent to find and fix the seeded bug in the starter.
5. Update `CONTEXT.md` only if the bugfix reveals a durable convention future agents need.
6. Run the relevant checks and record which context entries were actually used during the fix.
7. Start a clean-context handoff and ask the new agent to find the likely bug area from `CONTEXT.md` alone.

## Deliver

- `CONTEXT.md` or equivalent repo context pack checked into the exercise.
- Seeded bugfix that cites the context pack.
- Changelog of hidden conventions promoted into durable context and rejected as noise.
- Evidence note from the clean-context bugfix rehearsal and final command output.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The context pack is short enough to read every session and specific enough to guide the seeded bugfix.
- The bugfix cites context entries instead of relying on chat-only instructions.
- Forbidden paths, generated artifacts, and safe checks are explicit.
- A fresh agent can choose the right files and checks from the pack alone.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
