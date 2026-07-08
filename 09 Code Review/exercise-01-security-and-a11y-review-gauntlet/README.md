**Exercise 01**

# Security and A11y Review Gauntlet

**Goal:** Review the supplied generated React diff for security, accessibility, and behavior regressions, then fix the highest-risk confirmed blocker.

**Outcome:** The top blocker from the generated diff is fixed with regression evidence, and all remaining findings are accepted, deferred, or dismissed with reasons.

## Start Here

Starter folders:
- [starter-react](./starter-react)

Seed files:
- [docs/review-diff.md](./docs/review-diff.md)
- [docs/risk-checklist.md](./docs/risk-checklist.md)
- [pr/review-target.diff](./pr/review-target.diff)

From the repository root, open the main starter:

```bash
cd "09 Code Review/exercise-01-security-and-a11y-review-gauntlet/starter-react"
npm install
npm run dev
```

Use the running app to inspect the current behavior, then complete the concrete deliverables below.

## Use These Practices

- [09. Code Review practice guide](../../COMPETENCY_PRACTICE_GUIDE.md#09-code-review)
- [OWASP Code Review Guide](https://owasp.org/www-project-code-review-guide/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [Completion rubric](../../AGENTIC_ENGINEERING_RUBRIC.md)

## Do This

1. Ask your coding agent to read `docs/review-diff.md`, `docs/risk-checklist.md`, `pr/review-target.diff`, and surrounding source files, then list possible security, accessibility, behavior, and test regressions.
2. Review the findings yourself and require each blocker candidate to include file reference, user impact, and exploit or failure path.
3. Choose the highest-risk confirmed blocker and have the agent fix it while preserving the intended change.
4. Add a regression check for the fixed blocker and a manual accessibility check where automation cannot prove behavior.
5. Re-review the patched diff with the original checklist and triage every remaining finding as fix, defer, or dismiss.
6. Run the relevant checks and capture output.
7. Run a clean-context review where a new agent tries to find a missed security or accessibility blocker.

## Deliver

- Severity-ranked review findings with evidence and disposition.
- Patch for the top confirmed security, accessibility, or behavior blocker.
- Regression test or manual check for the fix.
- Evidence note showing first review, fix, re-review, final command output, and remaining risk.

Do not commit `node_modules`, `dist`, `*.tsbuildinfo`, local env files, cache folders, or temporary logs.

## Verify

Done when:
- Every blocking finding is backed by code behavior and user or security impact.
- The top blocker is fixed without erasing the requested feature.
- Accessibility review includes keyboard and naming behavior, not only visual inspection.
- A fresh review pass does not find the same blocker again.

A README-only answer is not enough; the exercise is complete only when the working change and evidence are in place.
