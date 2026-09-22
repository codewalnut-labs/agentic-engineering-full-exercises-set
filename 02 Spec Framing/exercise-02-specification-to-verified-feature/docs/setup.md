# Setup and delivery workflow

## Before timing

Use Node.js 22.12 to 24, npm, Git, and a coding agent with the Superpowers integration installed. Run `npm ci` and `npm run agent:check` from `team-collaboration-app/`.

Install [Superpowers using its official instructions](https://github.com/obra/superpowers#installation) for your agent. This challenge was designed against revision `b36e0829c6d0140e93cfef2ca599b1b07d4a7797`; record the actual installed commit and any integration differences. Check that the required skills are available before timing. No previous exercise is required.

Use one feature branch or worktree. Before/after compares the supplied starter with your completed implementation. Human design approval, corrections, debugging, and repeated verification are part of the work.

## Required workflow

1. Commit the untouched starter and record its commit. Run `npm run delivery:capture -- baseline`; invitation tests are expected to fail because the service is unfinished.
2. Read the approved specification. Use `superpowers:brainstorming` for the technical design, preserving INV-01 through INV-08. Obtain real human approval and retain the approved design under `docs/superpowers/specs/`. Do not invent a new product policy.
3. Use `superpowers:writing-plans`. Retain its plan under `docs/superpowers/plans/`, including requirement IDs, exact files, interfaces, learner tests, and commands. Commit the design and plan before changing production source. Preserve these initial artifacts; track execution progress and later adjustments in the session and comparison report.
4. Use `superpowers:subagent-driven-development` where available, or `superpowers:executing-plans` for a supported sequential workflow. Follow required supporting skills, including workspace setup and handling review feedback.
5. Use `superpowers:test-driven-development`. Add the first regression under `tests/learner/*.test.ts` or `*.test.mjs`, commit it with production code unchanged, then run `npm run delivery:capture -- red`. It must fail because behavior is missing, not because imports or syntax are broken. The existing failing acceptance suite alone does not satisfy this step.
6. Implement the behavior, commit, and run `npm run delivery:capture -- green`. Keep that regression unchanged through completion. Continue the remaining plan with further tests and checks; retain the full session history.
7. When the feature is complete, capture a green run at the completed implementation commit, using a new attempt name if needed. Use `superpowers:requesting-code-review` with a reviewer independent of the author and implementation sessions. Supply the approved specification, design, plan, starting commit, and reviewed commit. Preserve the actual findings using the [review brief](./review-brief.md).
8. Resolve findings, commit fixes, and demonstrate creation/acceptance, revocation, and rejection in the running UI. Use `superpowers:verification-before-completion`, then run `npm run delivery:capture -- final` on the committed final source and tests. Any later source/test change requires another final capture.
9. Complete and commit the reports, transcripts, workflow metadata, and source audit described in the evidence template. Run `npm run evidence:seal`, then `npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify` at that same commit.
10. Commit the seal and command capture. Run `npm run verify:exercise` and submit a focused PR.

The first named red/green pair proves one real test-first cycle. It is not permission to skip TDD for the rest of the plan. The independent reviewer checks the remaining sequence from the actual transcripts.

## Capture and retry behavior

All commands above run from the application directory. Capture output goes to exercise-level `evidence/runs/`. Captures include committed source/test hashes, raw output, times, and exit codes.

An optional attempt name preserves retries: `npm run delivery:capture -- final after-review`. Existing captures are never overwritten. Select the applicable baseline, first red, completed green, and final records in workflow.json; retain failed attempts too. Expected baseline/red failures make the capture command succeed while preserving the test's actual nonzero exit code.

## Checks and limits

- `agent:check`: protected starter inputs, lint/format, typecheck, and build. It passes on the unfinished starter.
- `test:invitations`: fixed acceptance suite; expected to fail initially.
- `test:learner`: learner-written regressions.
- `check:feature`: both test suites and basic interface wiring checks.
- `test:challenge`: maintainer tests of the exercise verification.
- `evidence:verify`: application checks, feature checks, workflow evidence, and the sealed submission.
- `verify:exercise`: final read-only verification.

Static interface checks cannot establish usability. The browser demonstration and reviewer must verify actual interactions. Offline evidence checks establish consistency and Git provenance; they cannot authenticate transcripts or judge every design decision.
