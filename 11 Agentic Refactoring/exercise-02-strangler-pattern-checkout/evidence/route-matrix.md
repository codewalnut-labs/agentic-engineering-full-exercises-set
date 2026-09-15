# Route matrix

| Request | Flag | Route | New slice calls | Legacy calls | Result |
|---|---:|---|---:|---:|---|
| card | literal `true` | new slice | 1 | 0 | approved or declined public result |
| card | flag off | legacy | 0 | 1 | unchanged legacy result |
| gift-card | on or off | legacy | 0 | 1 | compatibility preserved |
| invoice | on or off | legacy | 0 | 1 | compatibility preserved |
| unknown | on or off | legacy | 0 | 1 | compatibility preserved |
| card, pre-authorization failure with own `authorizationCreated: false` | on | new slice, then legacy | 1 | 1 | one safe fallback |
| card, `authorizationCreated: true` | on | new slice only | 1 | 0 | valid public error result or unknown state |
| card, inherited/missing/ambiguous/malformed/primitive failure | on | new slice only | 1 | 0 | `PAYMENT_STATE_UNKNOWN` |

The protected check exercises one enabled card route, three named non-card compatibility routes (including the unknown `crypto` type), one flag off route, one safe pre-authorization fallback, and five unsafe failures. Participant checks add truthy non-boolean flags, inherited fallback state, and malformed result fields. No unsafe case invokes legacy, so no request can be authorized twice through fallback.
