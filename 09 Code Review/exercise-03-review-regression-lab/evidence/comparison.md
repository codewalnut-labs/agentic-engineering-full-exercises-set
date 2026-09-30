# Before and Post-review Validation Comparison

## Same conditions

The Before Baseline and retained After (Post-review Validation) lanes each contain three runner-captured sessions covering the identical protected historical regression, security regression, and clean control. Both lanes use Codex with GPT-5.6 Sol, read-only permissions, the same executable adapter, a nine-minute case limit, normalized prompts, and zero human hints or retries. Unique run nonces and transcript hashes prevent any result from being reused as another. The latter lane is labeled post-review validation because these are retained validation artifacts, not a new uncontrolled experiment.

## Proof

Every run records its source commit, protected diff hash, normalized prompt hash, transcript hash, adapter hash, runner hash, nonce, and session identifier. The scorer reconstructs metrics from those raw artifacts. The Baseline achieved 1.0 historical Coverage, 1.0 security Coverage, 0.7777777778 Precision, and 1.0 Clean control accuracy. It found all seven supported rules but reported nine blockers: two were duplicate reports of supported root causes, rather than demonstrated false positives. The Post-review Validation lane achieved 1.0 for all four metrics by consolidating those reports into exactly seven supported blockers. This is evidence of improved reporting precision for this protected sample, not proof of a general false-positive reduction.

The corrected evaluation rule tests that a specific status selection includes only that status. `All` is still the intentional wildcard and should include every item; the regression is that a non-`All` selection must compare `item.status === filters.status`. The protected change instead uses `item.status !== "Blocked"`, so it admits unrelated statuses and rejects `Blocked`. The previous wording incorrectly treated the wildcard selection as broken even though its branch remained true. This keeps the benchmark aligned with executable behavior instead of rewarding a fabricated finding.

## Conclusion

The improvement comes from a focused documentation change rather than protected case answers. The skill tells reviewers to inventory requirements, trace changed decisions through callers and observable state, exercise filter choices with representative truth tables, reproduce behavior before declaring a blocker, and consolidate findings by distinct rule or root cause. It names no protected case, file, anchor, or expected finding. Since every adoption gate passes, including no regression on security coverage or the clean control, the evidence-backed Decision is `adopt` for this sample.

## Harness ownership note

The separate maintainer-owned harness base for protected evaluator and verifier changes is [PR #116](https://github.com/codewalnut-labs/agentic-engineering-full-exercises-set/pull/116). This evidence-only comparison does not replace that ownership boundary. No protected evaluator input, challenge-integrity manifest, shared updater, verifier script, or other harness file was changed here.
