# Exercise 01 : Semgrep Security & A11y Review Gauntlet

## Your Mission

Your mission is to review an agent-written change for security, accessibility, and behavior risk.

You are given a repository with a clean-looking generated diff that contains subtle review blockers.

The duration for this challenge is 30 min or less.

## Project

[review-gauntlet-app](./review-gauntlet-app) contains the review gauntlet for this exercise.

## How To Go About It

Use [Semgrep](https://github.com/semgrep/semgrep) plus focused manual review.

Ask your coding agent to inspect `review-gauntlet-app/`, run static checks, review the diff, fix confirmed blockers, and verify the result.

## Evidence

Produce the severity-ranked findings, fixes, static-check output, and verification output.

Raise the completed work as a PR for getting verified with our team.

## Completed Review

- Severity-ranked triage: [`docs/severity-ranked-findings.md`](./docs/severity-ranked-findings.md)
- Semgrep rules: [`review-gauntlet-app/semgrep.yml`](./review-gauntlet-app/semgrep.yml)
- Static evidence: [`evidence/static-check-before.txt`](./evidence/static-check-before.txt) and [`evidence/static-check-after.txt`](./evidence/static-check-after.txt)
- Verification evidence: [`evidence/verification-output.txt`](./evidence/verification-output.txt)

Run focused regressions with `npm run test:review`. Run the full project gate with
`npm run agent:check`. With Semgrep installed, run the project rules with
`npm run semgrep`.
