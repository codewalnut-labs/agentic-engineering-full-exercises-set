**Exercise 01**

# Security and A11y Review Gauntlet

## Competency

09. Code Review - Code quality and risk review for merge confidence

## Your Mission

Review a generated React change for security, accessibility, and behavioral regressions before approving it.

## Starter Project

```text
09 Code Review/exercise-01-security-and-a11y-review-gauntlet/starter-react
```

Run the React starter:

```bash
cd "09 Code Review/exercise-01-security-and-a11y-review-gauntlet/starter-react"
npm install
npm run dev
```

## PR To Review

```text
09 Code Review/exercise-01-security-and-a11y-review-gauntlet/pr/review-target.diff
```

## Senior Lab Outcome

A generated PR is reviewed, patched, and re-verified before merge.

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

- Use a fresh review pass on `pr/review-target.diff` for security, accessibility, behavior, and tests.
- Patch the merge-blocking findings in the starter code.
- Add regression tests for each blocker.
- Re-review after fixes and explicitly dismiss or defer remaining findings.

## Required Working Deliverables

- Patched starter code.
- Regression tests for security/a11y/behavior blockers.
- Triage table with fix/defer/dismiss decisions.
- Re-review evidence after the patch.

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

Can you explain every meaningful changed line without asking the implementing agent?
