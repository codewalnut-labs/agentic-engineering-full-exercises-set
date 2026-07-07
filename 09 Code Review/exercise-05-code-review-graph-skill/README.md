**Exercise 05**

# Code Review Graph Skill

**Goal:** Use structural graph context to review a large agent-written discount change by call path, ownership, and risk.

**Outcome:** Review findings are grounded in diff scope, graph relationships, tests, and NFR checks instead of reading files randomly.

## Start Here

Starter folders:
- [starter-react](./starter-react)

React starter (run from the repository root):

```bash
cd "09 Code Review/exercise-05-code-review-graph-skill/starter-react"
npm install
npm run dev
```

Seed files:
- [docs/diff-summary.md](./docs/diff-summary.md)
- [docs/review-graph.md](./docs/review-graph.md)

## Use These Practices

- [09. Code Review practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#09-code-review)
- [Agent skill pattern map](../../AGENT_SKILL_PATTERNS.md) - use `code review graph`
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Run the starter and skim the seed files so the agent has real context.
2. Ask your coding agent for a short plan that names files, checks, and risks before it edits.
3. Ask a fresh agent or session for graph-assisted review.
4. Review the diff yourself before accepting findings.
5. Patch at least one confirmed blocker.
6. Run a re-review or focused check on the patched area.
7. Run the checks below and keep the output for your evidence note.
8. Commit only the files needed for this exercise.

## Deliver

- Graph-guided review report.
- Confirmed blocker fix in React code.
- Regression test or script check.
- Triage table for every finding.

## Verify

Run at least:

```bash
cd "09 Code Review/exercise-05-code-review-graph-skill/starter-react" && npm test
cd "09 Code Review/exercise-05-code-review-graph-skill/starter-react" && npm run agent:check
```

Done when:
- Review starts from diff and issue list, then uses graph paths for risk expansion.
- Findings are severity-ranked with file references and reproduction steps.
- NFR pass covers security, accessibility, performance, and maintainability where relevant.
- Accepted, deferred, and dismissed findings are triaged with rationale.
- A short evidence note lists commands run, pass/fail results, changed behavior, and residual risk.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
