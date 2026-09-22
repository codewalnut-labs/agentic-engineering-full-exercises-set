# Setup and verification

## Prerequisites

Use Node.js 22.12 to 24, npm, Git, and one coding agent with native pre-tool, post-tool, and completion hooks. No other exercise or skill installation is required. Run `npm ci` and `npm run agent:check` from `agent-hooks-app/` before timing. The target is 60 minutes; record actual time and runtime setup delays.

## Work area

Launch the agent in `agent-hooks-app/`. Create project-local native configuration, hook handlers, and `docs/hook-setup.md`. Keep the exercise folder name. Application changes belong in `src/App.tsx` and any new source files; `src/hookProbe.ts` is the disposable probe. Restore/remove that probe before the final session. Keep supplied tests, verifiers, rules, package scripts, and protected application inputs unchanged.

In the setup document explain activation/trust, dependencies, agent version, inherited user settings, event matchers, the mapping from each team rule to its handler, failure feedback, source freshness, retry limits, and unsupported tools. Include every required configuration/script/resource in `evidence/hooks.json`; no unrecorded scripts in a personal home directory. No learner hook solution is supplied.

## Commands

- `npm run check:changes`: fast type and existing behavior checks for post-tool hooks. Runs on a clean starter before feature development.
- `npm run hooks:snapshot --silent`: prints a normalized SHA-256 digest of source and check inputs without changing files. Capture before and after a check; accept success only if both digests agree.
- `npm run agent:check`: protected inputs, lightweight lint/format checks, behavior tests, typecheck, and a temporary production build.
- `npm run verify:implementation`: verifies the requested summary; expected to fail before the learner implements it.
- `npm run test:challenge`: maintainer regression tests for the evidence validator and snapshot behavior.
- `npm run verify:submission`: validates evidence structure, citations, scenario ordering, setup inventory, and sealed artifacts. Reviewers also inspect native logs and replay hooks; offline checks cannot authenticate a model session.
- `npm run verify:exercise`: read-only final verification, including application, feature, and evidence checks. Missing learner outputs are expected to fail. Do not invoke it from a hook.

## Record, commit, and capture

1. Record baseline observations in `evidence/before.md`; no unguarded feature implementation or second branch is required. Test hooks with the supplied probes, retaining failed attempts and corrections.
2. Finish and commit the setup. Record the full SHA as `setupCommit` in `evidence/hooks.json`. Start a fresh agent session and complete the task. If hooks change, commit the correction and repeat the fresh final session; preserve earlier attempts.
3. Complete the inventory, event index, raw transcripts, source audit, and comparison described in the evidence template. Commit all outputs, source, and hook files.
4. Run `npm run evidence:seal`, then at that same commit run `npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify`.
5. Commit the generated manifest and command capture. Run `npm run verify:exercise`, then raise a focused PR.

If validation fails, fix the evidence and repeat steps 3–5. If setup or final source changes, repeat affected runtime scenarios and refresh the evidence. Never edit captured command output by hand.
