# Setup and verification

Use the Node version in `.nvmrc` and Java 21 from `.java-version`. The API includes a Maven wrapper; initial dependency downloads need network access. Install **[writing-plans](https://github.com/obra/superpowers/tree/main/skills/writing-plans)** using the [upstream instructions](https://github.com/obra/superpowers#installation). Record its revision and actual use. This exercise stands alone.

## Observe and prepare

Run `npm ci` and `npm run agent:check` from `api-refactor-app/`. Record `git rev-parse HEAD` as `Starting commit: <full SHA>` in `evidence/before.md`. Then run `npm run proof:capture -- baseline`.

Use **writing-plans** to create `evidence/refactor-plan.md` before production work. Include the service/policy boundary, public constructors, test commands, and expected results. Commit this evidence-only plan before the characterization commit. Implement the approved scope inline; extra worker sessions are not required.

Add `workflow-rules-api/src/test/java/dev/agentic/exercise/workflow/WorkflowPolicyCharacterizationTest.java`. Test the public service, including the four cases in `docs/contract-observations.json`. Keep calls compatible with the original service constructor so the same test runs before and after extraction.

Have the test collect actual result fields, exception type/message, and save counts into an ordered array matching the observation schema. When `System.getProperty("contract.snapshot")` is set, write that array as UTF-8 JSON to the supplied path; otherwise run the assertions without writing a file. Do not populate the output by copying the protected expected JSON.

Run `npm run snapshot:before`. It runs the participant, service, HTTP, and client checks in temporary storage and copies the generated snapshot to `evidence/contract-before.json`. Commit only the participant test and snapshot, record `characterizationSha` in `evidence/history.json`, then run `npm run proof:capture -- characterization`.

Add `DecisionPolicy.java` and update only `WorkflowService.java` in focused commits. Preserve the one-argument service constructor and add the injectable policy constructor required by the protected architecture checks. Record the final commit as `refactorSha`, then run `npm run snapshot:after` and `npm run proof:capture -- implementation`.

## Report and seal

Finish the reports, `evidence/skill-use.md`, `evidence/skill-session.txt`, and `evidence/source-audit.json` using the [evidence template](./evidence-template.md). Capture tools keep actual stdout, stderr, timestamps, and the matching phase commit.

Commit all evidence after the final source commit. Then run from the app directory:

```text
npm run evidence:seal
npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify
```

Commit `evidence/manifest.json` and `evidence/commands/verify.txt`, then run `npm run verify:exercise`. The final command reads existing evidence; it does not generate it. Open one focused PR with accessible proof links. Approval and merging are not required.

Iteration is allowed. Keep failed attempts under `evidence/attempts/` before recapturing. If source needs another repair, commit the focused fix, update the final SHA, and regenerate affected proof before resealing. The precommitted characterization test and before snapshot remain unchanged.

## Background

[Martin Fowler's definition of refactoring](https://martinfowler.com/bliki/DefinitionOfRefactoring.html) distinguishes structural improvement from behavior change. This challenge preserves the existing public contract, including documented surprises.
