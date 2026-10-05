# Exercise 03 : Prove Whether an Agent Workflow Change Helps

## Your Mission

Your team's agent workflow has recurring failures: editing before resolving scope, trusting conflicting notes, and claiming completion after only partial checks. Rewriting the instructions might help, but longer instructions can also increase cost without improving results.

Your challenge is to propose one general workflow change from past failures, compare it with the baseline, and decide whether the team should keep it.

The target duration is 90 minutes, excluding provider wait time.

## Project

[workflow-eval-app](./workflow-eval-app) contains a baseline workflow, eight replay cases, and a deterministic grader. The [failure traces](./docs/failure-traces.json) supply the retrospective evidence; the [response schema](./docs/action-schema.md) defines the structured replay format.

This exercise stands alone. The agent describes actions in simulated cases; the results do not establish production-code correctness.

## How To Go About It

1. Follow the [setup](./docs/setup.md). Use **evaluation** to fix the comparison conditions and success criteria before running the experiment.
2. Group repeated trace failures by root cause. Explain which workflow instruction should change and why.
3. Run every case three times with the baseline workflow. Capture each original response, session identifier, tokens, and elapsed time.
4. Commit a candidate that changes only `workflow/instructions.md`. Keep it general; exclude case identifiers and answers.
5. Repeat the complete batch under the same conditions. Generate the benchmark, compare results on cases reserved from tuning, and make an adopt-or-reject decision in your PR.

## Evidence

Submit the candidate workflow, failure clusters, all 48 run records and raw captures, generated benchmark, and adoption decision.

Include actual skill-use proof, source citations, `evidence/before.md`, `evidence/after.md`, `evidence/comparison.md`, and captured verification using the [evidence instructions and template](./docs/evidence-template.md).

Follow the repository [submission standard](../../docs/SUBMISSION_STANDARD.md).

## Completion Criteria

The challenge is complete when:

- The candidate addresses repeated causes and stays within the workflow-only scope.
- Both complete batches use matching conditions and preserve every original response.
- Quality, critical failures, consistency, tokens, and duration are checked against the protected thresholds.
- The decision matches the benchmark, including rejection when a gate fails, and `npm run verify:exercise` passes.
