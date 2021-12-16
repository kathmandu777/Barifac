import { authClient } from 'infras/RestClient';
import { UserFactory, UserObject, UserUpdateRequest } from 'domains';

export class UserRepository {
  static async getMe() {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<UserObject>('/api/v1/users');
    return UserFactory.createFromResponseObject(res.data);
  }

  public static async update({
    username,
    uid,
    email,
    grade,
    school_uuid,
    department_uuid,
  }: Partial<UserUpdateRequest>) {
    const params = {
      username,
      uid,
      email,
      grade,
      school_uuid,
      department_uuid,
    };
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.put<
      Partial<UserUpdateRequest>,
      UserObject
    >('/api/v1/users', params);
    return UserFactory.createFromResponseObject(res.data);
  }

  public static async delete() {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.delete('/api/v1/users');
    return res.data.text;
  }
}
