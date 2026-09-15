# Comparison — Before vs After

## Fair Comparison

Both runs started from the identical commit (`fb48d93`), were given the identical, exact
production-change prompt (see the `Prompt:` field, byte-identical in both `evidence/before.md`
and `evidence/after.md`), used the same agent (Claude Code, desktop app), the same model
(`claude-sonnet-5`), the same tool access, the same permissions (auto-accept edits), and the same
60-minute time limit. Both were first attempts (`Attempt: 1`, `Human hints: 0`) with no retries or
corrections — the only condition that differed between the two runs was whether Superpowers was
enabled, so any difference in the result is attributable to the skill-driven workflow, not to a
different prompt, model, or agent.

## Results

### Authorization
- **Before:** Implemented an authorization check (active + `inviteRoles`) that passed all 16
  fixed tests, but it was written without a design step validating the rule against
  `docs/invitation-contract.md` first — correct by luck of matching the tests, not by a process
  that would have caught a gap the fixed suite didn't cover.
- **After:** The same rule (`isAuthorizedActor` in `src/services/invitationService.ts`) was
  derived directly from `docs/invitation-contract.md` during `superpowers:brainstorming`, written
  into the approved design before any code existed, and independently re-verified rule-by-rule
  against the contract by a separate `general-purpose` reviewer subagent in
  `superpowers:requesting-code-review` (see `evidence/review.md`) — not just "it passed the
  tests," but "an independent reviewer walked the contract against the code."

### Duplicate / normalized emails
- **Before:** Normalized and compared correctly (16/16 tests, including the case-insensitive
  duplicate and pending-duplicate tests).
- **After:** Same correctness, but the normalization function (`normalizeEmail`) and its use in
  every comparison (member match, invitation-pending match, storage) was written up explicitly in
  the design doc's "Normalization / duplicates" section before implementation, and the review
  subagent independently confirmed it (`evidence/review.md`, Strengths).

### Guest policy
- **Before:** Correctly gated `guest` invitations on `allowGuestInvites` (16/16 tests passing,
  including the guest-enabled/guest-disabled cases).
- **After:** Same behavior, additionally surfaced in the UI itself — the guest option in
  `src/components/TeamInvitations.tsx` is visibly disabled with "(disabled by policy)" text when
  `policy.allowGuestInvites` is false, verified live in a real browser (manual check, Task 4 Step
  5 of `docs/superpowers/plans/2026-09-15-team-invitations-plan.md`), not just by the automated
  suite.

### Expiry
- **Before:** Correctly computed `expiresAt` and correctly rejected expired accept/revoke
  attempts against the 16 fixed tests. But `evidence/before.md`'s own review recorded the
  un-tested risk: `now` was `new Date().toISOString()` computed in the browser and handed
  straight to the service, so a user rolling back their system clock could accept or revoke an
  invitation the workspace policy meant to have already expired — a real gap the fixed test suite
  (which supplies `now` directly, not through a browser clock) could not catch.
- **After:** Same expiry logic in the service, but `now` is supplied by
  `src/services/clock.ts` — a monotonic clock anchored once at page load (`Date.now()` +
  `performance.now()` deltas) so a client clock rollback after the page loads can no longer
  un-expire an invitation through the UI. This was identified as a design requirement during
  `superpowers:brainstorming` specifically because the before-run's evidence was reviewed as part
  of that step, and it's the single clearest case of the workflow directly preventing a repeat of
  a risk the first, unstructured attempt actually shipped.

### Acceptance and revocation (single-use)
- **Before:** Correctly rejected repeated accept/revoke and accept-after-revoke (16/16 tests).
- **After:** Same correctness; additionally exercised live in the browser (accept once, then
  confirm a second revoke attempt on an already-revoked invitation is rejected with
  `INVITATION_FINAL` and changes nothing) as part of the manual verification step, and the
  handlers were tightened during review so a rejected accept/revoke never calls the state-update
  callback at all (`evidence/review.md`, Important #2) rather than relying on it being harmless by
  coincidence.

### State mutation on rejection
- **Before:** All rejections returned the unmutated input state and passed the fixed
  `assert.deepEqual(result.state, original, ...)` assertions in every test.
- **After:** Same guarantee, but the design doc explicitly ties this rule to the "partial
  rejection" support incident (`docs/support-incidents.md`) and states the implementation
  strategy up front (validate everything before building any new array; every rejection returns
  the literal same `state` reference) rather than arriving at it only because the tests demanded
  it.

## Planning, tests, and verification process

- **Before:** No design document, no implementation plan, no pre-declared failing test, no
  independent review. `evidence/before.md` records "Design created before code: No", "Failing
  test recorded first: No", "Review completed: No."
- **After:** `superpowers:brainstorming` produced an approved design
  (`docs/superpowers/specs/2026-09-15-team-invitations-design.md`) before any code was written;
  `superpowers:writing-plans` turned it into a concrete, no-placeholder implementation plan
  (`docs/superpowers/plans/2026-09-15-team-invitations-plan.md`); `superpowers:test-driven-development`
  confirmed the fixed suite failed first (`evidence/tdd.md`, `## Red`, exit 1) before any
  production code and passed after (`## Green`, 16/16, exit 0);
  `superpowers:requesting-code-review` dispatched an independent subagent that found and required
  fixing two Important issues (`evidence/review.md`) that a self-review inside the same context
  window would have been more likely to miss; `superpowers:verification-before-completion` ran
  the full verification chain fresh, after the fixes, before any completion claim (`evidence/after.md`).

## Conclusion

The skill-driven workflow improved the result. Both implementations pass the same fixed 16-test
contract suite, so test-count parity alone doesn't distinguish them — the difference shows up in
what a fixed test suite can't catch and in the process guarantees behind the result. The before
run shipped a real, documented risk (a client-controlled clock capable of bypassing invitation
expiry) that its own after-the-fact review caught only once prompted to look; the after run's
`superpowers:brainstorming` step reviewed that exact evidence before writing any code and built
the fix (a monotonic clock) into the original design. The after run also has independent
verification the before run does not: a separate reviewer subagent walked the contract against
the implementation and found two real, now-fixed issues, and a documented red/green cycle proves
the tests were genuinely test-first rather than retrofitted. Both patches (`evidence/before.patch`,
`evidence/after.patch`) are different, real implementations of the same contract; the after
patch is the one built with a validated design, a written plan, proven test-first discipline, and
an independent review pass, and it closes a risk the before patch left open.
