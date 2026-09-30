# After run

- Starting commit: e134b7e7b3163db395144bfb163a06d24ad06507
- Run base commit: 5ae9b2d374431e6fdf5539e9dd11bc40eb38e70e
- Implementation commit: 87d70fb1e6eba2e85d0a3af86307fe5af25f6da0
- Agent and model: Codex gpt-5.6-sol, medium reasoning
- Tools and permissions: Codex exec, workspace-write sandbox, repository tools, no network escalation
- Time limit: 45 minutes
- Human hints: 0
- Retries: 0
- Patch SHA-256: b020d6856c85d62750d26b301cb4eb8c86b1df9b8500beb63df29dd2791789de
- Patch path: evidence/after.patch
- Checkout check command: `npm run test:checkout`
- Checkout check exit code: 0
- Public-contract differences: none in the protected two-case comparison.
- New-slice calls: 7 protected router calls; two direct authorization comparisons.
- Legacy calls: 5 protected router calls; two direct comparison calls.
- Duplicate-authorization risk: none; only an own `authorizationCreated: false` falls back.
- Files changed: cardCheckout.mjs and checkoutRouter.mjs only.
- Lines added and removed: 111 added, 2 removed.

The controlled fresh-agent patch is recorded unchanged. Its precommitted participant test covers literal flag enablement, own-property fallback proof, strict and canonical public results, compatibility routes, and unsafe no-fallback behavior.
