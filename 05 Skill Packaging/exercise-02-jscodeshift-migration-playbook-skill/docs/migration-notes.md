# Migration Notes

## Applied slice

- Target: `src/components/PageHeader.tsx`
- Owner boundary: the component-local `PageHeaderProps` interface
- Change: mark all three public props `readonly`
- Batch size: one component
- Tool: jscodeshift with the `tsx` parser

## Preserved behavior

- Title, subtitle, and competency text remain unchanged.
- Both native buttons remain `type="button"`.
- The action group retains `aria-label="Exercise actions"`.
- No event, keyboard, styling, routing, or shared-foundation code changed.

## Safety evidence

- Fixture transform passed.
- Second transform is identical to the first.
- An unrelated props interface remains unchanged.
- Server-rendered behavior test covers content, controls, and the ARIA label.
- Dry run reported one target file, zero errors, and one proposed change.

## Stop condition

The slice stops after `PageHeader.tsx`. Migrating other prop interfaces is the
next safe batch only after component ownership and behavior coverage are
confirmed; shared types and global styles remain out of scope.
