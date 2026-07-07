**Exercise 04**

# Imported Generate Diagram

## Competency

07. Docs & Diagrams - Turn freshly understood code behavior into diagrams that reviewers can verify.

## Your Mission

Reverse engineer the feature workflow in the starter app and create diagrams that match the actual implementation, not the intended story in your head.

## Starter Project

```text
07 Docs & Diagrams/exercise-04-imported-generate-diagram/starter-react
```

Run the React starter:

```bash
cd "07 Docs & Diagrams/exercise-04-imported-generate-diagram/starter-react"
npm install
npm run dev
```

## Senior Lab Outcome

The diagram exercise produces verified system understanding, not decorative pictures.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Use agents to capture decisions while the context is still fresh.

Practice signals for this exercise:

- Record decisions as ADRs with what, why, alternatives, and trade-offs.
- Generate flowcharts, sequence diagrams, state diagrams, and C4 diagrams from code.
- Make architecture-change ADRs part of normal PR flow.
- Verify generated diagrams against code before trusting them.

Common mistake to avoid: A generated diagram that is slightly wrong is worse than none because people trust it.

Mastery signal: The why behind decisions is committed, docs evolve with code, and newcomers or agents can onboard from the repo.

## Hands-On Scope

- Trace the imported workflow through code and user actions.
- Generate sequence and flow diagrams from that trace.
- Add a small trace script or test that outputs the workflow steps used by the diagrams.
- Correct either the code comments/docs or the diagrams when they disagree.

## Required Working Deliverables

- Sequence and flow diagram sources.
- Trace script/test output proving the diagram steps.
- Any drift fixes discovered during verification.
- Short evidence note linking diagram nodes to files.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one senior owner accountable for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- List exact commands run and whether they passed or failed.
- Include test, typecheck, build, smoke, trace, or script output appropriate to the exercise.
- Show before/after behavior for any bug fix, refactor, NFR improvement, or policy change.
- Call out residual risk, deferred work, and why those choices are acceptable.

## Leadership Review

Will the next engineer or agent trust these diagrams because they are verified?
