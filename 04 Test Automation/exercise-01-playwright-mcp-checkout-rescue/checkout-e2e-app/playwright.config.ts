import { defineConfig, devices } from "@playwright/test";

const isCi = Boolean(
  (globalThis as { process?: { env?: { CI?: string } } }).process?.env?.CI,
);

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  workers: 2,
  retries: isCi ? 1 : 0,
  reporter: [
    ["line"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
  ],
  use: {
    baseURL: "http://127.0.0.1:5173",
    screenshot: "on",
    trace: "on",
    video: "on",
  },
  webServer: {
    command: "npm run dev",
    url: "http://127.0.0.1:5173",
    reuseExistingServer: !isCi,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
