# Exercise 03 : Pact Workflow Contract Gate

## Your Mission

Your mission is to create a contract test gate between a workflow UI and its rules API.

You are given two repositories whose integration keeps breaking because the UI and API evolve separately.

The duration for this challenge is 30 min or less.

## Project

[workflow-gate-app](./workflow-gate-app) and [workflow-rules-api](./workflow-rules-api) contain the workflow contract for this exercise.

## How To Go About It

Use [Pact](https://docs.pact.io/) for the consumer-driven contract workflow.

Ask your coding agent to inspect both repositories, add the contract test gate, and verify the UI/API agreement.

## Evidence

Produce the consumer contract, provider verification, any exposed fix, and verification output from both sides.

Raise the completed work as a PR for getting verified with our team.

## Run the contract gate

Generate and verify the consumer contract first:

```sh
cd workflow-gate-app
npm install
npm run agent:check
```

Then verify the provider against the generated Pact in `pacts/`:

```sh
cd ../workflow-rules-api
mvn test
```

The consumer test exercises the production API client for both workflow listing
and decision submission. The provider test starts Spring Boot on a random port
and verifies those same interactions against the generated Pact artifact.
