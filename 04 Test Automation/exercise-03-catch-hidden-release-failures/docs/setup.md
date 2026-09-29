# Setup and workflow

Install Node.js 22.12–24 and Java 21. Run `npm ci` in `workflow-gate-app/`. Check the committed Maven wrapper with `./mvnw --version` (PowerShell: `.\mvnw.cmd --version`) from `workflow-rules-api/`; allow it to download Maven and dependencies before timing the challenge.

Install [Verification Before Completion](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion) through your Superpowers integration, or `npx skills add obra/superpowers --skill verification-before-completion`. Confirm the skill can be loaded and record its source commit, installed path, hash, and actual invocation in `evidence/tool-record.md`. The reviewed Superpowers revision is `5bf4e78011075bcfc0dc295f0724994cd123ee71`; record the revision actually used.

Commit the starting exercise files. From `workflow-gate-app/`, capture the previous focused check and the omitted client, gate, and complete provider checks:

```text
npm run evidence:capture -- baseline
```

Read the supplied [release claim](./release-claim.md). Explain exactly what its passing command establishes and what it omits. Before changing production code, map each [release requirement](./release-requirements.md) to a command and expected result in `evidence/verification-plan.md`.

Repair the client validation, provider behavior, and `../scripts/verification-gate.mjs`. The gate's exported `releaseSteps` and `runReleaseGate` are the interface checked by `npm run test:gate`. Keep the four required surfaces in order and run each once. Do not invoke the whole gate from `agent:check` or `test:gate`, which would create recursion. Preserve the first failing exit code; a spawn error or a terminated process must also stop the gate.

`npm run release:verify` invokes the learner's gate with Maven build output directed to a temporary directory. The committed POM supports this output location without changing tests or Maven lifecycle targets. On Windows, the gate must resolve `.cmd` wrappers correctly; the supplied launcher shows that platform detail. Keep this distinct from deciding whether a process succeeded.

After the repairs and regression tests are committed, run:

```text
npm run evidence:capture -- final
npm run verify:exercise
```

The final capture executes the complete release command and saves its unedited output, exit code, source snapshot, and commit. The verifier reruns it. A failed capture remains evidence of a failed attempt; repair, commit, and capture again. Later implementation changes require fresh verification. State completion only after reading the results, including the provider test summary. Follow the [evidence template](./evidence-template.md).

## Research basis

Reviewed 2026-09-24: [Verification Before Completion](https://github.com/obra/superpowers/tree/main/skills/verification-before-completion) requires evidence for the actual claim. [Maven's lifecycle](https://maven.apache.org/guides/introduction/introduction-to-the-lifecycle.html) distinguishes focused test runs from `verify`; [Node child processes](https://nodejs.org/api/child_process.html) distinguish process errors, exit status, and termination signals. The challenge combines those requirements into an executable release check.
