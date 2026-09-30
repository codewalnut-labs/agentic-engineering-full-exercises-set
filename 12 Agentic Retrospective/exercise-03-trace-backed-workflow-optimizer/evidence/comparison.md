# Before/After Comparison

## Same conditions

Both the before (baseline fixture) and after (candidate workflow) lanes ran the
identical 8 replay-case requests, the identical JSON response contract, the same
agent and model (claude-general-purpose-subagent / claude-sonnet-5), no tools or
permissions, a 10-minute time limit, 0 human hints, and 0 retries -- recorded
identically in `before.md` and `after.md`. Every run used a freshly spawned,
isolated-worktree agent session (no shared context, no repository-specific system
prompt overhead) so cost measurements reflect the workflow text itself under the same
conditions in both lanes. The only variable that changed between lanes was which
workflow document (`fixtures/workflow-baseline.md` vs. `workflow/instructions.md`) was
given as process guidance.

## Proof

`evidence/benchmark.json` is generated deterministically by `computeBenchmark` from
`evidence/baseline-runs.json` and `evidence/candidate-runs.json` (24 runs per lane) --
see `npm run workflow:score` in `workflow-optimizer-app`. It reports:

- Train quality: before 0.833, after 0.900
- Held-out quality: before 1.000, after 1.000 (0 critical failures)
- Median tokens: before 40,270.5, after 39,053
- Median duration: before 30,189.5ms, after 17,249ms
- `"adopt": true` -- every threshold in `thresholds` is `true`

## Conclusion

The candidate workflow is adopted. It improves train quality (+0.067) without
regressing held-out quality, and -- after one revision to tighten the wording and add
an explicit terseness instruction -- clears the ceiling-mode efficiency gate that the
first draft missed, cutting median duration by 43% relative to before. The one
remaining gap (`records-exclusion` on `scope-conflict`) is a grading-schema
limitation shared identically by both lanes, not a behavioral difference between
before and after; see `failure-clusters.md`.
