# Starting File Ownership

A file reservation gives one active task permission to change that file. The starting board contains invalid reservations. Decide which to release before assigning an implementation agent.

| Requested path | Active reservation | Waiting card | Required action |
|---|---|---|---|
| `src/utils/scoring.ts` | ESC-120 and ESC-122 | ESC-122 | Keep ESC-120 only; release ESC-122. |
| `src/components/SeverityBadge.tsx` | ESC-120 | ESC-122 | Release after ESC-120 integration. |
| `src/services/workflowApi.ts` | ESC-118 | ESC-118 | Release until reproduction exists. |
| `src/services/exportApi.ts` | ESC-121 | none | Release because the card is cancelled. |

After ESC-120 is merged, release its files too. No card should retain an active reservation. ESC-122 still lists the files it would need, but cannot start until the product rule identified by `RULE-ESC-122` is approved.
