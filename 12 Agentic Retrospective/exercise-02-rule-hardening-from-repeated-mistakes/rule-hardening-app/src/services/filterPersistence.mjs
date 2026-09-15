/**
 * Builds a durable saved-filter record so the selected owner and status can be
 * restored in a later session.
 *
 * Persistence rules followed (see .agent/persistence.md):
 * - Identity: store the stable owner id (`ownerId`), never the display label.
 * - Enums: store `status` as a trimmed, canonical lowercase string, not the
 *   source `statusLabel` display value.
 * - Time: use the caller-provided clock's return value directly as `updatedAt`;
 *   never call Date.now/new Date inside this builder.
 * - Shape: only identity, canonical, and timestamp fields are persisted.
 */
export function buildSavedFilter(filter, clock) {
  return {
    ownerId: filter.owner.id,
    status: filter.statusLabel.trim().toLowerCase(),
    updatedAt: clock(),
  };
}
