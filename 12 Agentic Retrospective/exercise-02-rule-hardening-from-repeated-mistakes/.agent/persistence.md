# Persistence Rules

These rules apply when writing durable filters, settings, or preferences. They do not apply to UI rendering, human-readable exports, or logs.

- **Identity**: store the stable ID, never a display label. Display labels are presentation-only and can be renamed without breaking saved state. Durable identity fields are named with an `Id` suffix (for example `ownerId`), never the bare entity name, so it is always clear at a glance that a field holds an identifier and not a display object or label.
- **Enums**: store enum-like values (status, channel, etc.) as trimmed, canonical lowercase strings -- never raw, title-cased, or uppercase input. Store the canonical value under its own plain field name (for example `status`), not the source field's `*Label` name.
- **Time**: business builders must accept a caller-provided clock function and call it for the current time. Never call `Date.now` or `new Date` directly inside domain or business logic. The clock function's return value is already the final timestamp to store -- use it directly and do not call `.toISOString()` or any other Date method on it.
- **Shape**: a durable record must contain only its identity, canonical, and timestamp fields -- no extra or renamed copies of the input.
- **Exceptions**: any deviation from these rules needs an explicit product contract and a focused test proving the deviation is intentional.

Verify with `npm run test:persistence` before committing.
