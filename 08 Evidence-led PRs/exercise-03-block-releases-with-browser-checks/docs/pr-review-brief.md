# Pull request review brief

The PR must let a reviewer reproduce the release decision and detect outdated or unsupported quality claims.

## Supplied PR draft

The following draft contains unsupported claims. Treat it as material to correct using the repository and generated proof.

**Title:** Dashboard quality is fixed because the average score passes

The screenshot looks correct and the average Lighthouse score is good. The supplied baseline proves the speed improvement on this machine. Existing reports can be reused after any code change; zero axe violations proves complete accessibility.

## Reviewer comment

**QUALITY-01:** Which code version, build, route, and browser produced these reports? Show all three runs, the worst-case decision, and both failing controls. Explain which accessibility checks remain and regenerate proof if the code changes.

## Your PR task

1. Replace screenshot and average-score claims with measured worst-case results.
2. Link raw reports, report digests, capture metadata, thresholds, and deliberate failure checks.
3. Before marking the PR ready for review, confirm the evidence covers the final code changes; refresh it after source changes.

Write the corrected title and body in `evidence/pr-summary.md`. Include an **Evidence map** linking important PR claims to changed files, exact checks, and raw evidence.

Respond to **QUALITY-01** in `evidence/review-response.md`. Explain what you changed in the description, what the evidence proves, and what remains blocked or unverified. Do not resolve a comment merely because a command is green.

## Open and maintain the PR

After local verification, open one focused PR from your fork. Use the corrected title and body, and replace local artifact paths with links reviewers can access in your branch or Actions run.

Mark it ready for review only after the supplied checks pass and the reviewer response is backed by current evidence. Approval and merging are not required.

The implementation SHA identifies the code measured by your local proof. Later PR commits may add evidence only. A GitHub Actions run can test a separate merge SHA; label that run accurately. If product code changes after capture, regenerate the proof and update the PR body and response.

Keep post-opening PR URLs, Actions links, and discussion updates in the hosted PR body or comments. They are reviewed on GitHub after the sealed local submission passes, so opening the PR does not create a circular local verification requirement.

## Reference

[GitHub's guidance for reviewable pull requests](https://docs.github.com/en/pull-requests/concepts/helping-others-review-your-changes) recommends clear context, focused changes, and guidance about what reviewers should inspect.
