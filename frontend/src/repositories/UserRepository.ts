import { authClient } from 'infras/RestClient';
import { UserFactory, UserResponse, Grade } from 'domains';

interface UpdateUserRequestParams {
  username: string;
  uid: string;
  email: string | undefined;
  grade: Grade;
  school_uuid: string;
  department_uuid: string;
}

export class UserRepository {
  static async getMe() {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<UserResponse>('/api/v1/users');
    return UserFactory.createFromResponse(res.data);
  }

  public static async update({
    username,
    uid,
    email,
    grade,
    school_uuid,
    department_uuid,
  }: Partial<UpdateUserRequestParams>) {
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
      Partial<UpdateUserRequestParams>,
      UserResponse
    >('/api/v1/users', params);
    return UserFactory.createFromResponse(res.data);
  }

  public static async delete() {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.delete('/api/v1/users');
    return res.data.text;
  }
}
