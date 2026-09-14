# Setup and verification

## Before timing

Use the repository's supported Node.js range (22.12 to 24), npm, Git, a coding agent, and internet access for skill acquisition and primary-source research. Run `npm ci` and `npm run agent:check` from `agent-onboarding-app/`. Browser automation and external issue-tracker accounts are not required.

The 45-minute target includes selecting, installing, and configuring skills and demonstrating readiness. Model queues and downloads vary; record actual elapsed time. Some candidate skills require background or parallel agents and human interaction. Confirm runtime support and quota before selecting them. A full feature implementation is not part of this exercise.

## Work area

Keep the current exercise folder name. Launch the agent in `agent-onboarding-app/`, not the curriculum root. The learner creates AGENTS.md, project-scoped skill directories, any native instruction adapter, supporting setup documents, and evidence. Do not edit the supplied application, tests, fixtures, challenge instructions, or verifiers. Findings about existing code belong in reports.

The [skill candidates](./skill-candidates.md) are optional starting points. Use project-scoped, committed copies with all supporting resources and licenses. Record any inherited global instructions or skills that affect discovery. A fresh session must not rely on unrecorded personal configuration or absolute paths to your home directory.

Create `docs/agent-setup.md` inside the application with the selected runtime, its native discovery mechanism, working directory, reproducible installation instructions, skill selection and invocation rules, dependency decisions, and known limitations. Keep AGENTS.md concise and repository-specific; there is no prescribed heading structure or arbitrary line limit.

## Commands and what they prove

All commands below run from `agent-onboarding-app/`.

- `npm run test:behavior`: executes assertions against existing routing behaviour. It does not test the unimplemented Needs Attention feature.
- `npm run agent:check`: integrity, starter checks, existing behavioural tests, formatting checks, TypeScript checking, and a temporary production build. The lightweight lint check is not a full ESLint analysis.
- `npm run setup:review`: creates a temporary Git repository containing the supplied sample change. Prints the path and comparison SHAs. This is an explicit setup operation, never part of final verification.
- `npm run verify:implementation`: checks the learner's instruction and skill setup. The command name is retained for the curriculum contract; no feature implementation is required.
- `npm run test:challenge`: maintainer regression tests for the verifier and the supplied review fixture.
- `npm run verify:exercise`: checks the application, setup, scenario evidence, source citations, sealed files, and captured verification without changing repository files. Missing learner outputs are expected to fail.

## Commit and capture order

1. Record initial observations, finish the instructions and skill setup, and commit them. Record this full SHA as `session.setupCommit` in readiness.json. Start the fresh session only after that commit. If setup needs correction, commit it and start a new session; keep a record of the unsuccessful attempt and the correction.
2. During the fresh session, capture the testing baseline with `npm run evidence:capture -- --output ../evidence/commands/baseline.txt -- npm run test:behavior`. This writes actual command output and an exit code. Record all four scenarios and the session metadata described in the evidence template.
3. Finish and commit the scenario reports, session transcript, skill inventory, source audit, and before/after comparison. Do not edit captured output by hand.
4. Run `npm run evidence:seal`. It seals the committed outputs, installed skill files, and configuration at the current commit.
5. At that same commit, run `npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify`.
6. Commit the generated manifest and verification capture. Run `npm run verify:exercise`, then raise the focused PR.

If output validation fails, fix the report and repeat steps 3–6. If setup changes, repeat from step 1. Captured commands do not invoke a paid model. Final verification is offline; actual skill discovery and use are assessed from the recorded session and reviewer replay, not fabricated model calls.
