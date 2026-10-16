# Exercise 02 : Reduce Repeated Prompt Costs with Caching

## Your Mission

Your application answers questions using the same large project handbook. A changing timestamp appears before the reusable content, so each request creates another cache entry instead of reusing the earlier one.

Apply **[prompt-prefix caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching)** and measure whether repeated requests become cheaper. Preserve the complete handbook and current answers; changing the model or shortening the requirements is outside the task.

## Project

[prompt-cache-app](./prompt-cache-app) includes the faulty request builder, project handbook, four fixed questions, and an API capture harness. The final question changes the retention policy so you must demonstrate that current information replaces the earlier cached prefix.

This exercise is standalone. Allow **60 minutes after setup**. Live measurement needs an Anthropic API key with billing and access to the pinned model; see [setup](./docs/setup.md). No provider measurements are supplied as learner evidence.

## How To Go About It

1. Record the starting commit. Capture the original sequential workload and inspect its requests, responses, cache usage, and cost.
2. Separate stable instructions and handbook content from changing request metadata. Place the explicit cache breakpoint on the reusable prefix.
3. Commit the builder change. Run the same workload using the same model, limits, questions, and pricing record.
4. Verify the initial cache creation, warm cache hits, and a new cache write for the updated policy. Check every answer against the applicable handbook.
5. Compare full workload costs, including cold writes, policy changes, and generated output. Record an adopt-or-reject decision without assuming that all tokens have the same price.

## Evidence

Submit the builder change, original API requests and responses, generated accounting, and evidence/before.md, evidence/after.md, evidence/comparison.md.

Follow the [experiment contract](./docs/experiment-contract.md), [evidence instructions and template](./docs/evidence-template.md), and [submission standard](../../docs/SUBMISSION_STANDARD.md). Run npm run verify:exercise from prompt-cache-app before opening one focused PR.

## Completion Criteria

The reusable prefix produces observed cache hits, updated rules produce correct answers, and all four requests reconcile to provider usage. The decision includes cache creation and output costs. Cached input remains part of total input; lower input price is not described as a smaller prompt or a measured subscription-bill reduction.
