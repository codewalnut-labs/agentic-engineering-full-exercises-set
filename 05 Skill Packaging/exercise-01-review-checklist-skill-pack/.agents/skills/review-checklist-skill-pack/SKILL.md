---
name: review-checklist-skill-pack
description: Use when practicing the Review Checklist Skill Pack workflow for Vendor renewal workflow.
---

# Review Checklist Skill Pack

## Use When

- Reviewing a React or TypeScript PR diff for merge confidence.
- The task asks for severity-ranked findings, missing tests, NFR review, or human triage.
- A reviewer needs consistent output across security, accessibility, behavior, performance, maintainability, and evidence.

## Do Not Use When

- The learner has not yet read the exercise README.
- The task is implementation-only and no review decision is requested.
- The requested output is outside this exercise folder.

## Workflow

1. Read `references/review-checklist.md` and `references/finding-schema.md`.
2. Inspect the PR diff first, then only the surrounding files needed to verify behavior.
3. Run a fresh review pass across behavior, security, accessibility, performance, tests, and maintainability.
4. Return findings in the required schema with severity, file reference, evidence, suggested fix, and missing test.
5. Triage each finding as `fix`, `defer`, or `dismiss` after human verification.
6. Record missed or noisy findings in `evals/trigger-cases.json` so the skill can be refined.

## Output Contract

Every finding must include:

- `severity`: P0, P1, P2, or P3.
- `category`: behavior, security, accessibility, performance, tests, maintainability, or evidence.
- `file`: local path and line where possible.
- `why_it_matters`: user or system impact.
- `suggested_fix`: concrete next change.
- `test_gap`: the check that would catch it next time.
