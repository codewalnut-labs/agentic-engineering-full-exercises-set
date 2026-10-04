# Ship a Small Change Without a Broad Rewrite

## Your Mission

A request to update one export button could send an agent into shared components, styles, and unrelated cleanup. That creates extra reading, generated code, and review work.

Deliver the requested behavior inside a small, agreed scope. Prove that nearby behavior still works and explain which tempting changes you deliberately left out.

## Project

- Starter: [scope-budget-app](./scope-budget-app)
- Input: [change and scope contract](./docs/scope-contract.md)
- Setup: [environment and commands](./docs/setup.md)
- Time box: 45 minutes

The shared helper also serves checkout, delete, and other legacy actions. Only export should use `ds-secondary`. Your budget is two source files and at most 30 added-plus-deleted lines, including your test file.

## How To Go About It

1. Capture the current button behavior and record the requested change in `evidence/before.md`.
2. Inspect the callers. Commit a short scope plan identifying the helper, its test, and the shared areas that must stay unchanged.
3. Use **[test-driven-development](https://github.com/obra/superpowers/tree/main/skills/test-driven-development)** to write a failing behavior test, make the smallest sufficient change, and check the legacy actions.
4. Measure the final source diff against the plan. If it exceeds the budget, reduce the scope without removing useful assertions. Explain any result above 20 changed lines.
5. Replay the same learner tests against the starter and fixed helper. Record the actual diff, preserved behavior, and reasons for avoiding wider work.

## Evidence

Submit the helper change, regression tests, scope plan, Git-based scope ledger, and avoided-work record. Include `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`, and proof of skill use.

Follow the [evidence instructions and template](./docs/evidence-template.md) to capture checks, link claims to sources, and seal the evidence. Open one focused PR using the [submission standard](../../docs/SUBMISSION_STANDARD.md).

## Completion Criteria

- Export uses the new variant; checkout, delete, and unknown actions retain their behavior.
- The plan precedes implementation and the complete source diff stays within budget.
- The same tests expose the missing behavior in the starter and pass after the change.
- Evidence explains scope control without presenting changed lines as measured token or dollar savings.
- `npm run verify:exercise` passes.
