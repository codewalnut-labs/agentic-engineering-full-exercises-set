import { readFile } from "node:fs/promises";
import path from "node:path";

export default class DeterministicReviewProvider {
  id() {
    return "deterministic-review-provider";
  }

  async callApi(prompt, context) {
    const diffReference = context?.vars?.diff;
    const diff =
      typeof diffReference === "string" && diffReference.startsWith("file://")
        ? await readFile(path.resolve(diffReference.slice("file://".length)), "utf8")
        : String(diffReference ?? "");
    const reviewInput = `${prompt}\n${diff}`;
    const findings = [];
    const checksSearch =
      /searchable field/i.test(prompt) && /(partial|substring)/i.test(prompt);
    const checksBlockedRisk =
      /status filter/i.test(prompt) && /due-today/i.test(prompt) && /blocked/i.test(prompt);
    const checksTruncation =
      /(list slice|limit)/i.test(prompt) && /(pagination|hidden work)/i.test(prompt);

    if (
      checksSearch &&
      reviewInput.includes(".startsWith(filters.query.toLowerCase())") &&
      !reviewInput.includes("+      [item.name, item.owner, item.summary, item.note")
    ) {
      findings.push(
        "High: owner and note search were removed, and partial matching became prefix-only.",
      );
    }

    if (
      checksBlockedRisk &&
      (reviewInput.includes('item.status !== "Blocked"') ||
        (reviewInput.includes("item.dueInDays < 3 ? 12 : 0") &&
          reviewInput.includes('item.status === "Escalated" ? 12 : 0')))
    ) {
      findings.push(
        "High: blocked work can disappear and due-today risk loses its required blocked penalty.",
      );
    }

    if (
      checksTruncation &&
      reviewInput.includes("items.slice(0, 5)") &&
      reviewInput.includes("visibleItems.map")
    ) {
      findings.push(
        "High: the queue silently hides every item after the fifth without pagination or an overflow state.",
      );
    }

    return { output: findings.length ? findings.join("\n") : "NO_BLOCKERS" };
  }
}
