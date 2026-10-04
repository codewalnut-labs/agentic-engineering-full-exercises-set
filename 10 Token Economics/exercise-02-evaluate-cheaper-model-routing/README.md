# Decide Whether Cheaper Model Routing Is Safe

## Your Mission

Your team's task router sends every request to its most expensive model tier. Simple changes cost too much, while unclear requests go straight to execution.

Implement the proposed routing policy, then decide whether its savings justify adoption. Your decision must account for quality, safety, and the cost of failed attempts.

## Project

- Starter: [model-routing-eval-app](./model-routing-eval-app)
- Inputs: [routing rules](./docs/routing-policy-contract.md), [recorded runs](./evals/recorded-runs.json), and [measurement contract](./docs/measurement-contract.md)
- Setup: [environment and commands](./docs/setup.md)
- Time box: 60 minutes

The app includes task cases, a broken all-reasoning router, and a protected scorer. Its 36 recorded observations and prices are synthetic practice data. No provider account or API key is needed.

## How To Go About It

1. Capture the starter's routing decisions and record the problems in `evidence/before.md`.
2. Use **[evaluation](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/tree/main/skills/evaluation)** to define the comparison: cost, quality, safety, clarification, and latency.
3. Implement routes from risk, ambiguity, and scope. Keep unclear work out of model execution and preserve the stronger tier for high-risk work. Add tests for unfamiliar field combinations.
4. Account for every supplied observation, including failed attempts. Run the protected scorer to include the initial call and its possible retry or escalation.
5. Decide whether to adopt or reject the policy using every gate. Report latency and variation alongside savings, and identify what would need to change before a live pilot.

## Evidence

Submit the router, regression tests, routing policy, reconciled measurements, generated cost model, and adoption decision. Include `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`, and proof of skill use.

Follow the [evidence instructions and template](./docs/evidence-template.md) to capture checks, link claims to sources, and seal the evidence. Open one focused PR using the [submission standard](../../docs/SUBMISSION_STANDARD.md).

## Completion Criteria

- Routing works from task fields, including cases absent from the example list.
- Ambiguous work clarifies and high-risk work keeps its safety boundary.
- All 36 measurements reconcile to the protected pack and prices.
- The decision follows the measured gates: adoption requires quality, safety, and at least 25% expected savings; a justified rejection is a valid result.
- The decision distinguishes benchmark results from production claims, and `npm run verify:exercise` passes.
