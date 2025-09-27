import { test, expect } from "@playwright/test";
import { ApiClient } from "../ApiClient";

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