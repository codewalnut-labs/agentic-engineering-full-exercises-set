# Simplify Legacy Rules Without Changing Behavior

## Your Mission

A legacy eligibility function is difficult to change, and some of its results look wrong. Callers may already depend on those results.

Simplify its decision structure without changing observable behavior. Your challenge is to establish what the function does today, preserve even the surprising cases, and show why the new structure is easier to maintain.

## Project

[behavior-refactor-app](./behavior-refactor-app) contains the legacy function and a protected behavior checker. The [golden cases](./docs/renewal-golden-cases.json) record its current outputs.

Support overrides, negative late-payment counts, and unexpected rejection reasons are part of this task's existing contract. Fixing those behaviors would require a separate change.

Use the [setup instructions](./docs/setup.md). Time box: 45 minutes.

## How To Go About It

1. Inspect the public function and record its current behavior in `evidence/before.md`. Separate observed behavior from what you think the rules should be.
2. Write a characterization test: a test that captures existing behavior through the public function. Run it against the starter, capture all golden-case outputs, and commit the test and snapshot before editing production code.
3. Refactor only `legacyEligibility.mjs`. Make the decision flow clearer while preserving inputs, result fields, exact reason strings, and decision order.
4. Use **[verification-before-completion](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion)** to run the unchanged tests and compare the complete before and after outputs.
5. Explain the structural improvement and document suspected bugs for future work. A green test proves the checked behavior stayed stable; it does not by itself prove the code is easier to understand.

## Evidence

Submit the characterization test, refactored function, before and after output snapshots, behavior decisions, and a short account of the structural changes. Include `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`, and proof of skill use.

Follow the [evidence instructions and template](./docs/evidence-template.md) to capture checks, cite sources, and seal the evidence. Open one focused PR using the [submission standard](../../docs/SUBMISSION_STANDARD.md).

## Completion Criteria

- The public characterization test and baseline snapshot precede production changes.
- Every protected output is identical, including surprising legacy behavior.
- Only the allowed function is refactored; the characterization test remains unchanged.
- The explanation identifies a concrete improvement in the decision structure.
- `npm run verify:exercise` passes.
