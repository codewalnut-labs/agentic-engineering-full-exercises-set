**Exercise 05**

# Graphify Knowledge Graph Lab

## Competency

03. Context Engineering - Agent working-context curation

## Popular Agent Skill Pattern

graphify

## Your Mission

Create and verify a codebase knowledge graph before asking an agent to make a cross-cutting billing analytics change.

## Starter Project

```text
03 Context Engineering/exercise-05-graphify-knowledge-graph-lab/starter-react
```

Run the React starter:

```bash
cd "03 Context Engineering/exercise-05-graphify-knowledge-graph-lab/starter-react"
npm install
npm run dev
```

## Senior Lab Outcome

Agents answer architecture questions from a durable graph of code, docs, schema, jobs, and ownership instead of repeatedly scanning raw files.

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

- Build or simulate the graph from the provided extract.
- Query the graph to find affected modules and owner boundaries.
- Use raw files only after the graph narrows the search space.
- Patch one billing metric bug and update the graph notes.

## Required Working Deliverables

- Updated graph snapshot or graph notes.
- Working metric behavior in the React starter.
- Evidence of graph-guided file selection.
- A short list of graph gaps for future agents.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one senior owner accountable for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- Graph extract contains nodes for UI, API, warehouse, jobs, docs, and owner teams.
- At least five agent questions are answered from the graph before files are opened.
- A stale or missing edge is corrected and documented.
- The implemented change names the graph queries used to choose files.

## Leadership Review

Would this skill pattern make a real senior team safer, faster, or clearer after the first implementation?
