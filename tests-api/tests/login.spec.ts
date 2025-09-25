import { test, expect } from "@playwright/test";
import users from "../fixtures/users.json";

test("POST /login válido → 200 OK + token no vacío", async ({ request }) => {
    const headers = {
        "x-api-key": "reqres-free-v1"
    };
    
    const response = await request.post("/api/login", {
        data: users.validUser,
        headers: headers
    });

    const body = await response.json();

    // Status esperado
    expect(response.status()).toBe(200);

    // Validamos que contenga la propiedad token
    expect(body).toHaveProperty("token");

    // Validamos que el token sea un string no vacío
    expect(typeof body.token).toBe("string");
    expect(body.token.length).toBeGreaterThan(0);
});
