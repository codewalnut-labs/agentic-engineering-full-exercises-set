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
- [Graphify](https://graphify.net/) - install package `graphifyy`, use CLI command `graphify`
- [Graphify source](https://github.com/Graphify-Labs/graphify)
- [Mermaid flowchart syntax](https://mermaid.js.org/syntax/flowchart.html) for lightweight graph views
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Install or open Graphify first. With Python 3.10+, run `pip install graphifyy && graphify install`, then use `/graphify ./raw` or the current command from the Graphify docs. If you cannot install it, follow the Graphify output shape manually.
2. Ask your coding agent to read `docs/graph-extract.md`, `docs/graph-questions.md`, and the starter entry points, then propose graph nodes for modules, data, jobs, owners, and tests.
3. Review the node list and remove low-value raw-file duplication; keep relationships that answer real change-impact questions.
4. Run Graphify or have the agent produce a machine-readable graph with edge types such as calls, owns, reads, writes, tests, and depends-on.
5. Ask the graph questions from `docs/graph-questions.md` and require answers to cite graph edges plus source files.
6. Use the verified graph to implement the billing analytics change with a narrow impact path.
7. After the change, ask the agent to update only the graph edges that actually changed and record stale or uncertain edges.

## Deliver

- Codebase knowledge graph with typed nodes and edges.
- Answers to graph questions with source-file evidence.
- Billing analytics change guided by the graph impact path.
- Evidence note listing graph edges added, changed, rejected, or marked uncertain.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The graph helps answer impact questions that would otherwise require repeated raw-file scans.
- Every important edge is backed by a source file, fixture, or doc reference.
- The implemented change follows the graph path and updates affected tests or checks.
- A fresh agent can use the graph to explain the billing analytics flow before editing.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
