# Same conditions

Both fresh Codex gpt-5.6-sol implementation attempts used medium reasoning, the identical approved card-extraction prompt, workspace-write permissions, repository tools, a 45-minute cap, zero implementation hints, and zero retries. Both started from e134b7e7b3163db395144bfb163a06d24ad06507; the after run base adds only the participant-owned red router test. The recorded after source is the fresh agent's unchanged output.

# Before

`before.patch` contains the unconstrained agent's card slice, router change, and its own 77-line characterization test. The implementation passed the protected checkout suite. Card enabled used the new slice once; gift-card, invoice, unknown, and flag-off used legacy once each; safe fallback called each implementation once; unsafe failures called card once and legacy zero times.

# After

`after.patch` contains only `cardCheckout.mjs` and `checkoutRouter.mjs`, directly after the participant test commit. It preserves the route call counts and public results, requires literal flag enablement and own fallback proof, and rejects malformed error results while leaving the precommitted test untouched.

# Proof

The participant test failed at 5ae9b2d because enabled card produced `legacy: 1, card: 0`, then passed against the unchanged fresh-agent source at 87d70fb. The protected suite reports two legacy comparisons and eleven route checks. Patch hashes bind the diffs to their recorded implementation commits. Only an own `authorizationCreated: false` on a non-array object falls back; inherited, function, true, missing, malformed, Error, and primitive failures never call legacy.

# Conclusion

The unconstrained run passed the protected suite but left boundary ambiguity. The complete precommitted characterization guided a fresh agent to produce a passing unchanged implementation and proves test-first red/green ordering, exact two-file source scope, compatibility routes, literal flag rollback, strict canonical result validation, and the no-duplicate-authorization boundary.
