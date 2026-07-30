# jscodeshift Migration Playbook Design

Package a repository-local Agent Skill that guides small, behavior-preserving
component migrations. Prove it with one narrow transform that marks
`PageHeaderProps` properties readonly.

The skill defines inventory, characterization, fixture, dry-run, apply,
verification, and stop phases. The transform requires an explicit interface
name, runs with the TSX parser, and is idempotent. Verification covers the
changed fixture, an unchanged control, rendered component behavior, trigger
cases, typecheck, and build. The batch stops before other components or shared
foundations.
