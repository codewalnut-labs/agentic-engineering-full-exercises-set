# Superpowers Workflow Evidence — Before

## `evidence/before.md`

### Run

- Starting commit: fb48d93 (feat(exercises): align context and documentation challenges (#105))
- Implementation commit: 0761857 (feat(invitations): add team invitation lifecycle (before, no Superpowers))
- Agent: Claude Code (desktop app)
- Model: claude-sonnet-5
- Tools: Default Claude Code tool access (Read, Edit, Write, Bash, Glob, Grep)
- Permissions: Auto-accept edits
- Time limit: 60 minutes
- Attempt: 1
- Human hints: 0
- Superpowers available: No — without Superpowers, no design, plan, or review workflow was used before writing production code.
- Prompt: Add a Team Invitations section. An active owner or admin allowed by the workspace policy may invite an email as a member or guest. Guest invitations are allowed only when the workspace policy permits them. Prevent invitations for existing members or an email with a pending invitation. Invitations must use the configured expiry period and may be accepted or revoked only once. Rejected actions must not change invitation or member data.
- Patch: `evidence/before.patch`

### Results

| Proof | Result |
|---|---|
| `npm run test:invitations` | Pass; exit code: 0 (16/16 tests) |
| Invitation risks that failed | 0 automated test failures; 1 risk found on manual review (client-controlled timestamp, see below) |
| Design created before code | No |
| Failing test recorded first | No |
| Review completed | No |
| Files changed | 3 |
| Lines added and removed | `+341 / -11` |

### Important Problems

1. **Client-controlled expiry/single-use clock** — `src/App.tsx:39,55,70` pass `now: new Date().toISOString()` computed in the caller's own browser into `createInvitation`, `acceptInvitation`, and `revokeInvitation`. The service's expiry and single-use checks (invitation-contract.md: "Only a pending, unexpired invitation may be accepted/revoked") are otherwise correct, but they trust whatever `now` the client supplies, so a user who rolls back their system clock can accept or revoke an invitation the workspace policy meant to have already expired.
2. **No design produced before code** — nothing validated the authorization, guest-policy, or expiry boundaries against the invitation contract before `src/services/invitationService.ts` was written, so any contract rule not already covered by the fixed test suite would not have been caught systematically.
3. **No independent code review** — `src/services/invitationService.ts:1-160` and `src/App.tsx:32-79` were written and committed with no review step; the implementation happens to pass the given `tests/invitationService.test.ts` suite, but that is coincidental to the process rather than a result of verification.
