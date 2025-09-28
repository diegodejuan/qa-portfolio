import { test, expect } from "@playwright/test";
import { ApiClient } from "../apiClient";

test("GET /users?page=2 válido → 200 OK + verificación array respuesta", async ({ request }) => {
    const apiClient = new ApiClient(request);
    const response = await apiClient.getUsers(2);

    // Status esperado
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Validamos que contenga la propiedad data
    expect(body).toHaveProperty("data");

    //Validamos que body.data es un array
    expect(Array.isArray(body.data)).toBe(true);

    // Validamos que el array data no esté vacío
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

test("GET /users?page=2 → validación de paginación", async ({ request }) => {
    const page = 2;
    const apiClient = new ApiClient(request);
    const response = await apiClient.getUsers(page);

    expect(response.status()).toBe(200);

    const body = await response.json();

    //Validamos metadatos de paginación
    expect(body).toHaveProperty("page", page);
    expect(body).toHaveProperty("per_page");
    expect(body).toHaveProperty("total");
    expect(body).toHaveProperty("total_pages");

    //Reglas básicas de consistencia
    expect(body.per_page).toBeGreaterThan(0);
    expect(body.total_pages * body.per_page).toBeGreaterThanOrEqual(body.total);
    expect(body.data.length).toBeLessThanOrEqual(body.per_page);

    //Validamos que data sea array y no esté vacío
    expect(Array.isArray(body.data)).toBe(true);
    expect(body.data.length).toBeGreaterThan(0);
});

test("GET /users/23 → 404 Usuario no existe", async ({ request }) => {
    const response = await request.get('/api/users/23', {
        headers: {
            "x-api-key": "reqres-free-v1"
        }
    });

    //Validamos el status code
    expect(response.status()).toBe(404);

    //La API devuelve un objeto vacío
    expect(await response.json()).toEqual({});

});