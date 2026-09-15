# After: guided first attempt

- Starting commit: `fb48d936ec2e6e205478614a4af4d2550662f650`
- Run base commit: `c9c11ddd489f7fe520d1cc92fe898ace603e18d2`
- Guidance commit: `c9c11ddd489f7fe520d1cc92fe898ace603e18d2` (adds only `AGENTS.md` and `.agent/persistence.md`, no implementation code)
- Implementation commit: `9e0bbbf2af1b545b1f5d6f543121ad13bbb7dc38`
- Agent and model: Claude Code Agent tool subagent (general-purpose, fresh session, no prior context), `claude-sonnet-5`
- Tools and permissions: full read/write/bash tool access, scoped by the identical ticket prompt to `AGENTS.md` (if present) and `rule-hardening-app/src/**`; explicitly forbidden from reading `docs/`, `fixtures/`, `evidence/`, `tasks/`, `rule-hardening-app/scripts/`, or any file with "test", "verify", or "grade" in its name
- Time limit: 20 minutes
- Human hints: 0
- Retries: 0
- Task prompt hash: `sha256:3beb136414c1ead0e70ec15fd169fbb57170f7508841223fdb28f7b45dbb2eda` (hash of the protected `tasks/proving-change.md`, identical to the before run -- the only repository difference is the presence of `AGENTS.md`/`.agent/persistence.md`)
- Patch: `evidence/after.patch`
- Patch SHA-256: `0f731d6685895022fa7006de18fe04c0f97c87c031033f6ffb94d564ba7e76f8`
- Files changed: 1 (`rule-hardening-app/src/services/filterPersistence.mjs`)
- Lines added / removed: +12 / -3

## Result

`AGENTS.md` was present and routed the session to `.agent/persistence.md` before it touched any code. `.agent/persistence.md` here contains only the three rules independently backed by two correction events each (see `evidence/rule-map.md`) -- no field-naming, clock-return-format, or record-shape specifics were added, since none of those are supported by `docs/correction-history.json`. Following that guidance, the session produced:

```js
export function buildSavedFilter(filter, clock) {
  return {
    ownerId: filter.owner.id,
    status: filter.statusLabel.trim().toLowerCase(),
    updatedAt: new Date(clock()).toISOString(),
  };
}
```

Grader exit code: 0 (zero defects)

Detected defects: none. Stable `ownerId` is stored instead of the display label, `status` is trimmed canonical lowercase, and `updatedAt` is derived from the caller-provided clock (the session defensively wrapped the clock's return value in `new Date(...).toISOString()`, which reproduces the exact same ISO string the grader's fixture already uses as its clock value, so this still matches byte-for-byte; the general rule did not need to forbid that call for this particular fixture). The record contains exactly the three required fields, the clock is called exactly once, and the input is not mutated. This is a genuinely fresh guided first attempt reaching zero defects from evidence-backed general rules alone.

One participant test (`rule-hardening-app/src/services/filterPersistence.test.mjs`) was added afterward in a separate commit (`40ba5652afb57505d3e6c1db648185123f63e22a`, directly following the implementation commit), proving the same owner resolves to the same stable `ownerId` across two saves under different display labels.

## Note on process history

An earlier round of this exercise ran a guided first attempt against a `persistence.md` draft that also included three additional specifics not derivable from `docs/correction-history.json` -- a mandatory `Id`-suffix naming convention, an explicit clock-return-format rule, and a durable-record-shape restriction. That draft's own defect list is not preserved in this evidence set: its raw patch and grading output were never committed as a separate artifact at the time, and after review flagged that those three specifics were unsupported by independent correction history, they were removed rather than searched for justifying evidence that does not exist. The guided attempt in this file is the one, complete, evidence-backed run: nothing here was reached by first observing a failure and then writing a rule to specifically patch it.
