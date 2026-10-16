# Refactor a Tightly Coupled Feature into a Testable Module

## Your Mission

A workflow couples its rules to several HTTP helpers that read environment configuration. Testing a decision requires starting services, and moving one check can change error precedence or the order of side effects.

Refactor the complete feature behind one clear interface with injectable dependencies. Make it independently testable while preserving the behavior of existing production callers.

## Project

[workflow-refactor-app](./workflow-refactor-app) contains the coupled starter, unfinished module and HTTP adapter interfaces, local service fixtures, and eight protected behavior scenarios. The [module contract](./docs/module-contract.md) defines the compatibility and dependency requirements.

Use the [setup instructions](./docs/setup.md). This standalone Node challenge needs no database, provider account, or Java installation. Time box: 75 minutes after setup.

## How To Go About It

1. Trace the public workflow, transport dependencies, and effect order. Record why the starter needs running services in `evidence/before.md`.
2. Use Matt Pocock's **[improve-codebase-architecture skill](https://github.com/mattpocock/skills/blob/main/skills/engineering/improve-codebase-architecture/SKILL.md)** to investigate this feature. Save its architecture report, choose a candidate, and record the design discussion and rejected alternatives.
3. Write a public characterization test and capture actual HTTP-backed results. Commit both before production edits; keep them unchanged afterward.
4. Use the coding agent to implement the selected refactor. Concentrate workflow behavior in the supplied module interface, introduce explicit HTTP adapters, and wire existing callers through the same module. Keep transport and environment configuration outside it.
5. Test the module with in-memory adapters and network access disabled. Run production wiring checks against local HTTP fixtures. Record the verified result in `evidence/after.md` and compare it in `evidence/comparison.md`.

## Evidence

Submit the architecture report, design decision, before/after dependency diagrams, frozen characterization test, output snapshots, implementation, and real skill session. Follow the [evidence instructions and template](./docs/evidence-template.md) for captures and sealing.

Run `npm run verify:exercise` from `workflow-refactor-app/` and open a focused PR using the [submission standard](../../docs/SUBMISSION_STANDARD.md).

## Completion Criteria

The feature runs through one interface with memory and HTTP adapters. Independent tests need no running services or environment configuration. Exact results, error precedence, persistence, and effect order remain compatible. Production callers use the new module, the frozen test detects a broken workflow, and final verification passes.
