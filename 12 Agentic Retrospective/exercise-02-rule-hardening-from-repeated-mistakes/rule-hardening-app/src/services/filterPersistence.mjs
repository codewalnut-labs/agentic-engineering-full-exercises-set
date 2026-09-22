/**
 * Build a durable saved-filter record.
 * Persists the stable owner id (never the display label) and the canonical,
 * trimmed lowercase status (never the display `*Label` field), and stamps
 * `updatedAt` using the caller-provided clock rather than an ambient clock.
 */
export function buildSavedFilter(filter, clock) {
  return {
    ownerId: filter.owner.id,
    status: filter.statusLabel.trim().toLowerCase(),
    updatedAt: new Date(clock()).toISOString(),
  };
}
