const productRules = [
  "Never expose raw customer revenue in prompt context.",
  "Prefer read-only resources for catalog data.",
  "Return rule ids and summaries before returning full fixture records.",
];

export function listResources() {
  return [
    { uri: "inventory://rules", description: "Curated inventory planning rules" },
    { uri: "inventory://fixtures/summary", description: "Small fixture summary for agents" },
  ];
}

export function readResource(uri: string) {
  if (uri === "inventory://rules") {
    return productRules.join("\n");
  }
  if (uri === "inventory://fixtures/summary") {
    return "8 work items, 3 high risk, 2 blocked, no raw revenue fields exposed.";
  }
  throw new Error(`Unknown resource: ${uri}`);
}

console.log(JSON.stringify({ resources: listResources() }, null, 2));
