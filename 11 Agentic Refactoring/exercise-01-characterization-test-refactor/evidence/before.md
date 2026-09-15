# Unconstrained Attempt Evidence

## Conditions

- Starting commit: `94687b092fe695b5ce2f6a8848f8c26180bd09b5`
- Implementation commit: `c27fce127ba76beb014975d6ab8bdfae9adee4e5`
- Branch: `refactor/renewal-rule-unconstrained`
- Agent: Codex delegated coding agent, fresh session
- Model: inherited GPT-5-family Codex session configuration; the runtime did not expose a more specific deployment label
- Reasoning configuration: medium
- Tools and permissions: repository filesystem, shell commands, and Git inspection; workspace writes allowed and network restricted
- Time limit: 10 minutes
- Human hints after dispatch: none
- Retries or corrections: none
- Patch: `evidence/before.patch`

The fixed request shared by both attempts was: “You are performing a single first-attempt refactor. Refactor only `legacyEligibility.mjs` to simplify its internal decision structure while preserving observable behavior. Do not edit any other file. Run relevant existing checks. Do not ask for clarification, and do not revise the implementation after seeing check results. Stop after reporting the patch and check results.”

## Result

The agent replaced mutable accumulator variables and nested `else if` blocks with explicit early-return result objects. The patch changed one path, adding 26 lines and removing 20 lines. The agent did not create tests or edit protected inputs.

The protected oracle reported all ten observations as passing. Its JSON output SHA-256 was `5ce2adedc6dcb063b8ba99dbb1a2bbd49755e3e92437548b806dcea56aa98bab`; zero cases, result fields, values, reason strings, validation gaps, or decision outcomes changed.

`npm run verify:exercise` reached the typecheck and exited `127` because dependencies were not installed in the isolated worktree. A separate `npm run test:oracle` printed all ten protected passes and then exited `1` because the intentionally unconstrained branch did not contain the required characterization-test file. `git diff --check` exited `0`. The implementation was not changed after those command results.
