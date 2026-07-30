# Promptfoo Skill Trigger Eval Harness Design

## Goal

Create a deterministic Promptfoo gate that exposes an overlapping release-notes
description, evaluates positive, negative, and ambiguous requests, and proves
that a narrower description removes the regression.

## Design

A local JavaScript provider selects from versioned JSON skill catalogs using
explicit trigger and exclusion phrases. Promptfoo executes the same eight cases
against v1 and v2. JavaScript assertions validate both selection and a stable
reviewer-facing output schema. The improved release-notes text is packaged as a
real `SKILL.md`.

## Boundaries

The exercise does not call paid models, tune model prompts, or modify the demo
UI. It evaluates skill metadata and output behavior only.
