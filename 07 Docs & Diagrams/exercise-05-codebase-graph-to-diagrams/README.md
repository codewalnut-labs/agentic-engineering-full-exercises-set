**Exercise 05**

# Codebase Graph to Diagrams

## Competency

07. Docs & Diagrams - Architecture documentation and visual explanation

## Popular Agent Skill Pattern

graphify to diagrams

## Your Mission

Convert a codebase graph snapshot into verified C4 and sequence diagrams, then use those diagrams to guide a safe change.

## Starter Project

```text
07 Docs & Diagrams/exercise-05-codebase-graph-to-diagrams/starter-react
```

Run the React starter:

```bash
cd "07 Docs & Diagrams/exercise-05-codebase-graph-to-diagrams/starter-react"
npm install
npm run dev
```

## Lab Outcome

Architecture diagrams are generated from actual code relationships and verified by implementing one small notification workflow change.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Use the skill pattern as an operating workflow, not as a prompt shortcut.

Practice signals for this exercise:

- Package the repeated workflow into explicit steps, trigger conditions, and evidence checks.
- Keep the agent focused on the smallest useful slice of the domain.
- Verify the skill pattern against code, tests, traces, or review artifacts.
- Record the decisions future humans or agents need to continue safely.

Common mistake to avoid: Treating the skill name as magic and skipping the engineering control loop around it.

Mastery signal: The skill pattern changes how the work is planned, executed, verified, and handed off.

## Hands-On Scope

- Start from the graph snapshot instead of freehand diagrams.
- Verify edges against code before publishing diagrams.
- Patch one notification behavior or docs drift.
- Keep diagrams near the code they explain.

## Required Working Deliverables

- Updated C4-style diagram.
- Updated sequence diagram.
- Working React change or validation check.
- Evidence that diagrams match code paths.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- Diagrams cite graph nodes and code files they were verified against.
- At least one stale diagram edge is corrected.
- A notification behavior change uses the diagrams to identify the safe edit path.
- The final docs include residual diagram uncertainty.

## Review Bar

Would this skill pattern make a real experienced team safer, faster, or clearer after the first implementation?
