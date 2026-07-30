# File Ownership Map

| Lane | Branch | Owner | Owned files | Verification |
|---|---|---|---|---|
| Filter reset | `lane/filter-reset` | filter agent | `FilterBar.tsx`, `FilterBar.test.tsx` | focused Vitest run |
| Due label | `lane/due-label` | detail agent | `DetailPanel.tsx`, `DetailPanel.test.tsx` | focused Vitest run |
| Activity empty state | `lane/activity-empty-state` | activity agent | `ActivityFeed.tsx`, `ActivityFeed.test.tsx` | focused Vitest run |
| Integration | `feat/parallel-worktree-feature-split` | accountable integration owner | `App.tsx`, `package.json`, documentation, evidence | full `npm run agent:check` |

No implementation file is owned by more than one lane. Only the integration
owner may change shared wiring or evidence.
