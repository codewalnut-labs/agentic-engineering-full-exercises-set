export function summaryFailures(html, editable, approvalRequired) {
  const failures = [];
  const section = html.match(/<section\b[^>]*\baria-label="Release Readiness Summary"[^>]*>([\s\S]*?)<\/section>/i)?.[1];
  if (!section) return ["add a section with aria-label=\"Release Readiness Summary\""];
  const text = section.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
  if (!/Release Readiness Summary/i.test(text)) failures.push("include a visible Release Readiness Summary heading");
  const nearby = (label, value) =>
    new RegExp(`\\b${label}\\b[^0-9]{0,60}\\b${value}\\b`, "i").test(text) ||
    new RegExp(`\\b${value}\\b[^A-Za-z0-9]{0,60}\\b${label}\\b`, "i").test(text);
  if (!nearby("editable", editable)) failures.push("show the current agent-editable count inside the summary");
  if (!nearby("approval", approvalRequired)) failures.push("show the current approval-required count inside the summary");
  return failures;
}
