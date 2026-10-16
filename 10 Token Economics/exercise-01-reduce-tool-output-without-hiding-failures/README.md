# Exercise 01 : Reduce Tool Output Without Hiding Failures

## Your Mission

Your agent reads hundreds of passing-test lines, repeated search matches, and verbose Git history while investigating one failed checkout check. That output consumes context, but removing the wrong detail can hide the failure.

Use **[RTK](https://github.com/rtk-ai/rtk)** to reduce command output while preserving the information needed to diagnose the failure. Decide which commands can be compressed and where full output is necessary. Measure the complete workload, including fallback reads.

## Project

[rtk-investigation-app](./rtk-investigation-app) contains a raw-only command policy, a disposable checkout repository, and a capture harness. The failure is intentional; diagnosing it is required, fixing the checkout implementation is outside this challenge.

This exercise is standalone. Allow **60 minutes after setup**. Install the pinned RTK release using the [setup instructions](./docs/setup.md).

## How To Go About It

1. Record the starting commit and capture all three commands without compression. Identify the noisy output and the evidence needed to understand the failed check.
2. Use RTK to investigate its supported filters. Update the policy for history, search, and checks; choose full-output fallback where necessary.
3. Commit the policy and capture the same workload against the unchanged fixture. Preserve original stdout, stderr, exit codes, and the RTK version and binary hash.
4. Compare the total returned UTF-8 bytes, including every fallback. Explain the checkout failure using captured evidence and identify any lost detail.
5. Generate the summary and make an adoption decision supported by the measurements. Record the limitations of this command-level comparison.

## Evidence

Submit the policy, original captures, diagnosis, generated summary, and evidence/before.md, evidence/after.md, evidence/comparison.md. Record RTK use in the diagnosis and transcript.

Follow the [experiment contract](./docs/experiment-contract.md), [evidence instructions and template](./docs/evidence-template.md), and [submission standard](../../docs/SUBMISSION_STANDARD.md). Run npm run verify:exercise from rtk-investigation-app before opening one focused PR.

## Completion Criteria

All commands and fallback reads are accounted for, the failing exit code and required diagnostic signals survive, and the diagnosis matches the fixture. The adoption decision follows net output reduction. Byte savings and RTK estimates are not presented as measured whole-session token or dollar savings.
