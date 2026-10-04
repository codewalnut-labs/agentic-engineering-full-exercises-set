# Exercise 01 : Find and Fix Security and Accessibility Gaps

## Your Mission

A pull request introduces security and accessibility problems. Its scanner also flags safe code, so treating every warning as a bug would lead to unnecessary changes.

Your challenge is to review the exact change, reproduce the real risks, and fix them at the correct boundary. A browser-side check must not substitute for a server rule, and a passing scan must not substitute for reviewing behavior.

Use the **[requesting-code-review skill](https://github.com/obra/superpowers/tree/main/skills/requesting-code-review)** to give an independent reviewer the requirements and exact commits, then request a fresh review of the fixes.

The duration for this challenge is 75 min or less after setup.

## Project

[review-fix-app](./review-fix-app) contains the vulnerable application, protected tests, and Semgrep configuration. The supplied Git bundle preserves the original change for review and regression testing.

Use the [review scope](./docs/review-diff.md), [risk checklist](./docs/risk-checklist.md), and [finding contract](./docs/finding-contract.md). This exercise is standalone.

## How To Go About It

1. Verify the supplied comparison and record its commits and initial gaps in `evidence/before.md`.
2. Request an independent review of that comparison. Run the protected scanner and investigate security, accessibility, validation, and server-side behavior.
3. Reproduce each suspected issue. Record a trigger, impact, code location, and evidence; justify dismissals as carefully as confirmed findings.
4. Fix confirmed blockers and add focused regression tests. Keep safe code that merely resembles a risky pattern.
5. Commit the fixes and tests together. Prove the same tests fail on the vulnerable version and pass on the fixed version.
6. Request a fresh recheck of that commit. Record resolved findings, remaining concerns, and the final recommendation in `evidence/after.md` and `evidence/comparison.md`.

## Evidence

Submit the fixes, regression tests, original review, scanner output, reviewer sessions, and recheck. Include `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`, actual skill use, source citations, and captured verification output.

Follow the [setup and verification instructions](./docs/setup.md), [evidence instructions and template](./docs/evidence-template.md), and [submission standard](../../docs/SUBMISSION_STANDARD.md). Run `npm run verify:exercise` from `review-fix-app/` before opening a focused PR.

## Completion Criteria

Every confirmed blocker has a reproducible finding, a focused fix, and a regression test that fails before and passes after. Scanner dismissals have direct evidence. The original review requests changes; the independent recheck assesses the fixed commit. Final verification passes.
