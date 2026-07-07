**Exercise 03**

# MCP Context Server for Product Data

**Goal:** Expose product rules and fixtures through a tiny TypeScript context server so agents stop pasting giant JSON into prompts.

**Outcome:** Product rules move from prompt paste into a small runnable context service that agents and code can query.

## Start Here

Starter folders:
- [starter-react](./starter-react)
- [context-server](./context-server)

React starter (run from the repository root):

```bash
cd "03 Context Engineering/exercise-03-mcp-context-server-for-product-data/starter-react"
npm install
npm run dev
```

Context server:

```bash
cd "03 Context Engineering/exercise-03-mcp-context-server-for-product-data/context-server"
npm install
npm test
```

Seed files:
- [docs/fixture-index.md](./docs/fixture-index.md)
- [docs/product-rules.md](./docs/product-rules.md)

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- Use the competency practice guide as the main workflow reference.
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Build the TypeScript context server around product rules, fixtures, and retrieval boundaries.
4. Expose focused queries for product limits, eligibility rules, glossary terms, and sample payloads.
5. Integrate one starter workflow with the server output instead of hard-coded duplicated rules.
6. Add tests for retrieval correctness and forbidden broad dumps.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Runnable context server or MCP-style adapter.
- React integration or demo client using retrieved rules.
- Tests for rule lookup and access boundaries.
- Usage notes for Codex/Claude/Cursor.

## Verify

Run at least:

```bash
cd "03 Context Engineering/exercise-03-mcp-context-server-for-product-data/starter-react" && npm test
cd "03 Context Engineering/exercise-03-mcp-context-server-for-product-data/starter-react" && npm run agent:check
cd "03 Context Engineering/exercise-03-mcp-context-server-for-product-data/context-server" && npm test
```

Done when:
- query contract test
- access-boundary test
- fixture version check
- integration smoke
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
