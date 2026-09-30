# Rollback and authorization safety

Immediate rollback is the injected `cardSliceEnabled` switch. Only literal `true` enables the new card slice; `false` and every other value send card requests directly to the unchanged injectable `legacy` implementation. Gift-card, invoice, and unknown payment types always stay on legacy regardless of the flag.

Failure fallback is deliberately narrower. The router calls legacy exactly once only when the thrown object has its own `authorizationCreated` property set to `false`. An inherited value is not explicit proof. This boundary prevents a malformed failure from authorizing a duplicate legacy payment.

When `authorizationCreated` is true, absent, ambiguous, malformed, or primitive, the router makes no legacy call. It returns a complete valid public result supplied by the error or a calculated `PAYMENT_STATE_UNKNOWN` result. This no duplicate rule prevents uncertain and completed authorizations from being retried through legacy while preserving a reversible flag-off path.
