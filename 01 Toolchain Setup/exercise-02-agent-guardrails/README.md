# Exercise 02 : Agent Guardrails

## Your Mission

Your mission is to create safety guardrails for a coding agent before allowing it to work independently on a repository.

You are given a repository where the coding agent currently has unrestricted access. The repository contains sensitive files, production configurations, legacy code, and critical workflows.

Configure the agent boundaries so it knows what it can access, what it cannot modify, and when it needs human approval.

The duration for this challenge is 30 min or less.

## Project

[yolo-agent-app](./yolo-agent-app) contains the application code for this exercise.

## How To Go About It

Ask your coding agent to inspect `yolo-agent-app/` and identify risky areas where unrestricted agent actions can cause problems.

Create guardrails that prevent unsafe operations while still allowing the agent to complete normal development tasks.

## Evidence

Produce guardrail configuration files in a `.agent` folder.

Raise the completed work as a PR for getting verified with our team.
