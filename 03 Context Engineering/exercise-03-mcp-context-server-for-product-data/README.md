**Exercise 03**

# MCP Context Server for Product Data

**Goal:** Build a tiny TypeScript context server that exposes the product rules and fixture lookups the React starter needs, instead of pasting large JSON into prompts.

**Outcome:** Agents can query stable product-rule and fixture resources, and the React starter or smoke script proves the query path works.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [03. Context Engineering practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#03-context-engineering)
- [Model Context Protocol specification](https://modelcontextprotocol.io/specification)
- [MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/product-rules.md`, `docs/fixture-index.md`, `context-server`, and `starter-react`, then name the exact product facts that should be queried instead of pasted.
2. Review the proposed resource and tool names for least privilege, stable schemas, and fixture versioning.
3. Have the agent implement or repair the context server so it exposes only the approved product-rule and fixture queries.
4. Add a smoke script or starter integration that calls the server and handles missing data, unknown query, and version mismatch.
5. Add tests for valid query, unknown query, access boundary, fixture version behavior, and schema shape.
6. Run the server plus the consumer smoke path and capture command output.
7. Run a clean-context trial where a new agent answers a product-rule question by querying the server instead of opening every fixture file.

## Deliver

- Runnable TypeScript context server with documented resources or tools.
- Schema and fixture version notes for each exposed query.
- Consumer smoke test or starter integration showing the query path works and fails safely.
- Evidence note comparing prompt-paste context avoided by the server plus final command output.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- The server exposes only the product data needed for this starter.
- Query contracts are typed or validated and covered by tests.
- Unknown and out-of-scope resources fail safely instead of leaking fixture internals.
- A fresh agent can discover the server contract from repo files and use it correctly.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
