# Exercise 01 : Turn an Unclear Feature Request into a Clear Specification

## Your Mission

Your team receives feature requests that sound straightforward but leave important decisions unanswered. Engineers and coding agents fill in the gaps differently, leading to conflicting behavior and rework.

Your mission is to use **[GitHub Spec Kit](https://github.com/github/spec-kit)** to turn an unclear feature request into a clear specification with observable acceptance criteria. Another engineer should understand what to build, how to verify it, and which decisions still need an answer.

The duration for this challenge is 45 min or less after the base tools, Spec Kit integration, and application dependencies are ready.

## Project

[subscription-management-app](./subscription-management-app) is a subscription application with a vague request, conflicting stakeholder notes, billing constraints, and existing behavior.

This standalone challenge uses Spec Kit's **specify → clarify → checklist** workflow, followed by fresh-agent review and revision. Produce the specification and review evidence without implementing the feature.

## How To Go About It

1. Inspect the supplied repository and record the initial gaps in `evidence/before.md`. Use `speckit.specify` to draft the feature specification from the request and repository evidence.
2. Use `speckit.clarify` to question ambiguous decisions. Record confirmed answers, assumptions, and open questions with their sources and consequences. Do not invent stakeholder approval.
3. Use `speckit.checklist` to generate a requirements-quality checklist covering permissions, billing, pending changes, recovery, and scope. Preserve the actual outputs from all three stages.
4. Commit and freeze the clarified specification and unchecked review checklist. Ask a fresh agent session to evaluate the specification against that checklist and the repository. Keep its assessment and original session output.
5. Revise the specification and account for every finding. Record which checklist items are satisfied or remain unresolved, then capture the result in `evidence/after.md` and `evidence/comparison.md`.

## Evidence

Submit the Spec Kit configuration and version, stage invocations and captured outputs, final feature specification, clarification record, preserved review inputs, evaluated checklist, and revision record.

Follow the [setup and workflow instructions](./docs/setup.md), [specification contract](./docs/specification-contract.md), [evidence instructions and template](./docs/evidence-template.md), and repository [submission standard](../../docs/SUBMISSION_STANDARD.md). Command spelling varies by agent; use its installed integration. Run `npm run verify:exercise` from `subscription-management-app/` before raising a focused PR.

## Completion Criteria

The challenge is complete when actual Spec Kit use is evidenced, the specification clearly states expected behavior and acceptance criteria, and a fresh agent has evaluated the checklist. Requirements trace to supporting decisions, findings have reasoned dispositions, and remaining blockers have owners and next steps. Application code remains unchanged and checks pass. A generated checklist alone does not prove the specification is ready.
