**Exercise 06**

# Intent Layer Repo Map

## Competency

03. Context Engineering - Agent working-context curation

## Popular Agent Skill Pattern

intent-layer and zoom-out

## Your Mission

Add folder-level intent context so agents understand ownership, constraints, and traps before editing an incident workflow.

## Starter Project

```text
03 Context Engineering/exercise-06-intent-layer-repo-map/starter-react
```

Run the React starter:

```bash
cd "03 Context Engineering/exercise-06-intent-layer-repo-map/starter-react"
npm install
npm run dev
```

## Lab Outcome

The repo gets a compact intent layer that guides future agents to the right modules, commands, and review boundaries.

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

- Zoom out to map folders and boundaries.
- Write compact intent notes at the smallest useful scope.
- Ask a fresh agent plan to use the intent layer.
- Implement one incident workflow fix and update stale context.

## Required Working Deliverables

- Folder intent notes or context map.
- Working React fix for escalation or severity behavior.
- Evidence that the agent used the context layer.
- Before and after notes for any corrected context.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- Intent notes explain module purpose, ownership, traps, and safe commands.
- Context stays compact enough for every session.
- A future bugfix plan cites intent notes before choosing files.
- One real workflow bug is fixed using the new context layer.

## Review Bar

Would this skill pattern make a real experienced team safer, faster, or clearer after the first implementation?
