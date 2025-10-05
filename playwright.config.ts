import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: process.env.MOCK_PRUEBA_BASE_URL || "http://127.0.0.1:3000",
  },
});
