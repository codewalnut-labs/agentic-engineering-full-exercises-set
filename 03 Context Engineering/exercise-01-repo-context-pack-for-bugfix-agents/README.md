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
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan this exercise and summarize: project purpose, domain behavior, important files, existing commands, risks, expected outputs, and likely files to change.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- Versioned context layer under the exercise.
- Actual bug fix in the React starter.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The context pack gives a fresh agent enough repo-grounded context to work safely.
- The target regression test fails before the fix and passes after it.
- fresh-agent handoff simulation
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
