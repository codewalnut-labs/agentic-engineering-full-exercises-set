# Parallel Worktree Feature Split Design

## Goal

Prove that three small UI improvements can be implemented concurrently in
isolated Git worktrees and integrated without overlapping edits.

## Slices

The filter lane owns reset behavior, the detail lane owns due-label rendering,
and the activity lane owns empty/accessibility behavior. Each lane adds a
focused characterization test and commits independently. The integration owner
alone wires the dashboard, manages dependencies, captures evidence, and runs the
complete verification gate.

## Integration

Cherry-pick the three lane commits in a recorded order, audit ownership, then
run lint, focused tests, format, typecheck, and build from the integrated branch.
