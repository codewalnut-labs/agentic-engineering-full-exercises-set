**Exercise 03**

# MCP Context Server for Product Data

**Goal:** Expose product rules and fixtures through a tiny TypeScript context server so agents stop pasting giant JSON into prompts.

**Outcome:** Product rules move from prompt paste into a small runnable context service that agents and code can query.

## Start Here

Starter folders:
- [context-server](./context-server)
- [starter-react](./starter-react)

Seed files:
- [docs/fixture-index.md](./docs/fixture-index.md)
- [docs/product-rules.md](./docs/product-rules.md)

From the repository root, open the main starter:

```bash
cd "03 Context Engineering/exercise-03-mcp-context-server-for-product-data/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- [Model Context Protocol specification](https://modelcontextprotocol.io/specification)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/product-rules.md`, `docs/fixture-index.md`, `context-server`, and the React starter, then define which product facts should be queried instead of pasted into prompts.
2. Review the proposed resource and tool names for least privilege, stable schemas, and fixture versioning.
3. Have the agent implement or repair the tiny context server so it exposes only the approved rules and fixture queries.
4. Wire the starter or a smoke script to consume the context server response and handle missing or version-mismatched data.
5. Ask the agent to add tests for valid query, unknown query, access boundary, and fixture version behavior.
6. Run a clean-context trial where the new agent answers a product-rule question by querying the server instead of opening every fixture file.

## Deliver

- Runnable TypeScript context server with documented resources or tools.
- Schema and fixture version notes for each exposed query.
- Consumer smoke test or starter integration showing the query path works.
- Evidence note comparing prompt-paste context avoided by the server.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The server exposes only the product data needed for the exercise.
- Query contracts are typed or validated and covered by tests.
- Out-of-scope resources fail safely instead of leaking fixture internals.
- A fresh agent can discover the context server contract from repo files and use it correctly.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
