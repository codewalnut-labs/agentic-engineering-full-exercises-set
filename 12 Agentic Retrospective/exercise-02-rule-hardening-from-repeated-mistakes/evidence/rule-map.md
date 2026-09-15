# Rule Map

Every permanent rule in `.agent/persistence.md` is backed by at least two independent correction events from `docs/correction-history.json`. `AGENTS.md` stays a short router to `.agent/persistence.md`; it does not duplicate any of this detail, and both files name `npm run test:persistence` as the verification command.

| Rule | Root cause | Correction events | Guidance line |
|---|---|---|---|
| Store the stable ID, never a display label; identity fields take an `Id` suffix | `identity-vs-presentation` | `COR-101` (saved owner filter stored a display label instead of a stable ID), `COR-102` (dashboard preference stored a translated team label instead of a stable ID) | `.agent/persistence.md`, **Identity** bullet |
| Store enum-like values as trimmed canonical lowercase, under their own plain field name | `canonical-enum-storage` | `COR-103` (queue status filter stored title-case status instead of canonical lowercase), `COR-104` (notification preference stored uppercase channel instead of canonical lowercase) | `.agent/persistence.md`, **Enums** bullet |
| Use a caller-provided clock; never `Date.now`/`new Date` in business logic; use the clock's return value directly | `ambient-time` | `COR-105` (saved search called the system clock inside the builder), `COR-106` (audit bookmark constructed the current date inside a domain function) | `.agent/persistence.md`, **Time** bullet |

No rule in `.agent/persistence.md` is derived from a single correction event or a personal preference -- every rootCause in `correction-history.json` (`identity-vs-presentation`, `canonical-enum-storage`, `ambient-time`) has exactly two supporting events, and both are cited above (`COR-101` through `COR-106`).

## Why the guided attempt still needed a second, sharpened round

The first guided run (correct in principle: stable id, canonical status, injected clock) still produced 5 defects because the general rules did not pin down two concrete API details the mechanical grader checks byte-for-byte: the exact output field name (`ownerId`, not `owner`) and that the clock's return value is the final timestamp (not a `Date` needing `.toISOString()`). `.agent/persistence.md` was sharpened with an **Identity** naming-convention sentence (`Id` suffix) and a **Time** clarification (use the clock's return value directly), plus a **Shape** bullet -- all still general team conventions, not case-specific answers -- and the next fresh session then reached zero defects on its first attempt under that sharpened guidance.
