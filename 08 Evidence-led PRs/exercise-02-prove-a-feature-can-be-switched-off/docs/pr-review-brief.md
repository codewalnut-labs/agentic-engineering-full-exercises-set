# Pull request review brief

The PR must give the reviewer enough evidence to assess the rollout and run the local rollback drill.

## Supplied PR draft

The following draft contains unsupported claims. Treat it as material to correct using the repository and generated proof.

**Title:** Invoice preview is safe to release everywhere

The flag is off by default, so rollback is safe. No scenario results or rollback drill are needed. Disabling our local configuration proves all production clients stop immediately.

## Reviewer comment

**ROLLBACK-01:** What proves that disabling the feature stops preview calls and telemetry? Show the rollback command, audit record, interruption and concurrency results, and distinguish the local drill from production flag propagation.

## Your PR task

1. Explain the behavior change and exact files reviewers should inspect.
2. Map the flag states and rollback safety claims to generated proof and the measured commit.
3. Describe rollout scope, rollback operator and trigger, recovery verification, and production concerns that still need checking.

Write the corrected title and body in `evidence/pr-summary.md`. Include an **Evidence map** linking important PR claims to changed files, exact checks, and raw evidence.

Respond to **ROLLBACK-01** in `evidence/review-response.md`. Explain what you changed in the description, what the evidence proves, and what remains blocked or unverified. Do not resolve a comment merely because a command is green.

## Open and maintain the PR

After local verification, open one focused PR from your fork. Use the corrected title and body, and replace local artifact paths with links reviewers can access in your branch or Actions run.

Mark it ready for review only after the supplied checks pass and the reviewer response is backed by current evidence. Approval and merging are not required.

The implementation SHA identifies the code measured by your local proof. Later PR commits may add evidence only. A GitHub Actions run can test a separate merge SHA; label that run accurately. If product code changes after capture, regenerate the proof and update the PR body and response.

Keep post-opening PR URLs, Actions links, and discussion updates in the hosted PR body or comments. They are reviewed on GitHub after the sealed local submission passes, so opening the PR does not create a circular local verification requirement.

## Reference

[GitHub's guidance for reviewable pull requests](https://docs.github.com/en/pull-requests/concepts/helping-others-review-your-changes) recommends clear context, focused changes, and guidance about what reviewers should inspect.
