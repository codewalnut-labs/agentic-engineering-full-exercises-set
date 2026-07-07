**Exercise 03**

# Performance and A11y Evidence Gate

**Goal:** Attach performance and accessibility evidence to a UI change so reviewers can judge risk quickly.

**Outcome:** Performance and accessibility are measured and improved before review.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/quality-gate-brief.md](./docs/quality-gate-brief.md)
- [docs/sample-reports.md](./docs/sample-reports.md)

From the repository root, open the main starter:

```bash
cd "08 Evidence-led PRs/exercise-03-performance-and-a11y-evidence-gate/starter-react"
npm install
npm run dev
```

Use the running app only as a smoke test. The main work is the agent workflow, review loop, code/docs change, and evidence.

## Use These Practices

- [08. Evidence-led PRs practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#08-evidence-led-prs)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Lighthouse performance audits](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to inspect `docs/quality-gate-brief.md`, `docs/sample-reports.md`, and the changed UI path for performance and accessibility risks.
2. Review the risk list and pick concrete budgets or checks for rendering cost, interaction latency, keyboard access, labels, focus, and contrast.
3. Have the agent collect baseline evidence before changing the UI or clearly explain why the provided sample report is the baseline.
4. Implement the UI change and any necessary fixes, then collect after evidence with the same scope as the baseline.
5. Ask the agent to write a PR-ready evidence summary that compares before and after rather than listing tool output blindly.
6. Run a clean-context review where a new agent looks only at the evidence summary and identifies the biggest remaining quality risk.

## Deliver

- Performance and accessibility risk checklist for the changed flow.
- Before and after evidence using comparable scope.
- UI fixes for accepted performance or accessibility issues.
- PR-ready quality-gate summary with residual risk.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Accessibility evidence covers keyboard, labels, focus, and screen-reader relevant state for the changed flow.
- Performance evidence uses a stated budget or comparison point, not an isolated score.
- Before and after reports are comparable and tied to the same user path.
- A fresh agent can tell whether the PR is safer after reading the evidence summary.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
