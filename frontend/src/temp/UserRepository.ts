import { authClient } from 'infras/RestClient';

export interface User {
  uuid: string;
}

export class UserRepository {
  static async get() {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<User>(`/api/v1/users`);
    return res.data;
  }
}
