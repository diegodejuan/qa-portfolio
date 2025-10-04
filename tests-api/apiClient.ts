import { APIRequestContext, APIResponse } from "@playwright/test";

export class ApiClient {
  private static readonly basePath = "/api";

  //Al declarar la propiedad request como private, TypeScript crea automáticamente la propiedad y la inicializa
  constructor(private request: APIRequestContext) {}

  private buildUrl(path: string): string {
    return `${ApiClient.basePath}${path}`;
  }

  private buildHeaders(extraHeaders: Record<string, string> = {}): Record<string, string> {
    return {
      "x-api-key": "reqres-free-v1",
      ...extraHeaders
    };
  }

  async login(data: object): Promise<APIResponse> {
    return await this.request.post(this.buildUrl("/login"), {
      data,
      headers: this.buildHeaders()
    });
  }

  async getUsers(page: number = 1): Promise<APIResponse> {
    return await this.request.get(this.buildUrl(`/users?page=${page}`), {
      headers: this.buildHeaders()
    });
  }

  async getUser(id: number): Promise<APIResponse> {
    return await this.request.get(this.buildUrl(`/users/${id}`), {
      headers: this.buildHeaders()
    });
  }
}
