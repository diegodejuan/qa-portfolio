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

