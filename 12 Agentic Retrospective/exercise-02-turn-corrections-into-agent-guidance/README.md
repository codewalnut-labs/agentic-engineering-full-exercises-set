# Exercise 02 : Turn Repeated Mistakes into Useful Agent Guidance

## Your Mission

Your team keeps correcting the same persistence mistakes in agent-written changes: saved labels used as identity, inconsistent status values, and timestamps created inside business logic.

Your challenge is to turn those repeated corrections into short repository guidance and prove whether a fresh agent uses it. Each rule needs evidence from separate review events; adding a long list of preferences is not enough.

The duration for this challenge is 60 min or less.

## Project

[guidance-eval-app](./guidance-eval-app) contains a defective persistence function and a patch grader. The [correction history](./docs/correction-history.json), [guidance contract](./docs/guidance-contract.md), and [proving task](./tasks/proving-change.md) are supplied.

This exercise stands alone. You will create the guidance here and test it against the same task with and without that guidance.

## How To Go About It

1. Follow the [setup](./docs/setup.md). Use **evaluation** to define a fair comparison. Keep this analysis out of the two fresh proving sessions.
2. Capture an agent's first attempt at the proving task without your new guidance. Preserve its original patch and session.
3. Map each rule to at least two correction events. Put a short routing instruction in `AGENTS.md` and the persistence rules, exceptions, and check command in `.agent/persistence.md`.
4. Run the same task in a fresh session with only that guidance added. Keep the agent, model, settings, tools, and time limit unchanged. Grade both original patches.
5. Commit the successful guided patch, add regression tests, and submit a PR explaining which corrections the guidance prevents.

## Evidence

Submit the guidance, correction-to-rule map, both unedited patches, session records, metadata, and tests.

Include actual skill-use proof, source citations, `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`, and captured verification using the [evidence instructions and template](./docs/evidence-template.md).

Follow the repository [submission standard](../../docs/SUBMISSION_STANDARD.md).

## Completion Criteria

The challenge is complete when:

- Each rule is supported by repeated corrections, with clear limits and exceptions.
- The guided first attempt passes every persistence check.
- A correct baseline is reported honestly as no regression.
- Final code matches the graded patch, the comparison changes only guidance, and `npm run verify:exercise` passes.
