# Pull request review brief

The PR must make a failed check visible and give the reviewer a clear reason to block merging.

## Supplied PR draft

The following draft contains unsupported claims. Treat it as material to correct using the repository and generated proof.

**Title:** Checkout checks pass and the PR is ready to merge

Unit tests passed. The evidence generator is complete, so checkout is healthy and this PR can merge. Failed jobs do not need an artifact upload.

## Reviewer comment

**FAIL-01:** The checkout smoke check failed. Show the failed result and its artifacts in the PR, identify the tested commit, and explain why a passing evidence verifier does not make this change safe to merge.

## Your PR task

1. Correct the title and body so the failed checkout result is visible.
2. Link every check and copied artifact, including the failure and screenshot.
3. Keep the PR blocked; provide the actual failed Actions run and uploaded artifact links after opening it.

Write the corrected title and body in `evidence/pr-summary.md`. Include an **Evidence map** linking important PR claims to changed files, exact checks, and raw evidence.

Respond to **FAIL-01** in `evidence/review-response.md`. Explain what you changed in the description, what the evidence proves, and what remains blocked or unverified. Do not resolve a comment merely because a command is green.

## Open and maintain the PR

After local verification, open one focused PR from your fork. Use the corrected title and body, and replace local artifact paths with links reviewers can access in your branch or Actions run.

Keep the PR in draft while the supplied product check is failing. The exercise is complete when the failed check is reported honestly and its evidence is accessible; merging is not required.

The implementation SHA identifies the code measured by your local proof. Later PR commits may add evidence only. A GitHub Actions run can test a separate merge SHA; label that run accurately. If product code changes after capture, regenerate the proof and update the PR body and response.

Keep post-opening PR URLs, Actions links, and discussion updates in the hosted PR body or comments. They are reviewed on GitHub after the sealed local submission passes, so opening the PR does not create a circular local verification requirement.

## Reference

[GitHub's guidance for reviewable pull requests](https://docs.github.com/en/pull-requests/concepts/helping-others-review-your-changes) recommends clear context, focused changes, and guidance about what reviewers should inspect.
