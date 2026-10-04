export function adoptionGate(before, after) {
  const failures = [];
  if (after.train.case_accuracy < 10 / 12) failures.push("training majority accuracy must be at least 10/12");
  if (after.held_out.case_accuracy < 7 / 8) failures.push("reserved majority accuracy must be at least 7/8");
  if (after.held_out.recall < 0.75) failures.push("reserved recall must be at least 0.75");
  if (after.held_out.specificity < 0.75) failures.push("reserved specificity must be at least 0.75");
  if (after.overall.unanimous_rate < 0.8) failures.push("at least 80 percent of requests must have unanimous decisions");
  const improved = after.held_out.case_accuracy > before.held_out.case_accuracy;
  if (before.held_out.case_accuracy < 7 / 8 && !improved) failures.push("reserved accuracy must improve over a baseline below the acceptance threshold");
  return { failures, decision: improved && !failures.length ? "adopt" : "reject" };
}
