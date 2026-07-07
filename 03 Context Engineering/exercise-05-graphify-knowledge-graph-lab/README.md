**Exercise 05**

# Graphify Knowledge Graph Lab

**Goal:** Create and verify a codebase knowledge graph before asking an agent to make a cross-cutting billing analytics change.

**Outcome:** Agents answer architecture questions from a durable graph of code, docs, schema, jobs, and ownership instead of repeatedly scanning raw files.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter:

```bash
cd "03 Context Engineering/exercise-05-graphify-knowledge-graph-lab/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/graph-extract.md](./docs/graph-extract.md)
- [docs/graph-questions.md](./docs/graph-questions.md)

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `graphify`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Build or simulate the graph from the provided extract.
4. Query the graph to find affected modules and owner boundaries.
5. Use raw files only after the graph narrows the search space.
6. Patch one billing metric bug and update the graph notes.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Updated graph snapshot or graph notes.
- Working metric behavior in the React starter.
- Evidence of graph-guided file selection.
- A short list of graph gaps for future agents.

## Verify

Run at least:

```bash
cd "03 Context Engineering/exercise-05-graphify-knowledge-graph-lab/starter-react" && npm test
cd "03 Context Engineering/exercise-05-graphify-knowledge-graph-lab/starter-react" && npm run agent:check
```

Done when:
- Graph extract contains nodes for UI, API, warehouse, jobs, docs, and owner teams.
- At least five agent questions are answered from the graph before files are opened.
- A stale or missing edge is corrected and documented.
- The implemented change names the graph queries used to choose files.
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
