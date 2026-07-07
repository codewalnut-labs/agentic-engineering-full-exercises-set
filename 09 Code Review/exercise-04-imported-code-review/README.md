**Exercise 04**

# Imported Code Review

## Competency

09. Code Review - Use an agent-assisted review pass while keeping human severity judgment.

## Your Mission

Review the supplied PR diff in five focused minutes, then verify the agent's findings against the surrounding code before deciding what blocks merge.

## Starter Project

```text
09 Code Review/exercise-04-imported-code-review/starter-react
```

Run the React starter:

```bash
cd "09 Code Review/exercise-04-imported-code-review/starter-react"
npm install
npm run dev
```

## PR To Review

```text
09 Code Review/exercise-04-imported-code-review/pr/review-target.diff
```

## Senior Lab Outcome

Timed review practice ends with fixed blockers and proof, not only comments.

This is not complete if the only result is a Markdown file. The written artifacts are there to constrain and explain the engineering work.

## Practice Focus

AI code can look clean and still be wrong. Review proves it is safe to merge.

Practice signals for this exercise:

- Review with a fresh agent or different model to catch what the implementer missed.
- Use specialist checks for security, accessibility, performance, and other NFRs when needed.
- Make NFRs explicit because agents often defer them unless asked.
- Read the diff yourself and be able to explain every meaningful change.

Common mistake to avoid: Looks right is the trap; clean-looking agent code is not the same as correct code.

Mastery signal: Fresh review adds signal, security and accessibility are explicit checks, and the owner can explain why the merge is safe.

## Hands-On Scope

- Review the imported PR diff under a timebox.
- Identify true blockers by reading surrounding code.
- Patch at least the highest-severity issue and add a test or check.
- Leave lower-risk findings as clear follow-up issues.

## Required Working Deliverables

- Code/test fix for the top blocker.
- Severity-ranked review findings.
- Evidence from build/typecheck/tests.
- Follow-up list for non-blocking improvements.

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

Can a reviewer trust your approval because you verified the risk, not because the diff was short?
