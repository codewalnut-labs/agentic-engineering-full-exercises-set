# Setup and verification

Use Node.js from the repository's .nvmrc (supported range 22.12 through 24) and Git. Start this standalone challenge from a clean checkout. Run npm ci and npm run agent:check inside ponytail-feature-app. Framework checks pass before the learner task is solved; final verification should not.

Create evidence/before.md in the exercise directory with Conditions, Findings, and Proof headings. Under Conditions record a line exactly Starting commit: <full 40-character git rev-parse HEAD>. Capture the framework baseline at this starting commit:

    npm run proof:capture -- baseline

Install and authenticate native Claude Code. The reference runner needs a version exposing --bare, --append-system-prompt-file, --output-format stream-json, and the permission flags in the [CLI reference](https://code.claude.com/docs/en/cli-reference). A recent build is required; verify --help before starting. The repository includes Ponytail v5.3.0 at upstream commit 742e0abae1501e12d1254a81d05f16bba10d08c1, with its MIT license. [Skill source](https://github.com/DietrichGebert/ponytail).

The runner explicitly loads the full ponytail instructions only in assisted sessions. It does not depend on skill auto-discovery or alter your global configuration. Bare mode excludes normal discovery of project guidance, memory, hooks, and installed skills. Managed environment settings may still affect execution; record them and use the same environment in both lanes.

    npm run experiment:run -- --lane before --claude C:\tools\claude.exe
    npm run experiment:run -- --lane after --claude C:\tools\claude.exe

Use your actual native executable path. Each command captures three independent sessions from the original Git starter, even if the current implementation changes later. Prompts are piped on stdin. The only added instruction in the after lane is the pinned Ponytail skill. The fixed model, effort, allowed tools, permissions, turn limit, and timeout come from agent-config.json and the protected runner. Both lanes may run their own tests. No task agent has access to another trial's outputs through its starting directory.

Select a successful assisted trial:

    npm run experiment:select -- --trial 1

The selector copies the original feature files and tests into the learner implementation. Commit that exact result before scoring. Fixing it manually invalidates comparability. If every assisted trial fails, preserve the full experiment and document rejection; obtain a new complete batch before choosing a passing deliverable. Do not rerun only a weak cell.


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
