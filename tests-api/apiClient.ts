import { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiClient {
  //Al declarar la propiedad request como private, TypeScript crea automáticamente la propiedad y la inicializa  
  constructor(private request: APIRequestContext) {}

  async login(data: object): Promise<APIResponse> {
    return await this.request.post("/api/login", {
      data,
      headers: {
        "x-api-key": "reqres-free-v1"
      }
    });
  }

  async getUsers(page: number = 1): Promise<APIResponse> {
    return await this.request.get(`/api/users?page=${page}`);
  }
}
