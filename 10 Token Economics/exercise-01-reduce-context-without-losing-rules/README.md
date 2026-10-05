# Reduce Context Without Losing Required Rules

## Your Mission

Your team's agent loads the entire documentation pack for a small refactor. Old migration notes and unrelated guidance compete with the rules it actually needs.

Build a context selector that loads less information, preserves mandatory instructions, and brings in extra guidance only when a question needs it. Use the selected context to refactor the session adapter without changing its behavior.

## Project

- Starter: [context-budget-app](./context-budget-app)
- Inputs: [refactor request](./docs/adapter-refactor-request.md), [source catalog](./docs/context-catalog.json), and [context contract](./docs/ledger-contract.md)
- Setup: [environment and commands](./docs/setup.md)
- Time box: 75 minutes

The selector currently loads everything and ignores its budget. The adapter works but needs the requested refactor. Context is measured in exact UTF-8 bytes; these are a reproducible size measure, not billed tokens.

## How To Go About It

1. Capture the starter's full-pack behavior and record the waste in `evidence/before.md`.
2. Use **[context-optimization](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/tree/main/skills/context-optimization)** to identify the smallest sufficient context. Commit your budget, mandatory sources, and open questions before changing code.
3. Implement the selector. Keep current mandatory rules first, reject impossible budgets, and explain every included or skipped source. An unanswered question must remain visible.
4. Refactor the adapter using the selected sources. Add tests for context selection and the adapter's preserved behavior, then capture the checks and actual selection.
5. Compare the original pack with the final selection. Explain what the byte reduction proves and what still needs a real model measurement.

## Evidence

Submit the selector, adapter, tests, context plan, selection ledger, and decision. Include `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`, and proof of skill use.

Follow the [evidence instructions and template](./docs/evidence-template.md) to capture checks, link claims to sources, and seal the evidence. Open one focused PR using the [submission standard](../../docs/SUBMISSION_STANDARD.md).

## Completion Criteria

- Selected context is smaller, within budget, and includes required current guidance.
- Every source has a reproducible inclusion or exclusion reason.
- The refactored adapter passes the protected behavior checks.
- The plan precedes implementation, and claims match captured evidence.
- `npm run verify:exercise` passes.
