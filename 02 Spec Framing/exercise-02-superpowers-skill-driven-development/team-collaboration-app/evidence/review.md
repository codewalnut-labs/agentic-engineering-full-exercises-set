# Code Review Evidence — Team Invitations

Per `superpowers:requesting-code-review`, a `general-purpose` subagent was dispatched with a
precisely crafted context (description, the contract, the approved design, the plan, the support
incidents, and the fixed test file) — not this session's history — and given the exact review
range:

- Base: `fb48d936ec2e6e205478614a4af4d2550662f650`
- Head: `ab1d507d75f7b08a698e807ecf454c582ea1e589`

The reviewer independently ran `npm run test:invitations` (16/16 pass, exit 0) and
`npm run typecheck` (exit 0) rather than trusting a self-report, then walked
`docs/invitation-contract.md` rule by rule against `src/services/invitationService.ts`.

## Findings

### Strengths (acknowledged, no action needed)
- `invitationService.ts` is pure and immutable: every rejection returns the exact input `state`
  reference untouched (`reject()`), and every validation runs before any new array is built.
- Email normalization is applied consistently before every comparison and before storage.
- Expiry boundary (`expiresAt <= now`) is correct and consistent between accept and revoke.
- `src/legacy/quickInvite.ts` is not imported anywhere in the diff.
- The UI never re-implements a lifecycle rule; it renders `result.code` verbatim.
- No protected file (per `challenge-integrity.json`) was touched.

### Important — Should Fix

1. **Plan Task 5 (evidence capture and final verification) was not yet complete at review time.**
   - Severity: Important
   - File: `team-collaboration-app/evidence/` (missing `after.md`, `after.patch`,
     `skill-usage.md`, `comparison.md` at review time)
   - Resolution: This is exactly Task 5, executed immediately after this review — see
     `evidence/after.md`, `evidence/after.patch`, `evidence/skill-usage.md`,
     `evidence/comparison.md`, all written after this review and after a fresh full
     `npm run agent:check` / `npm run submission:verify` run (see `evidence/after.md`).
   - Verification: `evidence/after.md` records the exit codes for `npm run test:invitations`,
     `npm run submission:verify`, and `npm run agent:check`, all run after these files exist.

2. **`handleAccept`/`handleRevoke` in `src/components/TeamInvitations.tsx` called
   `onStateChange(result.state)` unconditionally, regardless of `result.ok`**, while
   `handleCreate` only did so on success — an inconsistent pattern that happened to be harmless
   (a rejection returns the same `state` reference, so React bails out of the re-render) but
   would silently break if `reject()` ever stopped returning the same reference.
   - Severity: Important
   - File: `src/components/TeamInvitations.tsx` (`handleAccept`, `handleRevoke`)
   - Resolution: Fixed — both handlers now guard on `result.ok` and only call `onStateChange`
     and set the success message on success, matching `handleCreate`'s pattern.
   - Verification: `npm run typecheck` (exit 0) and `npm run test:invitations` (16/16, exit 0)
     re-run after the fix; manual browser re-check of accept/revoke still works (see
     `evidence/after.md`).

### Minor — Acknowledged, deferred
1. Module-level `let invitationSequence` / `memberSequence` ID generators (`TeamInvitations.tsx`)
   are fine for this single-instance demo app but would collide across multiple mounted
   instances. Not fixed — out of scope for a single-page demo console; noted for any future
   multi-instance use.
2. The "Acting as" selector intentionally lists every member, including suspended/unauthorized
   ones, so the UI can demonstrate `UNAUTHORIZED` rejection per the plan's manual test step. Not
   a defect.
3. The shipped default actor selection initially used `state.members[0]`, a small drift from the
   design's `eligibleActors[0]`. Fixed — now defaults to the first eligible (active,
   policy-authorized) actor, falling back to `state.members[0]` if none exists, matching the
   design.

## Assessment

**Ready to merge:** With fixes (both Important items above resolved before this evidence file was
written; see `evidence/after.md` for the verification run performed after the fixes).
