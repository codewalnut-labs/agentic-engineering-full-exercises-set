**Exercise 04**

# Grill-Me Decision Tree Spec

## Competency

02. Spec Framing - Requirements decomposition and testable spec creation

## Popular Agent Skill Pattern

grill-me and grill-with-docs

## Your Mission

Use a grill-me style interview to turn a vague entitlement redesign into a testable implementation contract before coding.

## Starter Project

```text
02 Spec Framing/exercise-04-grill-me-decision-tree-spec/starter-react
```

Run the React starter:

```bash
cd "02 Spec Framing/exercise-04-grill-me-decision-tree-spec/starter-react"
npm install
npm run dev
```

## Lab Outcome

A high-risk entitlement change is understood through a decision tree, examples, non-goals, and mergeable slices before implementation begins.

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

- Run a one-question-at-a-time interview before asking for an implementation plan.
- Answer code-discoverable questions by inspecting the starter instead of asking the user.
- Convert answers into a decision table and PR-sized slices.
- Implement one vertical slice and link each test to a question it resolves.

## Required Working Deliverables

- Updated entitlement decision table and question log.
- Working React behavior for selected entitlement states.
- Tests or script checks for at least five concrete examples.
- Evidence note showing which questions became code and which stayed deferred.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- Question log covers decision branches, dependencies, defaults, non-goals, and open risks.
- Spec examples cover eligible, blocked, expired, downgrade, and override conflict paths.
- React contract panel reflects the frozen decisions and rejects unknown entitlement states.
- Tests or script checks prove the implementation uses the decision table rather than free text.

## Review Bar

Would this skill pattern make a real experienced team safer, faster, or clearer after the first implementation?
