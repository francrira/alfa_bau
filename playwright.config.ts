import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests",
  // Unique run folders avoid OneDrive locks when Playwright clears old artifacts.
  outputDir: "test-results/run-" + Date.now(),
  fullyParallel: true,
  workers: 2,
  reporter: "list",
  use: { baseURL: "http://127.0.0.1:4173", channel: "chrome", headless: true, trace: "retain-on-failure" },
  webServer: { command: "node tests/serve-export.mjs", url: "http://127.0.0.1:4173", reuseExistingServer: false },
});
