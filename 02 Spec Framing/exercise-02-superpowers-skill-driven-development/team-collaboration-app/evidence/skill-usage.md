# Skill Usage Evidence — Team Invitations

- Superpowers version or commit: skills fetched live from `obra/superpowers` at commit
  `HEAD` of that repository as of 2026-09-15 (the entry skill `using-superpowers` was already
  installed locally at `.agents/skills/using-superpowers/SKILL.md` per `skills-lock.json`;
  `brainstorming`, `writing-plans`, `test-driven-development`, `executing-plans`,
  `requesting-code-review`, and `verification-before-completion` were fetched via
  `gh api repos/obra/superpowers/contents/skills/<name>/SKILL.md` for this session, since only
  the entry skill ships in this repository's `.agents/skills/`).
- Design artifact: `docs/superpowers/specs/2026-09-15-team-invitations-design.md`
- Plan artifact: `docs/superpowers/plans/2026-09-15-team-invitations-plan.md`
- Design approval: The user was presented the design in chat (classification: Bounded, per
  `superpowers:brainstorming` — the invitation lifecycle already had a stub service and a
  scaffolded UI to change, governed by a fixed contract and a fixed test suite) covering
  authorization, duplicate/normalized-email handling, guest policy, expiry, accept/revoke
  single-use transitions, immutable rejection, and a monotonic-clock mitigation for the
  client-controlled-clock risk identified in `evidence/before.md`. The user was asked explicitly
  via a multiple-choice approval question and chose "Approve as-is", approving the design before
  any implementation began or `superpowers:writing-plans` was invoked.

## Skills used, in order

1. **`superpowers:brainstorming`** — Classified the request as Bounded, explored
   `docs/invitation-contract.md`, `docs/support-incidents.md`, `evidence/before.md`, and the
   protected type/policy/data files, presented a short design in chat, and obtained explicit user
   approval before any code or plan was written. Output: the approval, then
   `docs/superpowers/specs/2026-09-15-team-invitations-design.md` (written after approval, to
   satisfy this exercise's evidence requirement even though the Bounded path alone would not
   require a spec file).
2. **`superpowers:writing-plans`** — Turned the approved design into a fully bite-sized
   implementation plan with concrete code per step (no placeholders), file-by-file responsibility
   boundaries, and explicit interfaces between tasks. Output:
   `docs/superpowers/plans/2026-09-15-team-invitations-plan.md` (5 tasks).
3. **`superpowers:executing-plans`** (execution workflow selected: inline execution, in this
   session, over subagent-driven-development, because the tasks are small, tightly coupled around
   one file's shared helpers, and the plan already specified exact code) — Executed Tasks 1-4
   task-by-task: confirmed RED, implemented the service, added the clock helper, built the UI,
   ran typecheck/build, and manually verified the feature in a real browser (golden path: create →
   accept; edge cases: unauthorized rejection, guest-disabled rejection, single-use revoke).
   Output: the implementation commit `ab1d507` (`feat(invitations): implement invitation
   lifecycle and Team Invitations UI`).
4. **`superpowers:test-driven-development`** — The protected `tests/invitationService.test.ts`
   (16 tests) is the fixed executable spec. RED was confirmed before writing any production code
   (`npm run test:invitations` exit 1, stub throws); GREEN was confirmed immediately after
   implementing the service (`npm run test:invitations` exit 0, 16/16 pass), before moving to the
   UI task. Output: `evidence/tdd.md`.
5. **`superpowers:requesting-code-review`** — Dispatched an independent `general-purpose`
   subagent (not this session's history) with the base/head SHAs (`fb48d936ec2e6e205478614a4af4d2550662f650`..`ab1d507d75f7b08a698e807ecf454c582ea1e589`),
   the contract, the design, the plan, and the support incidents. The reviewer independently ran
   `npm run test:invitations` and `npm run typecheck` rather than trusting a self-report, and
   returned 2 Important findings (both fixed) and 3 Minor findings (acknowledged, 1 fixed as a
   drive-by, 2 deferred as out of scope). Output: `evidence/review.md`; the fix commit `7e12842`
   (`fix(invitations): address code review findings`).
6. **`superpowers:verification-before-completion`** — Ran the full verification chain
   (`npm run test:invitations`, `npm run submission:verify`, `npm run agent:check`) fresh, after
   the review fixes and after all evidence files existed, and recorded the actual exit codes
   before making any completion claim. Output: `evidence/after.md`.
