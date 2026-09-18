# Refactor workflow comparison

## Same conditions

Both Before and After attempts started from `e134b7e7b3163db395144bfb163a06d24ad06507` and used fresh Codex CLI sessions with `gpt-5.6-sol`, medium reasoning, workspace-write permissions, the identical request, a 45-minute limit, zero human hints, and zero retries. The After run base adds only the exercise-required participant characterization test and baseline output.

## Before

The unconstrained attempt refactored production immediately. Its one-file patch uses 37 changed lines and passes the protected oracle, with no public behavior, reason-string, validation-gap, or decision-order difference. It lacks a participant-owned test seam and pre-change proof.

## After

The characterization-first attempt began from a committed behavior lock, then changed only the production module in a separate 48-line patch. Its test imports only `evaluateRenewalEligibility`; it does not reach private helpers. All 12 public outputs and exact reasons match the baseline.

## Proof

Both implementation patches are genuine first attempts. The protected oracle, participant test, output hashes, and byte comparison show zero changed cases. Git history proves characterization precedes the focused refactor, and the behavior-decision ledger documents every preserved suspected bug.

## Conclusion

Both agents happened to preserve behavior, but only the After workflow makes that safety independently reviewable before production changes. The extra test-first commit is the meaningful improvement; the refactor itself is not claimed to be smaller than the unconstrained version.
