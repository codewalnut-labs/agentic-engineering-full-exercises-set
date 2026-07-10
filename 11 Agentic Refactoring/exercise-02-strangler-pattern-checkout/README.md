# Exercise 02 : jscodeshift Strangler Checkout

## Your Mission

Your mission is to replace one checkout path with a new module while preserving external behavior.

You are given a repository with tangled checkout code and repeated copy-paste patterns.

The duration for this challenge is 30 min or less.

## Project

[checkout-strangler-app](./checkout-strangler-app) contains the checkout strangler workflow for this exercise.

## How To Go About It

Use [jscodeshift](https://jscodeshift.com/) where a codemod can safely move repeated call sites.

Ask your coding agent to inspect `checkout-strangler-app/`, create the strangler slice, apply any safe codemod, and verify behavior.

## Evidence

Produce the strangler change, codemod notes, and verification output.

Raise the completed work as a PR for getting verified with our team.
