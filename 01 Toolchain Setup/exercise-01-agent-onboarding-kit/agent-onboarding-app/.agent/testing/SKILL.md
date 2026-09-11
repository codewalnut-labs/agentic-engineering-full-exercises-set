---
name: support-router-testing
description: Use when changing filters, visible case counts, case ordering, routing behavior, or support dashboard UI. Use it to select focused checks and validate observable behavior without relying only on a successful build.
---

# Support Router Testing

## Verification Ladder

Run the narrowest useful check after each meaningful change, then run the full checks before committing:

1. `npm run verify:implementation` for the requested application behavior.
2. `npm run agent:check` for integrity, lint, tests, formatting, types, and build.
3. `npm run verify:exercise` for the final clean exercise verification.

Do not edit verification scripts, contracts, fixtures, or protected inputs to make a check pass.

## Observable Behavior

For any new or changed queue filter, verify all of these together:

- The control has a clear, stable label.
- The selected state is reflected in the UI.
- The displayed count equals the number of displayed cases.
- Every displayed case satisfies the filter's documented condition.
- Cases outside the condition are excluded.
- The existing triage ordering is preserved within the filtered results.
- The unfiltered and existing status-filtered views still behave as before.

Prefer behavior-level assertions over assertions about incidental implementation details. A helper may be refactored if the visible behavior and checks remain correct.

## Test Data Review

Before deciding that a filter works, inspect the complete sample set in `src/data/cases.ts`. Include boundary cases in reasoning, such as values exactly at a policy threshold, values just below it, and cases satisfying only one side of a combined condition.

When a scenario is not represented by the starter data, add or adjust data only when the repository contract allows it and the change is necessary to make the behavior testable. Avoid changing unrelated examples.

## Evidence

Record exact commands, pass/fail results, and exit codes in the exercise evidence. If a check fails, preserve the failure in the first-attempt record and describe the affected requirement rather than silently rerunning until it passes.

Before committing, inspect:

```text
git status --short
```

The final diff should contain only the requested application change, relevant tests or data, onboarding files, and required evidence.
