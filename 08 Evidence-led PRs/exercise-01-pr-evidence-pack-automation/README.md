**Exercise 01**

# PR Evidence Pack Automation

## Competency

08. Evidence-led PRs - PR gate evidence and handoff

## Your Mission

Create a PR evidence pack that automatically gathers test output, build proof, screenshots, and residual risks.

## Starter Project

```text
08 Evidence-led PRs/exercise-01-pr-evidence-pack-automation/starter-react
```

Run the React starter:

```bash
cd "08 Evidence-led PRs/exercise-01-pr-evidence-pack-automation/starter-react"
npm install
npm run dev
```

## Lab Outcome

A PR can explain itself with automated proof instead of reviewer guesswork.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

Do not ask reviewers to trust agent-written code. Put the proof in the PR.

Practice signals for this exercise:

- Treat quality gates as deliverables with commands, location, risk, and approval evidence.
- Write the PR so reviewers understand intent before reading the diff.
- Attach test results, coverage, screenshots, outputs, traces, and profiles where useful.
- Let CI produce evidence automatically while humans keep judgment calls.

Common mistake to avoid: A green checkmark without visible evidence still makes reviewers reconstruct the work.

Mastery signal: Reviewers stop asking whether it was tested, evidence is mostly automated, and merge confidence comes from proof.

## Hands-On Scope

- Implement an evidence pack script that runs checks, captures output, and writes a PR-ready summary.
- Add or repair tests so the evidence pack is meaningful.
- Include screenshots, coverage, traces, or logs where useful for the starter.
- Make failure states visible rather than silently swallowed.

## Required Working Deliverables

- Evidence pack generator.
- Updated tests/checks feeding the pack.
- Generated artifact folder with logs and summary.
- PR template section wired to the generated evidence.

## Agentic Engineering Requirements

- Use Codex, Claude Code, Cursor, or another coding agent as a collaborator, but keep one accountable owner accountable for the diff.
- Start by having the agent inspect the starter and propose a plan; revise that plan before implementation.
- Do not accept a large opaque rewrite. Work in small, reviewable chunks and keep the verification gate green.
- Record only the decisions and evidence future humans or agents need. Markdown supports the work; it is not the work.

## Evidence Gate

- List exact commands run and whether they passed or failed.
- Include test, typecheck, build, smoke, trace, or script output appropriate to the exercise.
- Show before/after behavior for any bug fix, refactor, NFR improvement, or policy change.
- Call out residual risk, deferred work, and why those choices are acceptable.

## Leadership Review

Does the evidence let reviewers spend attention on judgment instead of reconstruction?
