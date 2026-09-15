# TDD Evidence — Team Invitations

## Red

Command: `npm run test:invitations`

```
> team-collaboration-app@0.1.0 test:invitations
> node ./scripts/run-invitation-tests.mjs

Invitation tests failed: implement createInvitation, acceptInvitation, and revokeInvitation in src/services/invitationService.ts.
```

Exit code: 1

The protected suite `tests/invitationService.test.ts` (16 tests, unmodified) fails before any
production code is written because the starter `src/services/invitationService.ts` throws
`"Invitation lifecycle is not implemented"` for every export. This is the fixed, executable spec
for the feature — per `docs/invitation-contract.md`, so no new test file was written; the RED
step is confirming this failing baseline before touching production code.

## Green

Command: `npm run test:invitations`

```
> team-collaboration-app@0.1.0 test:invitations
> node ./scripts/run-invitation-tests.mjs

✔ authorized creation normalizes email and uses the configured expiry (2.3803ms)
✔ an active admin listed in inviteRoles may create an invitation (0.8187ms)
✔ members and suspended actors cannot create invitations (0.2434ms)
✔ target roles and the guest policy are enforced (0.2021ms)
✔ invalid email addresses are rejected without mutation (0.187ms)
✔ existing member email comparison is case-insensitive (0.1223ms)
✔ an unexpired pending invitation blocks a case-insensitive duplicate (0.1829ms)
✔ an expired pending invitation does not block a replacement (0.162ms)
✔ duplicate invitation identifiers are rejected (0.1333ms)
✔ accepting a pending invitation adds one member and finalizes the invitation (0.3567ms)
✔ expired invitations cannot be accepted (0.1198ms)
✔ accepted and revoked invitations cannot be accepted (0.1169ms)
✔ acceptance rejects a duplicate member identifier (0.0811ms)
✔ an authorized actor may revoke a pending invitation only once (0.1847ms)
✔ unauthorized actors and expired invitations cannot be revoked (0.1035ms)
✔ unknown invitation identifiers are rejected (0.1178ms)
ℹ tests 16
ℹ suites 0
ℹ pass 16
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 134.1794
```

Exit code: 0

All 16 tests passed after implementing `createInvitation`, `acceptInvitation`, and
`revokeInvitation` in `src/services/invitationService.ts` per
`docs/superpowers/plans/2026-09-15-team-invitations-plan.md` Task 2. No test file was edited.
