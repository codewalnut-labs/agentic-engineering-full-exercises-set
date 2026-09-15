# Characterization-First Attempt Evidence

## Conditions

- Starting commit: `94687b092fe695b5ce2f6a8848f8c26180bd09b5`
- Characterization commit: `d2b2dcec249d9661bde003746cab68414d53dc4a`
- Behavior-decision commit: `b06839d9e5d43c01a536a5e86a8a98630db36430`
- Implementation commit: `d0eb445de725270d29bafe7759d6330420f4e8bc`
- Branch: `refactor/renewal-rule-characterized`
- Agent: Codex delegated coding agent, fresh session
- Model: inherited GPT-5-family Codex session configuration; the runtime did not expose a more specific deployment label
- Reasoning configuration: medium
- Tools and permissions: repository filesystem, shell commands, and Git inspection; workspace writes allowed and network restricted
- Time limit: 10 minutes
- Human hints after dispatch: none
- Retries or corrections: none
- Patch: `evidence/after.patch`

The fixed refactor request was identical to the unconstrained attempt. The controlled environmental difference was the committed public characterization test and baseline output already present in this branch.

## Result

The agent independently produced the early-return refactor captured in `evidence/after.patch`. The implementation commit changed only `legacyEligibility.mjs`, adding 26 lines and removing 20 lines. No production edit was made before the characterization commit.

`npm test`, `npm run test:oracle`, `npm run lint`, `npm run format`, and `git diff --check` exited `0` during the attempt. Typecheck and build could not start in the isolated worktree because dependencies were not installed; they exited `127`. The implementation was not revised after those results.

The after-oracle JSON SHA-256 is `5ce2adedc6dcb063b8ba99dbb1a2bbd49755e3e92437548b806dcea56aa98bab`, identical to the before snapshot. All ten cases preserve their exact fields, values, statuses, discounts, reasons, validation gaps, and decision order.
