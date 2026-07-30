# Agent-Ready Kanban Control Plane Design

## Goal

Turn four vague escalation issues into executable or explicitly blocked cards,
with ownership, isolated paths, commands, review gates, and merge order.

## Control plane

The board distinguishes needs-info, ready-for-agent, ready-for-human, blocked,
and done. Only ESC-120 has sufficient reproduction and a non-overlapping file
boundary, so it receives an isolated implementation lane. The integration
owner controls shared files, review, cherry-pick order, and evidence.

## Completed slice

ESC-120 adds a pure severity-resolution utility with focused tests. The board
UI renders the resulting state and lane metadata; remaining cards stay blocked
until their named exit criteria are satisfied.
