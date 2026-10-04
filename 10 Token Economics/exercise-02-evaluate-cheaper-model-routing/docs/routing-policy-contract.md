# Routing policy contract

Apply rules in this order:

1. Return `clarify` when risk is missing or unknown, ambiguity is high, or scope is unknown.
2. Return `reasoning` for high risk or cross-boundary scope.
3. Return `balanced` for medium risk or a three-file scope.
4. Return `fast` only for low-risk, low-ambiguity work with one-file or mechanical scope.
5. Return `clarify` for any unrecognized field combination.

The first matching rule wins. A cheaper tier never overrides clarification or high-risk safety. Model tiers are labels in a synthetic benchmark, not specific commercial models.

In the cost simulation, a failed fast call escalates once to balanced, a failed balanced call escalates once to reasoning, and a failed reasoning call retries once on reasoning. Charge the failed call as well as the additional attempt. There is no second retry.

The app dispatches the initial route; the protected scorer models this retry policy offline. Implementing live provider calls or an execution retry service is outside this challenge.
