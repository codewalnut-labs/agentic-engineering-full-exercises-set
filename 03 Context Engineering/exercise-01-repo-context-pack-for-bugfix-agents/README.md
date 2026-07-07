**Exercise 01**

# Repo Context Pack for Bugfix Agents

**Goal:** Build a compact context layer so future bugfix agents understand ownership, commands, and safe inspection paths.

**Outcome:** A fresh agent can fix a seeded bug using project context files instead of chat paste.

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

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- [Codex AGENTS.md guide](https://developers.openai.com/codex/guides/agents-md)
- [Claude Code memory docs](https://docs.anthropic.com/en/docs/claude-code/memory)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan the starter, `docs/repo-map-starter.md`, and `docs/hidden-conventions.md` for entry points, ownership boundaries, safe commands, and bug-prone conventions.
2. Review the scan and remove folklore that is not proven by files or seed docs.
3. Have the agent create a compact context pack that covers purpose, architecture map, change paths, commands, forbidden paths, and testing expectations.
4. Use the context pack to fix the seeded bug in the starter without giving the agent extra chat hints.
5. Ask the agent to update the pack only when the bugfix reveals a durable rule future agents need.
6. Start a clean-context handoff and ask the new agent to find the likely bug area using only the context pack and repo files.

## Deliver

- Repo context pack or updated repo map checked into the exercise.
- Bugfix or demonstration change that proves the context pack is usable.
- Short changelog of which hidden conventions were promoted into durable context.
- Evidence note from the clean-context bugfix rehearsal.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The context pack is short enough to be read every session and specific enough to guide edits.
- Bugfix work cites the context pack rather than relying on chat-only instructions.
- Forbidden paths and generated artifacts are called out clearly.
- A fresh agent can choose the right files and checks from the pack alone.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
