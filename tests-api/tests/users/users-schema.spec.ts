import { test, expect } from "@playwright/test";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import schema from "../../schemas/user-schema.json";
import { ApiClient } from "../../apiClient";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);
const validate = ajv.compile(schema);

test("GET /users → validación de esquema con AJV", async ({ request }) => {
    const apiClient = new ApiClient(request);
    const response = await apiClient.getUsers(2);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty("data");
    expect(Array.isArray(body.data)).toBe(true);

    // Validamos cada usuario contra el esquema
    for (const user of body.data) {
        const valid = validate(user);
        if (!valid) {
            console.error("Errores de esquema:", validate.errors);
        }
        expect(valid).toBe(true);
    }
});
