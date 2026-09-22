# Approved Team Invitations Specification

This is the approved product specification for this exercise. Use these rules as fixed inputs; design choices remain yours. The supplied tests are acceptance examples, not a substitute for the specification.

## Scope and interfaces

Implement `createInvitation(state, input)`, `acceptInvitation(state, input)`, and `revokeInvitation(state, input)` in `src/services/invitationService.ts`, using the supplied types in `src/types.ts`. Each returns an `InvitationActionResult`. Errors use the supplied `InvitationErrorCode` values.

The application is an in-memory demonstration. Network delivery, authentication infrastructure, persistent storage, concurrent server requests, and production deployment are outside scope. Inputs use valid ISO timestamps and the supplied workspace policy shape.

## INV-01: Authorize actions

Creation and revocation require an existing active actor whose role is listed in `WorkspacePolicy.inviteRoles`. An owner is not automatically exempt from policy. Reject unauthorized actions with `UNAUTHORIZED`.

## INV-02: Enforce target roles

Only member and guest are valid invitation roles. Reject other roles with `INVALID_ROLE`. A guest requires `allowGuestInvites`; otherwise return `GUEST_DISABLED`.

## INV-03: Validate identity and duplicates

Trim and lowercase email addresses before storage and comparison. Require one @, nonempty local/domain parts, a dot within the domain, and no whitespace. Reject invalid addresses with `INVALID_EMAIL`.

Reject an existing member email with `MEMBER_EXISTS`, an unexpired pending invitation for that email with `INVITATION_PENDING`, and any reused invitation ID with `DUPLICATE_INVITATION_ID`. An expired or finalized invitation does not block a new invitation with a new ID.

## INV-04: Apply expiry

Use `defaultInviteExpiryDays` to set expiry from creation time. Expiry is reached when now is equal to or later than expiresAt. Expired invitations cannot be accepted or revoked; return `INVITATION_EXPIRED`.

## INV-05: Accept once

Acceptance takes invitationId, memberId, and now. Only a pending, unexpired invitation may be accepted. Add one active member with the normalized invitation email as name and email, the invited role, and lastActiveDays of zero; mark the invitation accepted.

Reject unknown invitation IDs with `INVITATION_NOT_FOUND`, finalized invitations with `INVITATION_FINAL`, and duplicate member IDs with `DUPLICATE_MEMBER_ID`. Repeating acceptance on the returned state must not add another member.

## INV-06: Revoke once

Revocation takes invitationId, actorId, and now. Apply INV-01 and INV-04. Mark a pending invitation revoked. Unknown IDs return `INVITATION_NOT_FOUND`; accepted or revoked invitations return `INVITATION_FINAL`. A revoked invitation cannot later be accepted.

## INV-07: Preserve state

Every function must leave its input state unchanged, including successful calls. A rejected result returns state unchanged by value and adds no invitation or member. Do not reuse the unsafe legacy helper.

Check authorization before other creation/revocation rules. After authorization, unknown or finalized invitations take precedence over expiry. For other simultaneous invalid conditions, any applicable documented error is acceptable.

## INV-08: Deliver a usable interface

Add a visible Team Invitations section using the shared service. Let the user choose an existing actor, enter an email and target role, create an invitation, and accept or revoke a pending invitation. Generate unique IDs for demo actions.

Show invitation email, role, status, and expiry; update membership after acceptance. Show useful rejection feedback without changing displayed invitation/member data. Keep all lifecycle rules in the service so UI actions cannot bypass them.

## Verification and permitted changes

Keep this specification, supplied tests, types, policy, data fixtures, scripts, and other protected inputs unchanged. Modify the invitation service, App.tsx, and styles; add focused supporting modules and learner tests under `tests/learner/`.

Trace INV-01 through INV-08 to design, plan tasks, implementation, and verification evidence. Include at least one learner-written regression test beyond the supplied examples. Demonstrate successful creation and acceptance, revocation, and a rejected action in the running UI.

If you discover a contradiction, record it and seek a decision. Do not quietly weaken a requirement to make tests pass.
