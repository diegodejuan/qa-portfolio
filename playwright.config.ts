import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: process.env.MOCK_PRUEBA_BASE_URL || "http://127.0.0.1:3000",
  },
  webServer: {
    command: "node src/api/server.js",
    port: Number(process.env.MOCK_PRUEBA_PORT) || 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000
  }
});
