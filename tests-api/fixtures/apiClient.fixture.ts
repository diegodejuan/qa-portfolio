import { test as base, expect } from "@playwright/test";
import { ApiClient } from "../apiClient";
import users from "./users.json";

type ApiClientFixtures = {
  apiClient: ApiClient;
  users: typeof users;
};

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
