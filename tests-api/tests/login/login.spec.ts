import { test, expect } from "../../fixtures/apiClient.fixture";

test("POST /login válido → 200 OK + token no vacío", async ({ apiClient, users }) => {
    const response = await apiClient.login(users.validUser);

    const body = await response.json();

    // Status esperado
    expect(response.status()).toBe(200);

    // Validamos que contenga la propiedad token
    expect(body).toHaveProperty("token");

    // Validamos que el token sea un string no vacío
    expect(typeof body.token).toBe("string");
    expect(body.token.length).toBeGreaterThan(0);
});

test("POST /login sin password → 400 Bad Request", async ({ apiClient, users }) => {
    const response = await apiClient.login({ email: users.validUser.email });
    
    expect(response.status()).toBe(400);

    const body = await response.json();

    // Validamos mensaje de error exacto
    expect(body).toMatchObject({ error: "Missing password" });
});


test("POST /login sin email → 400 Bad Request", async ({ apiClient, users }) => {
    const response = await apiClient.login({ password: users.validUser.password });
    
    expect(response.status()).toBe(400);
    const body = await response.json();

    //Validamos que la respuesta contenga la propiedad error
    expect(body).toHaveProperty("error");

    //Validamos mensaje de error
    expect(body.error).toEqual("Missing email or username");
});

test("POST /login no expone la contraseña en la respuesta", async ({ apiClient, users }) => {
    const response = await apiClient.login(users.validUser);
    const body = await response.json();

    // La respuesta nunca debe contener la propiedad 'password'
    expect(body).not.toHaveProperty("password");
});

test("POST /login con JSON corrupto → 400 Bad Request", async ({ request }) => {
    const response = await request.post("/api/login", {
        headers: {
            "Content-Type": "application/json",
            "x-api-key": "mock-prueba-free-v1",
        },
        // Playwright envuelve los strings en comillas cuando se usa `data`. Al mandar el payload
        // como Buffer lo enviamos en crudo para que el servidor reciba realmente `{bad json` y
        // dispare el handler de JSON inválido.
        data: Buffer.from("{bad json"),
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    expect(body).toMatchObject({ error: "Invalid JSON payload" });
});

