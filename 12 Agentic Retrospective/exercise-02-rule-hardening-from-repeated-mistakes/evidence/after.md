# After: guided first attempt

- Starting commit: `fb48d936ec2e6e205478614a4af4d2550662f650`
- Run base commit: `f0bce01229007119d963cb99b6116d8bd27c4e5a`
- Guidance commit: `f0bce01229007119d963cb99b6116d8bd27c4e5a` (adds only `AGENTS.md` and `.agent/persistence.md`, no implementation code)
- Implementation commit: `f80f1895077bd04f1a6f1ce3eeb9f1b52ac8c93c`
- Agent and model: Claude Code Agent tool subagent (general-purpose, fresh session, no prior context), `claude-sonnet-5`
- Tools and permissions: full read/write/bash tool access, scoped by the identical ticket prompt to `AGENTS.md` (if present) and `rule-hardening-app/src/**`; explicitly forbidden from reading `docs/`, `fixtures/`, `evidence/`, `tasks/`, `rule-hardening-app/scripts/`, or any file with "test", "verify", or "grade" in its name
- Time limit: 20 minutes
- Human hints: 0
- Retries: 0
- Task prompt hash: `sha256:3beb136414c1ead0e70ec15fd169fbb57170f7508841223fdb28f7b45dbb2eda` (hash of the protected `tasks/proving-change.md`, identical to the before run -- the only repository difference is the presence of `AGENTS.md`/`.agent/persistence.md`)
- Patch: `evidence/after.patch`
- Patch SHA-256: `19d14739ef6dcbc7038e85c333368776d744156debb07fb833b3efc4446d6610`
- Files changed: 1 (`rule-hardening-app/src/services/filterPersistence.mjs`)
- Lines added / removed: +18 / -3

## Result

`AGENTS.md` was present and routed the session to `.agent/persistence.md` before it touched any code. Following that guidance, the session produced:

```js
export function buildSavedFilter(filter, clock) {
  return {
    ownerId: filter.owner.id,
    status: filter.statusLabel.trim().toLowerCase(),
    updatedAt: clock(),
  };
}
```

Grader exit code: 0 (zero defects)

Detected defects: none. Stable `ownerId` is stored instead of the display label, `status` is trimmed canonical lowercase, `updatedAt` comes from the caller-provided clock's return value used directly (no `Date.now`/`new Date`/`.toISOString()`), the record contains exactly the three required fields, the clock is called exactly once, and the input is not mutated.

One participant test (`rule-hardening-app/src/services/filterPersistence.test.mjs`) was added afterward in a separate commit (`907a19dd2c8662223bff8fe0fbb208419195409f`, directly following the implementation commit), proving the same owner resolves to the same stable `ownerId` across two saves under different display labels.
