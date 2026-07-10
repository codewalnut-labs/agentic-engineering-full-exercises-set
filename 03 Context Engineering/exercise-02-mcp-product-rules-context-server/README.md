# Exercise 02 : MCP Product Rules Context Server

## Your Mission

Your mission is to expose product rules through a small context server so the agent does not paste large data blobs into prompts.

You are given an application and a product-rules repository. Create a focused context access path and use it to complete a rule-driven change.

The duration for this challenge is 30 min or less.

## Project

[product-rules-app](./product-rules-app) and [product-rules-server](./product-rules-server) contain the product rules workflow for this exercise.

## How To Go About It

Use the [Model Context Protocol](https://modelcontextprotocol.io/) pattern for serving focused repository context.

Ask your coding agent to inspect both repositories, expose the required product rules through the server, update the app, and verify the behavior.

## Evidence

Produce the context server change, app change, access-boundary notes, and verification output.

Raise the completed work as a PR for getting verified with our team.
