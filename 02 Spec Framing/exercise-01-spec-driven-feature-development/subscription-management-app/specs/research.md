# Research: Self-Service Subscription Management

## Decision 1: Keep billing authority behind a server-side gateway

**Decision**: The browser requests options, quotes, confirmations, withdrawals,
and status from an authoritative subscription command service through a typed
gateway. It never calculates final prices or authorizes mutations.

**Rationale**: Subscription mutations have financial and access consequences.
Server-side role checks, exact money calculations, provider credentials, audit,
and concurrency controls cannot be trusted to browser code.

**Alternatives considered**:

- Mutate seeded client data directly: rejected because it cannot enforce
  authorization, audit, or billing correctness.
- Call a billing provider directly from the browser: rejected because it would
  expose privileged credentials and couple the UI to provider details.

## Decision 2: Use quotes as an explicit pre-confirmation resource

**Decision**: Every mutation begins with a time-limited quote bound to the
current subscription version.

**Rationale**: A quote makes effective date, price/credit impact, expiry, and the
exact proposed state reviewable. Version binding prevents confirmation against
stale subscription state.

**Alternatives considered**:

- Calculate a preview locally: rejected because prices and proration may change.
- Confirm without a quote: rejected because users could not verify financial
  impact and stale submissions would be harder to detect.

## Decision 3: Combine optimistic concurrency with idempotent confirmation

**Decision**: Confirmation carries the quoted subscription version and a stable
idempotency key; conflicts return the authoritative state.

**Rationale**: Version checking prevents lost updates, while idempotency prevents
duplicate requests or charges during retries and timeouts.

**Alternatives considered**:

- Disable the button only: rejected because it does not prevent duplicate
  network requests or cross-device conflicts.
- Client-generated request IDs without version checks: rejected because they do
  not prevent overwriting newer state.

## Decision 4: Use one pending mutation per subscription

**Decision**: Block new mutations while one request is pending; allow permitted
users to withdraw reversible requests.

**Rationale**: A single queue position makes effective dates, billing effects,
and cancellation state deterministic for the first release.

**Alternatives considered**:

- Merge compatible changes: rejected because ordering and repricing rules are
  not defined.
- Queue multiple changes: rejected as unnecessary complexity for the initial
  self-service scope.

## Decision 5: Preserve the existing stack and add focused test tooling

**Decision**: Retain TypeScript, React, Vite, and native `fetch`. Add Vitest,
Testing Library, and jsdom only as development dependencies.

**Rationale**: Vitest integrates with the existing Vite/TypeScript setup and
Testing Library verifies user-visible and accessible behavior without adding
production runtime dependencies.

**Alternatives considered**:

- Add a state-management library: rejected because the flow is scoped per
  account card and can use component state.
- Use only manual testing: rejected because permission and billing edge cases
  require repeatable regression tests.

## Decision 6: Apply changes according to financial risk

**Decision**: Upgrades and seat increases apply immediately with disclosed
proration. Downgrades, seat reductions, cadence changes, and cancellation are
scheduled for renewal; cancellation is account-owner-only.

**Rationale**: This is a common low-surprise default that preserves paid access
and avoids unreviewed mid-cycle entitlement removal.

**Alternatives considered**:

- Apply all changes immediately: rejected because downgrades and cancellation
  could remove paid access mid-term.
- Schedule all changes: rejected because it delays requested upgrades and seat
  availability unnecessarily.
