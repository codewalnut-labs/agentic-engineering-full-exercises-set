# Setup and verification

Use the Node version in `.nvmrc`. Install **[evaluation](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/tree/main/skills/evaluation)** using the [upstream installation instructions](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering#installation). Record the revision and invocation.

## Run the comparison

Run `npm ci` and `npm run agent:check` from `guidance-eval-app/`. Record the unchanged starter as `baselineSha`. Use evaluation in your preparation session to fix the agent, model, settings, tools, permissions, and time limit. Its notes must not become hints in the proving sessions.

1. Create a baseline branch from `baselineSha`. Give a fresh agent only the [proving task](../tasks/proving-change.md) and the starter function. Do not expose correction history, grader answers, new guidance, or previous conversation. Capture its first unedited change to `src/services/filterPersistence.mjs`. Commit that file alone and keep the branch available for verification. Save the complete session and exact Git diff as `evidence/before-session.txt` and `evidence/before.patch`.
2. On a separate submission branch from the same `baselineSha`, use the correction history to write `AGENTS.md` and `.agent/persistence.md` at the exercise root. Commit only those two files as `rulesSha`. Keep the persistence starter unchanged.
3. Start another fresh proving session with the same request and conditions. Supply the new repository guidance through the agent's normal instruction loading. Do not provide your analysis or corrections. Save its first unedited patch and complete session as `evidence/after.patch` and `evidence/after-session.txt`.
4. Commit only that source patch as `agentImplementationSha`. Add `src/services/filterPersistence.test.mjs` in the next commit, `implementationSha`. Test stable identity, canonical status, injected time, and allowed presentation uses. Do not edit the graded function while adding tests.
5. Keep `baselineSha -> rulesSha -> agentImplementationSha -> implementationSha` as consecutive source commits. Store all four full SHAs in `evidence/history.json`. After recording metadata and reports, run `npm run rules:verify` and `npm run proof:capture -- implementation`.

Generate patches with `git diff --binary --full-index <run-base> <agent-implementation> -- <repository-relative-function-path>`, preserving stdout bytes. Do not hand-edit patches or use shell redirection that changes encoding. Hash the saved patch bytes.

A first attempt means no correction or retry within that measured session. If the guided patch fails, keep the complete experiment under `evidence/attempts/`, improve the guidance from the correction history, and start a new complete comparison from the supplied starter. Do not select the best of several attempts at the same conditions.

## Finish and verify

Use the [evidence template](./evidence-template.md) to complete the reports, `evidence/skill-use.md`, `evidence/skill-session.txt`, and `evidence/source-audit.json`. Commit all required evidence after the final source commit. From the app directory, run:

```text
npm run evidence:seal
npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify
```

Commit the manifest and final capture, then run `npm run verify:exercise`. This last command reads existing evidence without generating it. Open one focused PR with proof links; approval and merging are not required. Archive failed captures under `evidence/attempts/` before regenerating them and resealing.
