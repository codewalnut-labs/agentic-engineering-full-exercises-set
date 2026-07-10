# Exercise 03 : Conflict-Tolerant Migration Board

## Your Mission

Your mission is to migrate UI slices while avoiding shared-file conflicts between agents.

You are given a repository with repeated migration collisions caused by several agents touching foundations at once.

The duration for this challenge is 30 min or less.

## Project

[migration-board-app](./migration-board-app) contains the migration board workflow for this exercise.

## How To Go About It

Use a worktree-based coordination board with explicit file ownership rules.

Ask your coding agent to inspect `migration-board-app/`, create the migration board, execute two safe slices, merge them, and verify the result.

## Evidence

Produce the board, conflict log, migrated slices, and verification output.

Raise the completed work as a PR for getting verified with our team.
