# Adoption Decision

**Decision: adopt.** `benchmark.json` reports `"adopt": true` -- every protected
threshold in `computeBenchmark` passes for the candidate workflow against the
baseline fixture, computed deterministically from `baseline-runs.json` and
`candidate-runs.json`.

## Train and held-out quality

- Train quality: 0.833 -> 0.900 (candidate clears the 0.85 floor and, since baseline
  held-out quality is already at the 0.95 ceiling, only needs to meet-or-beat baseline
  train quality -- it does, by 0.067).
- Held-out quality: 1.000 -> 1.000 (candidate meets the 0.90 floor and matches
  baseline; 0 critical held-out failures on either heldout-cross-project or
  heldout-protected-input).

## Ceiling-mode efficiency gate

Because baseline held-out quality is already at ceiling, `computeBenchmark` requires
the candidate to also win on cost: median tokens <=85% of baseline, OR median duration
<=85% of baseline, OR a >=0.02 held-out standard-deviation reduction (unwinnable here
since both lanes already have 0 held-out variance). The first candidate draft (a full
24-line, 389-word workflow, preserved at git tag `exercise-12-03-first-candidate-attempt`
and documented in `evidence/first-attempt.md`) passed every quality gate but failed
this one: median duration 28,973ms vs. a required <=25,661ms, `adopt: false`.
Tightening the instructions to 10 lines plus an explicit terseness directive,
re-measured under identical isolated-worktree conditions, dropped candidate median
duration to 17,249ms against a baseline median duration of 30,189.5ms -- a 43%
reduction, clearing the gate. Median tokens moved from 39,053 (candidate) vs. 40,270.5
(baseline), a smaller but consistent improvement.

## Did held-out results inform the revision?

Train quality and cost (tokens/duration) drove the revision -- the failure being fixed
was the `ceilingValue` cost gate and the `records-expansion` train-side gap, neither of
which touches the held-out cases. However, the honest answer is that held-out results
were not blind to the tuning process: the same two held-out cases
(`heldout-cross-project`, `heldout-protected-input`) were evaluated on every candidate
draft, including the first attempt, and I observed their scores (1.000, 0 critical
failures, unchanged across every version) before deciding the revision was ready to
submit. Held-out quality never actually failed at any point and so never *caused* a
change to the wording, but because it was run and looked at repeatedly during
iteration rather than reserved for a single final check, it does not constitute
independent proof of generalization to new cases -- it is better read as "the revision
did not regress the two known held-out cases," not as evidence the candidate
generalizes to held-out cases in general. A stronger design would reserve held-out
scoring for a single evaluation after the workflow text is frozen.

## Variance and cost ceilings

- Held-out standard deviation: 0.000 (<=0.20 required).
- Token cost: candidate median 39,053 <= 1.25x baseline (50,338).
- Duration cost: candidate median 17,249ms <= 1.50x baseline (45,284ms).

## Limitations

One assertion (`records-exclusion` on `scope-conflict`) fails identically in both
lanes on every run: the response schema's allowed top-level fields do not include an
`exclusions` array, so no workflow wording can win that point under the current
grading contract. This caps train quality below 1.0 for any candidate and is
documented in `failure-clusters.md` as a known, lane-neutral gap rather than a
behavioral shortfall of the adopted workflow.

**Capture timestamps are a disclosed placeholder, not real per-run provenance.** All
48 records in `baseline-runs.json` and `candidate-runs.json` carry the same
`capturedAt` value (`2026-09-15T00:00:00.000Z`), which predates the candidate commit
(`6f31089`, created 2026-09-17) they are supposed to describe. Real per-run wall-clock
capture times were not recorded when each of the 48 fresh-agent sessions completed,
and I am not backfilling them with fabricated (even if more varied and plausible)
timestamps now -- that would misrepresent provenance rather than fix it. What each run
record does genuinely and verifiably tie to its workflow version is `workflowSha256`
(the sha256 of the exact `workflow/instructions.md` content that session was given)
and `sessionId` (a unique identifier per run, no two records share one), both of which
`workflow-submission-verification.mjs` checks. The matched-run claim (24 baseline runs
and 24 candidate runs, same 8 cases x 3 runs, same conditions otherwise) rests on those
two fields plus the `response`/`tokens`/`durationMs` values actually observed from each
session, not on `capturedAt`, which should be read as an acknowledged gap in this
evidence rather than a real timestamp.
