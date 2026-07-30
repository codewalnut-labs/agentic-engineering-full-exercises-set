# Exercise 02 : jscodeshift Migration Playbook Skill

## Your Mission

Your mission is to package a repeatable migration playbook and prove it on one migration slice.

You are given a repository with legacy component patterns that should be migrated in small safe batches.

The duration for this challenge is 30 min or less.

## Project

[migration-playbook-app](./migration-playbook-app) contains the migration workflow for this exercise.

## How To Go About It

Use [jscodeshift](https://jscodeshift.com/) inside a skill-guided migration workflow.

Ask your coding agent to inspect `migration-playbook-app/`, package the migration skill, run one codemod slice, and verify behavior.

## Evidence

Produce the skill package, codemod or migration helper, migrated slice, and verification output.

Raise the completed work as a PR for getting verified with our team.

## Run the completed playbook

From `migration-playbook-app/`:

```sh
npm install
npm run migration:page-header:dry
npm run migration:page-header
npm run agent:check
```

The implemented slice is intentionally limited to `PageHeader.tsx`. The gate
checks the transform fixture, idempotence, an unchanged control fixture,
server-rendered component behavior, skill trigger cases, type safety, and the
production build.
