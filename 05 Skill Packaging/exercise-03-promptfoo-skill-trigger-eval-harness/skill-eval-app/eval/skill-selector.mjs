function normalize(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim()
}

export function selectSkill(prompt, catalog) {
  const input = normalize(prompt)
  if (/\b(explain|conceptually|what is|how does)\b/.test(input)) {
    return result("none", "Conceptual request; no workflow skill should trigger.")
  }

  const ranked = catalog
    .map((skill) => {
      const positive = skill.triggers.filter((term) =>
        input.includes(normalize(term)),
      ).length
      const negative = skill.exclusions.filter((term) =>
        input.includes(normalize(term)),
      ).length
      return { skill, score: positive * 2 - negative * 3 }
    })
    .filter(({ score }) => score > 0)
    .sort((left, right) => right.score - left.score)

  if (ranked.length === 0) {
    return result("none", "No candidate crossed the trigger threshold.")
  }

  return result(
    ranked[0].skill.name,
    `${ranked[0].skill.name} matched the strongest explicit workflow terms.`,
  )
}

function result(selectedSkill, rationale) {
  return {
    selectedSkill,
    rationale,
    inspectedFiles: [],
    artifact: {
      status: "ready",
      schemaVersion: "1.0",
    },
  }
}
