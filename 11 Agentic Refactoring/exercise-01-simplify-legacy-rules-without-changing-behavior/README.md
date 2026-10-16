# Simplify Legacy Rules Without Changing Behavior

## Your Mission

A legacy eligibility function has nested decisions and surprising results. An agent can make it look cleaner while silently changing which rule wins.

Simplify the decision structure while preserving its existing behavior. Establish a safety net that can distinguish a correct refactor from a plausible but incorrect one. Suspected product bugs belong in a separate change.

## Project

[behavior-refactor-app](./behavior-refactor-app) contains the editable function, twelve golden examples, a protected original, and an incorrect candidate with a subtle threshold change. A differential runner compares implementations over generated inputs using fast-check.

Use the [setup instructions](./docs/setup.md). Time box: 60 minutes after setup.

## How To Go About It

1. Inspect the public function and record observed behavior in `evidence/before.md`, including overrides and unexpected rejection reasons.
2. Write a public characterization test, capture the twelve baseline outputs, and commit both before production changes. Keep them unchanged afterward.
3. Run the differential checks. Inspect the incorrect candidate's shrunk counterexample and replay it. Explain which behavior the check protects and the limits of the generated input domain.
4. Use the **[refactor skill](https://github.com/github/awesome-copilot/blob/main/skills/refactor/SKILL.md)** to improve only the legacy rule module through small, focused changes. Preserve output fields, exact strings, thresholds, and override precedence.
5. Run the same characterization and differential checks, capture the final outputs and report, and explain the structural improvement in `evidence/after.md` and `evidence/comparison.md`. Fewer lines alone do not establish maintainability.

## Evidence

Submit the precommitted test, implementation, before/after snapshots, generated comparison report, behavior decisions, and skill-use transcript. Follow the [evidence instructions and template](./docs/evidence-template.md) for phase captures, source citations, and sealing.

Run `npm run verify:exercise` from `behavior-refactor-app/` and open one focused PR using the [submission standard](../../docs/SUBMISSION_STANDARD.md).

## Completion Criteria

The unchanged characterization test and all twelve golden outputs pass. Three reproducible runs cover 3,000 generated comparisons; the supplied incorrect candidate is rejected and its counterexample replays. The safety net preserves documented surprises, and the explanation identifies a concrete structural improvement. Verification passes with evidence recorded before and after the refactor.
