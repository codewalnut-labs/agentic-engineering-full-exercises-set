**Exercise 05**

# Graphify Knowledge Graph Lab

**Goal:** Create and verify a codebase knowledge graph before asking an agent to make a cross-cutting billing analytics change.

**Outcome:** Agents answer architecture questions from a durable graph of code, docs, schema, jobs, and ownership instead of repeatedly scanning raw files.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/graph-extract.md](./docs/graph-extract.md)
- [docs/graph-questions.md](./docs/graph-questions.md)

From the repository root, open the main starter:

```bash
cd "03 Context Engineering/exercise-05-graphify-knowledge-graph-lab/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `graphify`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to scan this exercise and summarize: skill pattern, trigger conditions, source files, expected artifact, checks, and likely failure modes.
2. Review that scan yourself. Remove guesses and ask for file references where the agent made claims.
3. Ask the agent to make a first focused pass on the goal above.
4. Review the first result yourself. Check it against the Verify section below.
5. Tell the agent what to fix or tighten, then have it update the code, docs, tests, or exercise artifact.
6. Test with a fresh agent or clean context. Ask it to explain the change, name the checks to run, and call out remaining risks.
7. Save a short evidence note with the scan, your review notes, final changes, commands run, and residual risks.

## Deliver

- Updated graph snapshot or graph notes.
- Working metric behavior in the React starter.
- Short review note: what you changed after reading the agent's first draft.
- Fresh-agent or clean-context test note.
- Evidence note with commands run and final pass/fail result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Graph extract contains nodes for UI, API, warehouse, jobs, docs, and owner teams.
- At least five agent questions are answered from the graph before files are opened.
- A stale or missing edge is corrected and documented.
- You reviewed and improved the agent's first draft.
- A fresh agent or clean context can explain the work and choose the right checks.
- The evidence note is short and complete.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
