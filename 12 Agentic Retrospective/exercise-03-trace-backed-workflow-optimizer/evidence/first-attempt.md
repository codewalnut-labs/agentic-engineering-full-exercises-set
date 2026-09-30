# First candidate attempt (superseded)

This documents the original candidate workflow, preserved and distinguished from the
revised evaluation per review. The original commit is preserved at git tag
`exercise-12-03-first-candidate-attempt` (commit `20c770ea54709e55291b4d1a88d1058b5bfc44e6`,
a direct child of `baselineSha` `fb48d936ec2e6e205478614a4af4d2550662f650`, changing
only `workflow/instructions.md`) rather than only narrated in prose.

## The original candidate text

A 24-line, 389-word five-step workflow (scope confirmation, authoritative-source
resolution, deliberate context selection, fresh post-edit verification, stop-on-failure
and protected-blocker handling). Full text is at the preserved commit above; it is the
same five rules as the adopted version, with more verbose per-step prose and no
terseness instruction.

## Measured results (first full 24-run evaluation, isolated-worktree methodology)

- Train quality: 0.833 -> 0.900 (cleared the 0.85 floor)
- Held-out quality: 1.000 -> 1.000, 0 critical failures (cleared)
- Median tokens: baseline 40,270.5, candidate 40,601.5
- Median duration: baseline 30,189.5ms, candidate 28,973ms
- **Result: `adopt: false`.** Every threshold passed except `ceilingValue`: baseline
  held-out quality is already at the 0.95 ceiling, which requires the candidate to cut
  median tokens or duration by >=15% (or reduce held-out standard deviation by >=0.02,
  unwinnable here since both lanes already measure 0 held-out variance). Candidate
  duration (28,973ms) was only ~4% below baseline (30,189.5ms), short of the required
  15%.

**Disclosed limitation:** the 24 individual per-run response records (and their
per-run token/duration metadata) for this specific measurement were not retained as a
separate `candidate-runs.json` snapshot before they were cleaned up as scratch files;
what is preserved here is the aggregate benchmark summary as it was actually computed
and observed at the time (the numbers above), not a reconstruction or estimate. The
commit under evaluation (`20c770e`) is preserved exactly as it was, so the workflow
text itself is not in question -- only the raw per-run trace files are unavailable.

## What changed for the revision

The wording was tightened from 389 words / 24 lines to 162 words / 10 lines, and one
line was added asking the model to report tersely (fewer words per field, no restated
instructions, no narration). No change was made to the five rules' substance, scope,
or ordering. See `evidence/after.md` and `evidence/adoption.md` for the revised
evaluation and its result.
