# Regression Review Evaluation

## Baseline

The three Baseline runs were captured without the reusable skill. Historical Coverage and Security Coverage were both 1.0. Precision was 0.7777777778 because all seven supported rules appeared among nine blocking findings. The two excess blockers duplicated supported root causes within the historical case; they are not evidence of two false-positive defects. Clean control accuracy was 1.0 because the conforming immutable-sort refactor was approved.

## Skill-assisted

The three retained Post-review Validation runs used the same agent, model, adapter, protected diffs, prompts, permissions, and time limits, with only the hardened skill added. Historical Coverage remained 1.0, Security Coverage remained 1.0, Precision rose to 1.0, and Clean control accuracy remained 1.0. The precision change is specifically the consolidation of duplicate blocker reports in this sample; it is not a claim of measured false-positive reduction beyond that observation.

## Why the result changed

The skill requires an explicit acceptance-rule checklist, traces each changed decision through callers and observable state, and asks for before-state reproduction. It directs filter reviews to exercise the intentional wildcard and each specific category instead of sampling one path. For the status rule, `All` must remain a wildcard, while each named status must include only exact matches; the protected expression incorrectly admits every non-`Blocked` item for named selections. Its output contract requires one exact changed-line code anchor and one finding per distinct rule or root cause. Those constraints preserved completeness while preventing duplicate blockers in the retained validation. Explicit dismissal guidance preserved the clean approval path instead of rewarding noisy output.

## Decision

All gates pass: historical and security coverage are complete, precision is at least 0.8, the clean control is approved, and no metric regresses. Decision: `adopt` the reusable regression-review skill for this protected sample.

The separate maintainer harness base is [PR #116](https://github.com/codewalnut-labs/agentic-engineering-full-exercises-set/pull/116). Protected evaluator inputs and shared harness changes belong there; this evidence update intentionally does not modify them.
