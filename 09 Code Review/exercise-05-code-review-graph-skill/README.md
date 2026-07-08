**Exercise 05**

# Code Review Graph Skill

**Goal:** Use the review graph to inspect the supplied discount change path-by-path, then fix the highest-risk discount blocker.

**Outcome:** Discount review findings cite graph edges, diff scope, ownership boundaries, tests, and a narrow fix for the accepted top risk.

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

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [09. Code Review practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#09-code-review)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `code review graph`
- [Graphify](https://graphify.net/) - optional source for live call-path graph context
- [OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Optional tool setup: install Graphify with `pip install graphifyy && graphify install` if you want to rebuild the review graph from the starter before reviewing.
2. Ask your coding agent to read `docs/review-graph.md` and `docs/diff-summary.md`, then identify discount call paths, ownership boundaries, and tests touched by the change.
3. Review the graph and mark any edge that is stale, inferred, or missing source evidence before using it for findings.
4. Review the change path-by-path: entry point, discount calculation, UI display, persistence or API boundary, and tests.
5. Require findings to cite both the diff and the graph edge that makes the risk important.
6. Patch the highest-risk accepted discount finding and update graph notes if the fix changes ownership or call path.
7. Run a clean-context review where a new agent starts from the graph and confirms no high-risk discount path is unreviewed.

## Deliver

- Graph-guided review plan with verified, inferred, stale, and uncertain edges.
- Findings tied to diff lines, graph paths, ownership boundaries, and tests.
- Patch and check for the top accepted discount-risk finding.
- Evidence note explaining how graph review changed the result plus final command output.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Review coverage follows structural discount call paths instead of random file order.
- Findings cite why the graph relationship increases risk.
- Unverified graph edges are not used as authoritative evidence.
- A fresh agent can use the graph to name unreviewed or high-risk discount paths.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
