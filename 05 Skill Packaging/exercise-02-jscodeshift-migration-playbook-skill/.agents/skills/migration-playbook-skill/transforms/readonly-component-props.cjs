/**
 * Mark properties readonly for the explicitly selected component props
 * interface. The transform is intentionally narrow and idempotent.
 */
module.exports = function transform(file, api, options) {
  const j = api.jscodeshift
  const interfaceName = options.interfaceName
  if (!interfaceName) {
    throw new Error("--interfaceName is required")
  }

  const root = j(file.source)
  let changed = false

  root
    .find(j.TSInterfaceDeclaration)
    .filter((path) => path.node.id.name === interfaceName)
    .forEach((path) => {
      for (const member of path.node.body.body) {
        if (member.type === "TSPropertySignature" && !member.readonly) {
          member.readonly = true
          changed = true
        }
      }
    })

  return changed ? root.toSource({ quote: "double", trailingComma: true }) : file.source
}

module.exports.parser = "tsx"
