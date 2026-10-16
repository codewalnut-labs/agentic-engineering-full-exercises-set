# Setup and verification

Use Node.js from the repository's .nvmrc (supported range 22.12 through 24) and Git. Start this standalone challenge from a clean checkout. Run npm ci and npm run agent:check inside rtk-investigation-app. Framework checks pass before the learner task is solved; final verification should not.

Create evidence/before.md in the exercise directory with Conditions, Findings, and Proof headings. Under Conditions record a line exactly Starting commit: <full 40-character git rev-parse HEAD>. Capture the framework baseline at this starting commit:

    npm run proof:capture -- baseline

Install RTK **v1.0.1** from the [official release](https://github.com/rtk-ai/rtk/releases/tag/v1.0.1). Native Windows can use the rtk-oss-x86_64-pc-windows-msvc.zip asset; extract it outside the repository. Both filter editions expose the same commands. Keep rg and git on PATH. Explicit RTK invocation is used so the measured workload does not depend on global agent hooks. Do not install or change global hooks for this exercise.

The runner creates a temporary repository, executes fixed argv without a shell, and captures real Git, rg, and node-test output. The product check should fail; the capture command itself completes normally.

    npm run experiment:run -- --lane before

Change only rtk-policy.json, choosing raw, rtk, or rtk-then-raw for each command. Commit it, then capture:

    npm run experiment:run -- --lane after --rtk C:\tools\rtk.exe

Use your actual absolute executable path. The baseline can run before installing RTK. The after capture records the pinned version and binary hash. Diagnose the failure in evidence/decision.md under Correctness, citing exact raw output lines. The shipped workload uses RTK's explicit command wrappers; rtk gain is supplementary because its counts are estimates.


## Score and publish evidence

Once both complete lanes exist and the implementation is committed:

    npm run experiment:score
    npm run proof:capture -- implementation

Scoring generates evidence/summary.json from raw artifacts. Put its sourceSha on a line exactly Implementation commit: <SHA> in after.md. Write evidence/decision.md with Measurements, Correctness, Decision, and Limitations headings and a line Decision: adopt or Decision: reject matching the generated result. Include the before/after/comparison reports and source audit described in the [evidence template](./evidence-template.md).

Commit reports, records, summaries, raw captures, and focused command captures. Then run:

    npm run evidence:seal
    npm run evidence:capture -- --output ../evidence/commands/verify.txt -- npm run evidence:verify

Commit the manifest and final capture, then run npm run verify:exercise. Final verification is read-only and makes no provider calls. Open one focused PR from your fork with accessible evidence links. Merging is not required for learner completion.

Capture directories and command captures refuse overwrites. Preserve an earlier attempt as a complete directory outside the active exercise before repeating the whole experiment. Do not selectively keep favorable responses. Hashes establish file consistency; reviewers still assess authentic sessions, diagnoses, and conclusions.
