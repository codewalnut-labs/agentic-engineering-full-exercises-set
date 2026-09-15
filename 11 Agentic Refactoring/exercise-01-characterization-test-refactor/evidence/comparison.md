# Controlled Attempt Comparison

## Experimental setup

Both attempts started from `94687b092fe695b5ce2f6a8848f8c26180bd09b5`. They used fresh Codex coding-agent sessions with the same fixed request, inherited GPT-5-family model configuration, medium reasoning, tools, restricted-network permissions, 10-minute time limit, single-attempt rule, and no follow-up hints. The controlled difference was that the second branch contained commit `d2b2dcec249d9661bde003746cab68414d53dc4a`, which established the public characterization seam and baseline output before production edits.

## Results

| Measure | Unconstrained attempt | Characterization-first attempt |
| --- | --- | --- |
| Implementation commit | `c27fce127ba76beb014975d6ab8bdfae9adee4e5` | `d0eb445de725270d29bafe7759d6330420f4e8bc` |
| Agent patch | `evidence/before.patch` | `evidence/after.patch` |
| Changed source paths | Only `legacyEligibility.mjs` | Only `legacyEligibility.mjs` |
| Source line delta | +26 / -20 | +26 / -20 |
| Patch SHA-256 | `3245b2e73ad31d224e4d8f19bea0c94d4a0f2c1aaac8bce5b6a3d2862c019ea1` | `3245b2e73ad31d224e4d8f19bea0c94d4a0f2c1aaac8bce5b6a3d2862c019ea1` |
| Public behavior changes | 0 of 10 | 0 of 10 |
| Oracle output SHA-256 | `5ce2adedc6dcb063b8ba99dbb1a2bbd49755e3e92437548b806dcea56aa98bab` | `5ce2adedc6dcb063b8ba99dbb1a2bbd49755e3e92437548b806dcea56aa98bab` |

The two first-attempt source patches happened to be byte-identical. This means the experiment does not claim that the unconstrained agent failed. The meaningful difference is assurance and auditability: only the characterization-first branch proves through Git history that independent public observations were captured before the implementation changed.

## Contract comparison

- Public test seam: the characterization test calls only the exported `evaluateRenewalEligibility` function. It does not import helpers or assert internal call order.
- Result shape: `status`, `discountPercent`, and `reason` remain present with identical values in every case.
- Reason strings: `enterprise-tenure`, `payment-history`, `pro-tenure`, `legacy-support-override`, and `plan-not-supported` are unchanged.
- Validation gaps: negative late-payment values remain accepted; no validation was added.
- Decision order: support override still precedes enterprise arrears, enterprise handling still precedes pro handling, and unsupported cases retain the default.
- Source scope: the characterized refactor commit changes exactly one production file. Every later change is under `evidence/`.
- Command results: the protected oracle and public characterization report ten passes. The final refactor verifier and complete exercise verifier outputs are captured under `evidence/commands/` with exit code `0`.

The before and after JSON files compare byte-for-byte equal, and both agent patch files also compare byte-for-byte equal. Full SHAs in `history.json` make each statement traceable to the corresponding commit.
