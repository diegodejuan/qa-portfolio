import { test as base, expect } from "@playwright/test";
import { ApiClient } from "../apiClient";
import users from "./users.json";

//ApiClientFixtures define los nombres y tipos de los fixtures personalizados (apiClient y users),
//ampliándose el contexto de Playwright con estos recursos reutilizables.

type ApiClientFixtures = {
  apiClient: ApiClient;
  users: typeof users;
};

//base.extend<ApiClientFixtures>({...}) crea el test extendido.
//Dentro, el fixture apiClient recibe el request de Playwright, instancia ApiClient y lo expone al test mediante use,
//mientras que users comparte el JSON ya cargado.

export const test = base.extend<ApiClientFixtures>({
  apiClient: async ({ request }, use) => {
    const client = new ApiClient(request);
    await use(client);
  },
  users: async ({}, use) => {
    await use(users);
  }
});

export { expect };
