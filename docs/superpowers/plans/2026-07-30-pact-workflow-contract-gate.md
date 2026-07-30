# Pact Workflow Contract Gate Implementation Plan

## Task 1: Establish baselines

Install the consumer dependencies, run its existing gate, and run the provider
unit tests with Maven. Record the absence of any consumer/provider contract
verification.

## Task 2: Consumer contract - red then green

1. Add Pact JS and a contract test for list and decision interactions.
2. Run it against the current in-memory client and confirm the expected
   request-boundary failure.
3. Replace the in-memory workflow methods with a real HTTP client and explicit
   provider-to-UI mapping.
4. Rerun the Pact test and confirm it generates the exercise-level pact file.

## Task 3: Provider verification - red then green

1. Add Pact JVM JUnit 5 support and a provider verification test that loads the
   generated contract.
2. Run the verifier and diagnose any request/response mismatch.
3. Make only the provider correction exposed by verification, if one exists.
4. Rerun all provider tests.

## Task 4: Evidence and report

Run the consumer gate, provider gate, typecheck/build, and contract artifact
inspection. Add concise verification evidence. Create a one-page DOCX assessing
the exercise's usefulness and improvements, then render and inspect it.

## Task 5: Review and submission

Request independent code review, fix important findings, rerun the relevant
gates, push the fork branch, and open an upstream PR against `main`.
