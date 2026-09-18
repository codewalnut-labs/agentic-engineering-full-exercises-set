# Failure Clusters (TR-01 through TR-12)

The 12 trace IDs and their failure/root-cause meanings below are reproduced verbatim
from `docs/failure-traces.json`, the exercise's supplied taxonomy. An earlier version
of this file invented its own failure descriptions and mis-assigned several trace IDs
to the wrong root cause (TR-04/TR-05 swapped; TR-06, TR-07, TR-09, TR-10 placed under
the wrong category). This version corrects that.

## Root cause: scope-before-action

- **TR-01** -- edited before confirming requested module.
- **TR-02** -- changed adjacent export outside request.
- **TR-03** -- assumed product choice and started implementation.

## Root cause: evidence-authority

- **TR-04** -- used stale rollout note over current contract.
- **TR-05** -- omitted contradiction from final reasoning.

## Root cause: completion-verification

- **TR-06** -- claimed completion after focused test only.
- **TR-07** -- did not record exit code for final command.
- **TR-08** -- continued changing code after a failed release gate.

## Root cause: context-selection

- **TR-09** -- loaded every reference before identifying decision.
- **TR-10** -- reloaded broad architecture context without need.

## Root cause: clarification-boundary

- **TR-11** -- left an important product option unresolved.
- **TR-12** -- silently chose destructive migration behavior.

## Which workflow change addresses which repeated failure

Each step of the candidate `workflow/instructions.md` targets one root cause:

- Step 1 ("confirm scope... stop and clarify... before editing") directly targets
  **scope-before-action** (TR-01, TR-02, TR-03) and, for destructive/unresolved
  choices, **clarification-boundary** (TR-11).
- Step 2 ("establish the authoritative source... record a contradiction... implement
  against the authoritative source") directly targets **evidence-authority**
  (TR-04, TR-05).
- Step 3 ("select context deliberately... record that as a context need") directly
  targets **context-selection** (TR-09, TR-10).
- Step 4 ("verify after every change... record the exact exit code... verify every
  affected surface") directly targets **completion-verification** (TR-06, TR-07).
- Step 5 ("stop on failure... do not claim unsupported completion... report a
  blocker") directly targets **completion-verification** (TR-08) and
  **clarification-boundary** (TR-12).

## What was empirically observed in the 48 graded runs

Frequency below is reported as (baseline occurrences / candidate occurrences) out of 3
runs per case. Across the 24 baseline and 24 candidate runs (`baseline-runs.json`,
`candidate-runs.json`, graded in `benchmark.json`), only two of the case assertions
failed at all:

- **`records-exclusion` on `scope-conflict`** (3/3 baseline, 3/3 candidate): the
  response schema's allowed top-level fields do not include an `exclusions` array,
  so this assertion cannot be won by any workflow document under the current grading
  contract. This is a schema-contract limitation, not an occurrence of TR-01/02/03 --
  neither lane actually edited before scoping or touched the adjacent surface; both
  correctly excluded `billing-export` in their `scope` actions, the grader simply has
  no field to credit that exclusion in.
- **`records-expansion` on `large-context-pack`** (2/3 baseline, 0/3 candidate): the
  model failed to record a context-expansion-rule finding despite the case genuinely
  requiring one. This falls under the **context-selection** root cause, but does not
  map cleanly to either TR-09 or TR-10's specific wording (both describe *over*-loading
  context; this failure is an omission to *flag* insufficient context, which the
  supplied taxonomy does not give a dedicated trace ID for). It is the one cluster
  where the candidate workflow's step 3 produced a measurable, repeatable improvement:
  2/3 baseline failures on this point, 0/3 candidate failures.

No other TR-01 through TR-12 category produced an observed failure in either lane
across these 8 replay cases; the cases were not designed to exercise every trace ID
individually; each case's assertions target a subset.
