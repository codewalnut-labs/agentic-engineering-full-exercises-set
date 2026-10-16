# Setup and verification

Use Node.js from the repository's .nvmrc (supported range 22.12 through 24) and Git. Start this standalone challenge from a clean checkout. Run npm ci and npm run agent:check inside prompt-cache-app. Framework checks pass before the learner task is solved; final verification should not.

Create evidence/before.md in the exercise directory with Conditions, Findings, and Proof headings. Under Conditions record a line exactly Starting commit: <full 40-character git rev-parse HEAD>. Capture the framework baseline at this starting commit:

    npm run proof:capture -- baseline

Set ANTHROPIC_API_KEY in your environment using your normal secret-management method. The runner uses native fetch against the Anthropic Messages API and never writes the key or authentication headers. Live calls incur provider charges. The fixed workload makes four small-output requests in each lane, including its policy-change control.

provider.json pins claude-sonnet-4-6 and dated list prices. Before beginning, confirm access and review the pricing source. The handbook is longer than this model's documented caching minimum. A different model needs a maintainer-supported configuration and pricing update before the starting commit; do not change the model during a comparison.

    npm run experiment:run -- --lane before

Repair only src/buildRequest.mjs. The builder returns system and messages. Preserve every document character and metadata value. Commit the change, then run:

    npm run experiment:run -- --lane after

Requests run sequentially. Each lane receives a unique experiment namespace for a cold prefix; the first three requests in a lane share that namespace and handbook. The fourth changes Retention days from 30 to 14. Do not artificially pad the handbook, prime the cache outside the recorded workload, or replace responses with examples. The scorer requires actual warm reads and cold/changed-prefix writes. If a run fails, retain its raw error before starting another complete experiment.


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
