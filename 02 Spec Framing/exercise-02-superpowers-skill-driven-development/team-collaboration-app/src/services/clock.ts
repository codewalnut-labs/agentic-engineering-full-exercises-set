const bootEpochMs = Date.now();
const bootPerformanceMs = performance.now();

export function now(): string {
  const elapsedMs = performance.now() - bootPerformanceMs;
  return new Date(bootEpochMs + elapsedMs).toISOString();
}
