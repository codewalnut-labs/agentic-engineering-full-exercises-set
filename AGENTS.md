# Repository Contributor Guide

This repository is a hands-on curriculum for experienced engineers and engineering leaders to practice 12 agentic engineering competencies through 35 exercises. This guide is for contributors changing the curriculum repository and coding agents helping them. Learners doing an exercise should follow that exercise's README and local project instructions instead.

## Repository map and navigation

- `README.md` is the competency and exercise index. Start there to find an exercise.
- `01 ...` through `12 ...` are the competency folders. Each contains its exercise folders; an exercise README describes its task, project, evidence, and completion criteria.
- Exercise folders may contain a starter application, `docs/`, `scripts/`, tests, fixtures, contracts, and evidence instructions. Their contents and commands vary; inspect the target exercise README and `package.json` before acting.
- Root `docs/EXERCISE_SETUP_AND_TIME.md` covers learner prerequisites and exercise setup. Root `docs/SUBMISSION_STANDARD.md` defines learner evidence and submission rules.
- Root `scripts/` and `package.json` provide curriculum-wide contract and verification checks. They do not replace an exercise's local verification.

For curriculum changes, trace the relevant README links, exercise materials, and any root verifier that checks them. Do not assume every exercise uses the same tools or file layout.

## Environment and verified commands

The root `package.json` requires Node.js `>=22.12.0 <25` (`.nvmrc` specifies `22.12.0`) and defines npm scripts. A package manager capable of running these scripts is required. Root setup and verification are:

```sh
npm ci
npm run verify:contracts
```

`verify:contracts` runs the root verification-guard, comparable-evidence, captured-verification, context-evidence, and exercise-contract checks. Run it from the repository root after curriculum changes. The root package defines no general `test`, build, or lint script. For a change to an exercise project, read its README and package scripts; install and run only the commands documented for that project, including its final `npm run verify:exercise` where required.

When a command fails, preserve its actual output and exit status, inspect the specific script or README that defines it, and report environmental prerequisites separately from code failures. Do not edit checks or recorded evidence to make a run appear successful.

## Change and writing conventions

- Keep contributor changes focused on the requested curriculum content and update related index links when needed.
- Follow the target document's existing Markdown structure and terminology. Link to the setup and submission guides instead of copying their full guidance.
- Derive commands, requirements, and claims from the target README, `package.json`, scripts, and tests. If something is not documented or verifiable, say so rather than guessing.
- Preserve exercise instructions and evidence requirements unless the contribution specifically changes them and updates their dependent checks consistently.

## Boundaries and protected material

Do not modify learner solutions, starter applications, fixtures, evidence, contracts, tests, integrity manifests, or verification scripts as collateral to an unrelated repository-level change. Exercise verification and protected-input checks are intentional curriculum content; never weaken or bypass them to obtain a passing result. Make only changes needed for the contribution, and explain any necessary change to protected curriculum materials in the review description.

## Branches, pull requests, and evidence

Use a focused branch for the contribution and submit a reviewable pull request to the upstream repository. The submission standard's fork-to-upstream workflow applies to exercise submissions; follow repository maintainers' current contribution process for other changes. This repository has no separate contribution guide or branch naming convention in the checked-in documentation.

In the pull request, state the purpose and scope, list the verification commands actually run with their outcomes, and identify any checks not run and why. Include relevant rendered or linked documentation evidence when it helps review. Never claim a command passed unless it was executed successfully.
