# Exercise 03 : OpenRewrite Contract-Safe Rules Slice

## Your Mission

Your mission is to refactor one legacy rules slice without breaking dependent clients.

You are given API and app repositories where rule names, DTOs, and adapters have drifted over time.

The duration for this challenge is 30 min or less.

## Project

[legacy-rules-api](./legacy-rules-api) and [legacy-rules-app](./legacy-rules-app) contain the legacy rules workflow for this exercise.

## How To Go About It

Use [OpenRewrite](https://docs.openrewrite.org/) or an equivalent recipe-driven refactoring workflow where it fits.

Ask your coding agent to inspect both repositories, protect the contract, refactor one rules slice, and verify both sides.

## Evidence

Produce the refactor, contract evidence, API/app verification output, and rollback note.

Raise the completed work as a PR for getting verified with our team.
