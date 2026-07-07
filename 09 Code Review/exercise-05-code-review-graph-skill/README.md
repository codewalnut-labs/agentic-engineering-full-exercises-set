**Exercise 05**

# Code Review Graph Skill

**Goal:** Use structural graph context to review a large agent-written discount change by call path, ownership, and risk.

**Outcome:** Review findings are grounded in diff scope, graph relationships, tests, and NFR checks instead of reading files randomly.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/diff-summary.md](./docs/diff-summary.md)
- [docs/review-graph.md](./docs/review-graph.md)

From the repository root, open the main starter:

```bash
cd "09 Code Review/exercise-05-code-review-graph-skill/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [09. Code Review practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#09-code-review)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `code review graph`
- [OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/review-graph.md` and `docs/diff-summary.md`, then identify call paths, ownership boundaries, and tests touched by the discount change.
2. Review the graph and mark any edge that is stale, inferred, or missing source evidence before using it for findings.
3. Have the agent review the change path-by-path: entry point, domain calculation, UI display, persistence or API boundary, and tests.
4. Ask for findings that cite both the diff and the graph edge that makes the risk important.
5. Patch the highest-risk accepted finding and update graph notes if the fix changes ownership or call path.
6. Run a clean-context review where a new agent starts from the graph and confirms no high-risk discount path is unreviewed.

## Deliver

- Graph-guided review plan with verified and uncertain edges.
- Findings tied to diff lines, graph paths, and ownership boundaries.
- Patch and check for the top accepted discount-risk finding.
- Evidence note explaining how graph review changed the review result.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Review coverage follows structural call paths instead of random file order.
- Findings cite why the graph relationship increases risk.
- Unverified graph edges are not used as authoritative evidence.
- A fresh agent can use the graph to name unreviewed or high-risk paths.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
