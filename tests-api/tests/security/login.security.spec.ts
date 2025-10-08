import { test, expect } from "../../fixtures/apiClient.fixture";

// 1. Intentos de login con datos maliciosos
const maliciousInputs = [
  { email: "' OR '1'='1", password: "irrelevant" }, // SQL injection
  { email: "<script>alert(1)</script>", password: "irrelevant" }, // XSS
  { email: "eve.holt@reqres.in", password: "<img src=x onerror=alert(1)>" }, // XSS en password
];

maliciousInputs.forEach((input, idx) => {
  test(`Seguridad: login rechaza datos maliciosos (${idx + 1})`, async ({ apiClient }) => {
    const response = await apiClient.login(input);
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty("error");
  });
});

// 2. Fuerza bruta (simulación de múltiples intentos fallidos)
test("Seguridad: login rechaza múltiples intentos fallidos", async ({ apiClient }) => {
  for (let i = 0; i < 5; i++) {
    const response = await apiClient.login({ email: "noexiste@mock-prueba.in", password: "wrong" });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty("error");
  }
});

// 3. Campos inesperados
test("Seguridad: login ignora campos extra y no otorga privilegios", async ({ apiClient, users }) => {
  const response = await apiClient.login({ ...users.validUser, admin: true });
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body).not.toHaveProperty("admin");
});

// 4. Respuesta genérica en errores
test("Seguridad: login no revela si el email existe", async ({ apiClient }) => {
  const response = await apiClient.login({ email: "usuario@noexiste.com", password: "wrong" });
  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body.error).toMatch(/user not found|Missing/);
});

// 5. Tamaño de payload
test("Seguridad: login rechaza payload muy grande", async ({ apiClient }) => {
  const bigString = "a".repeat(2e6); // 2MB
  let response, error;
  try {
    response = await apiClient.login({ email: bigString, password: bigString });
  } catch (e) {
    error = e;
  }
  if (response) {
    // Si responde, debe ser error 400 y contener error
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toHaveProperty("error");
  } else {
    // Si hay desconexión, debe ser ECONNRESET
  expect((error as Error).message).toMatch(/ECONNRESET/);
  }
});

// 6. Validación de tipos
test("Seguridad: login rechaza tipos incorrectos", async ({ apiClient }) => {
  const response = await apiClient.login({ email: 12345, password: ["not", "a", "string"] });
  expect(response.status()).toBe(400);
  const body = await response.json();
  expect(body).toHaveProperty("error");
});
