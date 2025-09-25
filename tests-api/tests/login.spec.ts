import { test, expect } from "@playwright/test";
import users from "../fixtures/users.json";

test("GET /users válido → 200 OK + verificación array respuesta", async ({ request }) => {
    const response = await request.get("/api/users?page=2");
    // Status esperado
    expect(response.status()).toBe(200);
    const body = await response.json();
    // Validamos que contenga la propiedad data
    expect(body).toHaveProperty("data");
    // Validamos que el array data no esté vacío
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);

    // Validamos que cada usuario tenga id, email, first_name, last_name y avatar
    for (const user of body.data) {
        expect(user).toHaveProperty("id");
        expect(user).toHaveProperty("email");
        expect(user).toHaveProperty("first_name");
        expect(user).toHaveProperty("last_name");
        expect(user).toHaveProperty("avatar");
    }
});

test("POST /login erróneo → 400 Bad Request", async ({ request }) => {
    const headers = {
        "x-api-key": "reqres-free-v1"
    }

    const response = await request.post("/api/login", {
        data: { email: users.validUser.email },
        headers: headers
    });

    expect(response.status()).toBe(400);
    const body = await response.json();

    //Validamos que la respuesta contenga la propiedad error
    expect(body).toHaveProperty("error");

    //Validamos mensaje de error
    expect(body.error).toEqual("Missing password");

});

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

test("POST /login sin password → 400 Bad Request", async ({ request }) => {
    const headers = {
        "x-api-key": "reqres-free-v1"
    };

    const response = await request.post("/api/login", {
        data: { email: users.validUser.email },
        headers: headers
    });

    expect(response.status()).toBe(400);

    const body = await response.json();

    // Validamos mensaje de error exacto
    expect(body).toMatchObject({ error: "Missing password" });
});

