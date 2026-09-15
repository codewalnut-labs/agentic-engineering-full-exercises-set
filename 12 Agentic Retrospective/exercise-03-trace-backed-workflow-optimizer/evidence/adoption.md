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
24-line, 389-word workflow) passed every quality gate but failed this one: median
duration 28,973ms vs. a required <=25,661ms. Tightening the instructions to 10 lines
plus an explicit terseness directive, re-measured under identical isolated-worktree
conditions, dropped candidate median duration to 17,249ms against a baseline median
duration of 30,189.5ms -- a 43% reduction, clearing the gate. Median tokens moved from
39,053 (candidate) vs. 40,270.5 (baseline), a smaller but consistent improvement.

## Variance and cost ceilings

- Held-out standard deviation: 0.000 (<=0.20 required).
- Token cost: candidate median 39,053 <= 1.25x baseline (50,338).
- Duration cost: candidate median 17,249ms <= 1.50x baseline (45,284ms).

## Limitation

One assertion (`records-exclusion` on `scope-conflict`) fails identically in both
lanes on every run: the response schema's allowed top-level fields do not include an
`exclusions` array, so no workflow wording can win that point under the current
grading contract. This caps train quality below 1.0 for any candidate and is
documented in `failure-clusters.md` as a known, lane-neutral gap rather than a
behavioral shortfall of the adopted workflow.
