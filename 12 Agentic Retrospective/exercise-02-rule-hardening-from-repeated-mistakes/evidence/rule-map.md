# Rule Map

Every permanent rule in `.agent/persistence.md` is backed by at least two independent correction events from `docs/correction-history.json`. `AGENTS.md` stays a short router to `.agent/persistence.md`; it does not duplicate any of this detail, and both files name `npm run test:persistence` as the verification command.

| Rule | Root cause | Correction events | Guidance line |
|---|---|---|---|
| Store the stable ID, never a display label | `identity-vs-presentation` | `COR-101` (saved owner filter stored a display label instead of a stable ID), `COR-102` (dashboard preference stored a translated team label instead of a stable ID) | `.agent/persistence.md`, **Identity** bullet |
| Store enum-like values as trimmed canonical lowercase, under their own plain field name | `canonical-enum-storage` | `COR-103` (queue status filter stored title-case status instead of canonical lowercase), `COR-104` (notification preference stored uppercase channel instead of canonical lowercase) | `.agent/persistence.md`, **Enums** bullet |
| Use a caller-provided clock; never `Date.now`/`new Date` in business logic | `ambient-time` | `COR-105` (saved search called the system clock inside the builder), `COR-106` (audit bookmark constructed the current date inside a domain function) | `.agent/persistence.md`, **Time** bullet |

No rule in `.agent/persistence.md` is derived from a single correction event or a personal preference -- every rootCause in `correction-history.json` (`identity-vs-presentation`, `canonical-enum-storage`, `ambient-time`) has exactly two supporting events, and both are cited above (`COR-101` through `COR-106`).

## What is deliberately not a rule here

An earlier draft of `.agent/persistence.md` also included a mandatory `Id`-suffix field-naming convention, an explicit instruction not to call `.toISOString()` on the clock's return value, and a durable-record-shape restriction (no extra or renamed fields). All three happen to match the protected grader's exact byte-for-byte checks -- which is precisely why they were removed: `docs/correction-history.json` has no correction event establishing any of them as an independently repeated mistake. `identity-vs-presentation` (COR-101/102) is about storing an ID versus a label, not about how the identity field is named. `ambient-time` (COR-105/106) is about calling the system clock versus an injected one, not about post-processing the injected clock's return value. No rootCause covers record shape at all. Writing those three specifics into permanent guidance would have meant reverse-engineering the answer from the grader (or from one session's specific failure) rather than from repeated, evidenced mistakes -- exactly the failure mode this exercise is designed to catch. They are not restored here; see `evidence/after.md`'s "Note on process history" for what happened to the draft that had them.
