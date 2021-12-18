import { authClient } from 'infras/RestClient';
import { UserFactory, UserObject } from 'domains';

interface UserUpdateRequest {
  username: string;
  uid: string;
  email: string | undefined;
  grade: Grade;
  school_uuid: string;
  department_uuid: string;
}

export type Grade = 1 | 2 | 3 | 4 | 5;

//export class User {
//  constructor(
//    public uuid: string,
//    public uid: string,
//    public username: string,
//    public email: string,
//    public school: School,
//    public department: Department,
//    public grade: Grade,
//  ) {}
//}

export interface UserInterface {
  uuid: string;
  uid: string;
  username: string;
  email: string;
  school: {
    uuid: string;
    syllabus_url: string;
    name: string;
  };
  department: {
    uuid: string;
    syllabus_url: string;
    name: string;
  };
  grade: Grade;
}

export class UserRepository {
  static async getMe() {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<UserInterface>('/api/v1/users');
    return res.data;
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
