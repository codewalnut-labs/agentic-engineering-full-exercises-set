# Exercise 03 : Promptfoo Review Regression Lab

## Your Mission

Your mission is to measure whether a review prompt catches regressions before trusting it.

You are given a repository with historical bad diffs and a review prompt that misses important issues.

The duration for this challenge is 30 min or less.

## Project

[regression-review-app](./regression-review-app) contains the review regression workflow for this exercise.

## How To Go About It

Use [Promptfoo](https://www.promptfoo.dev/docs/intro/) to evaluate review behavior on regression cases.

Ask your coding agent to inspect `regression-review-app/`, build the eval cases, improve the review prompt, and verify the score change.

## Evidence

Produce the eval config, before/after results, improved review prompt, and verification notes.

Raise the completed work as a PR for getting verified with our team.

## Completed evaluation

- Baseline and improved configs: `regression-review-app/promptfoo.before.yaml`
  and `regression-review-app/promptfoo.after.yaml`
- Improved prompt: `regression-review-app/eval/prompts/improved.txt`
- Regression cases and clean control: `regression-review-app/eval/cases/`
- Before/after evidence: `regression-review-app/evidence/`
- Verification notes: `docs/verification-notes.md`

Run `npm run eval:review` to regenerate both Promptfoo result files. Run
`npm test` to verify the checked-in score improved from 25% to 100%.
