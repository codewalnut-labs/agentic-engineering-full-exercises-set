# Team Invitations — Design

**Classification:** Bounded (per `superpowers:brainstorming`) — the invitation lifecycle already
has a stub service (`src/services/invitationService.ts`) and a scaffolded UI (`src/App.tsx`),
governed by a fixed contract (`docs/invitation-contract.md`) and a fixed, protected test suite
(`tests/invitationService.test.ts`, 16 tests). This is a well-scoped change to an existing flow,
not a new subsystem.

**Approved by:** the user, in chat, on 2026-09-15, after reviewing this design summary
(authorization, duplicate/normalize, guest policy, expiry, accept/revoke single-use, immutable
rejection, and the client-clock mitigation) presented in the `superpowers:brainstorming` session.

## Context reviewed before designing

- `docs/invitation-contract.md` — exact function signatures, inputs, error codes, and rules.
- `docs/feature-request.md` / `docs/support-incidents.md` — duplicate membership, policy bypass
  via an unsafe legacy helper (`src/legacy/quickInvite.ts`, must not be reused), reused/expired
  invitation acceptance, and partial rejection (validation must run before any state mutation).
- `evidence/before.md` and `evidence/before.patch` — the unstructured first attempt. It passed the
  16 fixed tests but left one un-tested risk: `now` was computed with
  `new Date().toISOString()` inside the browser and handed to the service, so a user who rolls
  back their system clock can accept or revoke an invitation the workspace policy meant to have
  already expired.
- `src/services/teamPolicy.ts`, `src/data/team.ts`, `src/types.ts` — existing authorization
  primitive (`canManageInvitations`) and the `WorkspacePolicy` / `TeamMember` / `TeamInvitation`
  shapes the service must operate on. These files are protected (challenge-integrity) and are
  read-only inputs to this design.

## Components

### 1. `src/services/invitationService.ts` (replace the stub)

Pure functions, no mutation of input `state`. Every rejection returns the exact input `state`
reference unchanged; every acceptance returns a new `state` built from spread/`map`/concat, never
in-place array mutation — this is what closes the "partial rejection" incident (validate
everything before creating any new array).

- **Authorization (`createInvitation`, `revokeInvitation`):** actor must exist, be
  `status === "active"`, and have `policy.inviteRoles.includes(actor.role)` — one shared
  authorization check for both entry points, reused rather than re-implemented.
- **Role / guest policy (`createInvitation`):** target role must be `member` or `guest`
  (`INVALID_ROLE` otherwise); `guest` additionally requires `policy.allowGuestInvites`
  (`GUEST_DISABLED` otherwise).
- **Normalization / duplicates (`createInvitation`):** email is trimmed and lowercased before
  every comparison and before storage. Rejects: `INVALID_EMAIL` (format check), `MEMBER_EXISTS`
  (case-insensitive match against `state.members`), `INVITATION_PENDING` (case-insensitive match
  against an invitation that is still `pending` **and** unexpired — an expired pending invitation
  does not block a replacement), `DUPLICATE_INVITATION_ID`.
- **Expiry:** `expiresAt = now + policy.defaultInviteExpiryDays` (whole UTC days) is set on
  create. `acceptInvitation` and `revokeInvitation` both reject `INVITATION_EXPIRED` when
  `invitation.expiresAt <= now`.
- **Single-use accept/revoke:** both require `invitation.status === "pending"`; anything else
  (`accepted` or `revoked`) is `INVITATION_FINAL` — so accept/revoke are terminal, one-shot
  transitions. `acceptInvitation` also rejects a duplicate `memberId` (`DUPLICATE_MEMBER_ID`) and,
  on success, appends exactly one new active member using the normalized email and the invited
  role, and marks the invitation `accepted`. `revokeInvitation` marks the invitation `revoked` and
  touches no member data.
- **Unknown invitation id:** `INVITATION_NOT_FOUND` for both accept and revoke.
- Does not import `src/legacy/quickInvite.ts` (the unsafe prototype named in the support
  incidents — it mutates the members array directly with no authorization or validation).

### 2. `src/services/clock.ts` (new)

`now(): string`, anchored once at module load: `bootEpochMs = Date.now()`,
`bootPerf = performance.now()`, then `now()` returns
`new Date(bootEpochMs + (performance.now() - bootPerf)).toISOString()`. `performance.now()` is
monotonic and independent of the OS wall clock, so rolling the system clock backwards *after* the
page has loaded can no longer un-expire an invitation through the UI. This directly mitigates the
risk recorded in `evidence/before.md`. Residual gap, stated plainly rather than hidden: a page
reload after rolling the clock back still re-anchors `now()`, because this is a client-only demo
app with no backend or trusted time source in scope for this exercise.

### 3. `src/components/TeamInvitations.tsx` (new) + `src/App.tsx` (modified)

A single "Team Invitations" section owns the full `InvitationState` (members, invitations,
policy) via `useState`, seeded from `src/data/team.ts`. It renders:

- an actor selector ("Acting as") so authorization and its rejection are demonstrable in the UI,
- a create-invitation form (email, role — guest option disabled in the UI, and still rejected by
  the service, when `policy.allowGuestInvites` is false),
- a list of invitations (id, email, role, status, expiry) with Accept / Revoke actions on pending
  entries,
- inline error text driven by `InvitationActionResult.code` for every rejection path.

Every action calls `createInvitation` / `acceptInvitation` / `revokeInvitation` from
`invitationService.ts` with `now()` from `clock.ts`, and replaces local state with
`result.state` — so the UI never re-implements a rule from the contract. `App.tsx`'s existing
member grid is switched from the static `members` import to this lifted state so an accepted
invitation appears there immediately. No component keeps a second copy of the lifecycle rules.

## Data flow

`TeamInvitations` state → user action (create/accept/revoke) → `invitationService.*(state, input)`
→ `InvitationActionResult` → on `ok: true`, replace state and clear the form / show success; on
`ok: false`, keep state as-is (it's the same reference) and render `result.code` as the error.

## Error handling

Every service rejection is a typed `InvitationErrorCode` (already defined in the protected
`src/types.ts`) surfaced verbatim in the UI, never swallowed. No `throw` in the service for
expected rule violations — only the return-based `InvitationActionResult` contract, matching
`docs/invitation-contract.md`.

## Testing

`tests/invitationService.test.ts` is protected and already fails (the stub throws
`"Invitation lifecycle is not implemented"`) — that is this feature's RED state, per
`superpowers:test-driven-development`. No new test file is needed; the fixed suite is the
executable spec. Implementation proceeds until `npm run test:invitations` is GREEN (16/16), then
review, then final verification (`npm run agent:check`, `npm run submission:verify`).
