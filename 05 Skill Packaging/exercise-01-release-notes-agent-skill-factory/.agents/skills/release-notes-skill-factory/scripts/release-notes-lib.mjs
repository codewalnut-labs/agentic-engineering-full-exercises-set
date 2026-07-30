const publishedTypes = ["Added", "Changed", "Fixed", "Security", "Deprecated", "Removed"]

function hasEvidence(change) {
  return Array.isArray(change.evidence) && change.evidence.length > 0
}

function isComplete(change) {
  return (
    hasEvidence(change) &&
    typeof change.owner === "string" &&
    change.owner.trim().length > 0 &&
    Array.isArray(change.files) &&
    change.files.length > 0 &&
    change.rollout?.trim().length > 0 &&
    change.rollback?.trim().length > 0 &&
    (!change.breaking ||
      change.migration?.trim().length > 0)
  )
}

function details(change, includeMigration = false) {
  const lines = [
    `- Owner: ${change.owner}`,
    `- Evidence: ${change.evidence.join("; ")}`,
    `- Rollout: ${change.rollout}`,
  ]
  if (includeMigration) lines.push(`- Migration: ${change.migration}`)
  lines.push(`- Rollback: ${change.rollback}`)
  return lines.join("\n")
}

export function renderReleaseNotes(release) {
  const customerChanges = release.changes.filter((change) => change.customerFacing)
  const publishable = customerChanges.filter(isComplete)
  const breaking = publishable.filter((change) => change.breaking)
  const blocked = customerChanges.filter((change) => !isComplete(change))
  const internal = release.changes.filter((change) => !change.customerFacing)
  const sections = [
    `# ${release.product} ${release.version}`,
    "",
    `Release date: ${release.date}  `,
    `Compare: ${release.compare}`,
    "",
    "## Breaking changes",
    "",
  ]

  if (breaking.length === 0) {
    sections.push("None.", "")
  } else {
    for (const change of breaking) {
      sections.push(
        `### ${change.id} - ${change.type}`,
        "",
        change.summary,
        "",
        details(change, true),
        "",
      )
    }
  }

  for (const type of publishedTypes) {
    const changes = publishable.filter(
      (change) => change.type === type && !change.breaking,
    )
    if (changes.length === 0) continue
    sections.push(`## ${type}`, "")
    for (const change of changes) {
      sections.push(
        `### ${change.id}`,
        "",
        change.summary,
        "",
        details(change),
        "",
      )
    }
  }

  sections.push("## Not ready for publication", "")
  if (blocked.length === 0) {
    sections.push("None.", "")
  } else {
    for (const change of blocked) {
      const missing = []
      if (!hasEvidence(change)) missing.push("verification evidence")
      if (!change.owner?.trim()) missing.push("owner")
      if (!change.files?.length) missing.push("diff mapping")
      if (!change.rollout?.trim()) missing.push("rollout guidance")
      if (!change.rollback?.trim()) missing.push("rollback guidance")
      if (change.breaking && !change.migration?.trim()) missing.push("migration guidance")
      sections.push(`- **${change.id}:** ${change.summary} Missing ${missing.join(", ")}.`)
    }
    sections.push("")
  }

  sections.push(
    "## Internal changes excluded",
    "",
    `${internal.length} internal-only change${internal.length === 1 ? " was" : "s were"} excluded from customer-facing notes.`,
    "",
  )

  return `${sections.join("\n").trim()}\n`
}

export { isComplete, publishedTypes }
