import { defineConfig } from "@playwright/test";

//Al lanzar cualquier prueba con Playwright (por ejemplo desde el test runner integrado de VS Code usando el script npm test),
//Playwright arranca automáticamente el servidor definido en playwright.config.ts. Allí se declara un webServer cuya orden es
//node src/api/server.js, de modo que antes de ejecutar los tests se lanza ese proceso y se reutiliza si ya estaba activo en
//entornos no CI.

//Este archivo asegura que, al ejecutar los tests, el servidor de la API esté activo y que las pruebas usen la URL
//y puerto correctos. 

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
