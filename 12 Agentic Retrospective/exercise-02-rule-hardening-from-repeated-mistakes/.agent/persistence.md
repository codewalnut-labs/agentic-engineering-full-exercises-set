# Persistence Rules

These rules apply when writing durable filters, settings, or preferences. They do not apply to UI rendering, human-readable exports, or logs.

- **Identity**: store the stable ID, never a display label. Display labels are presentation-only and can be renamed without breaking saved state.
- **Enums**: store enum-like values (status, channel, etc.) as trimmed, canonical lowercase strings -- never raw, title-cased, or uppercase input. Store the canonical value under its own plain field name (for example `status`), not the source field's `*Label` name.
- **Time**: business builders must accept a caller-provided clock function and call it for the current time. Never call `Date.now` or `new Date` directly inside domain or business logic.
- **Exceptions**: any deviation from these rules needs an explicit product contract and a focused test proving the deviation is intentional.

Verify with `npm run test:persistence` before committing.
