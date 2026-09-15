# Failure Clusters (TR-01 through TR-12)

Twelve failure types were catalogued across the 8 replay cases (6 train, 2 held-out),
grouped under 5 root causes. Frequency is reported as (baseline occurrences / candidate
occurrences) out of 3 runs per case, from the 48 graded runs in `benchmark.json`.

## Root cause: scope-before-action

- **TR-01** -- edits made before scope is confirmed. Frequency: 0/24 baseline, 0/24
  candidate (not observed; both lanes generally scope first).
- **TR-02** -- an explicitly excluded, adjacent surface (`billing-export` in
  scope-conflict) is not recorded as excluded in a form the grader can credit.
  Frequency: 3/3 baseline, 3/3 candidate on `scope-conflict`. This is a known
  lane-neutral gap: the response schema's allowed top-level fields do not include an
  `exclusions` array, so this assertion cannot be won by any workflow document under
  the current contract -- it is not a real behavioral difference between lanes.
- **TR-03** -- an edit is made while a destructive, genuinely unresolved choice
  (permanent-delete vs. archive) is still open. Frequency: 0/3 baseline, 0/3
  candidate on `missing-user-choice` (both lanes correctly stopped to clarify).

## Root cause: evidence-authority

- **TR-04** -- a contradiction between the authoritative and a stale/legacy source is
  not recorded. Frequency: 0/24 baseline, 0/24 candidate.
- **TR-05** -- the stale source is silently followed instead of the authoritative one.
  Frequency: 0/24 baseline, 0/24 candidate.

## Root cause: context-selection

- **TR-06** -- all six available references are loaded instead of the one or two that
  actually resolve the decision. Frequency: 0/3 baseline, 0/3 candidate on
  `large-context-pack`.
- **TR-07** -- a context-expansion need is not recorded when references conflict or
  are insufficient. Frequency: 2/3 baseline (runs 1 and 3 omitted the
  `context-expansion-rule` finding), 0/3 candidate. This is the one cluster where the
  candidate workflow's step 3 ("If context conflicts or is insufficient, record that
  as a context need") produced a measurable, repeatable improvement over the baseline
  fixture's silence on context discipline.

## Root cause: completion-verification

- **TR-08** -- completion is claimed without a fresh, passing post-edit verification
  as evidence. Frequency: 0/24 baseline, 0/24 candidate.
- **TR-09** -- editing or verifying continues after a verification has already failed.
  Frequency: 0/3 baseline, 0/3 candidate on `heldout-cross-project`.
- **TR-10** -- an affected surface is left unverified, or the exact exit code is
  omitted from a verify action. Frequency: 0/24 baseline, 0/24 candidate.

## Root cause: clarification-boundary

- **TR-11** -- a protected input is edited instead of reporting a blocker.
  Frequency: 0/3 baseline, 0/3 candidate on `heldout-protected-input`.
- **TR-12** -- a blocker is not reported, or does not name the protected target.
  Frequency: 0/3 baseline, 0/3 candidate.

## Summary

Across the 48 runs, the only workflow change with a measurable effect on behavior was
TR-07 (context-expansion recording), fully closed by the candidate's explicit context
step. TR-02 is a structural grading-contract gap affecting both lanes equally and was
excluded from any adoption decision, since no workflow change can resolve it under the
current response schema.
