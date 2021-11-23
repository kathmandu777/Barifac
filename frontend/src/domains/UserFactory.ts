import { Grade, User } from '.';

export interface UserObject {
  id: number;
  name: string;
  email: string;
  school: string;
  department: string;
  grade: Grade;
}

export class UserFactory {
  public static createFromResponseObject(obj: UserObject) {
    return new User(
      obj.id,
      obj.name,
      obj.email,
      obj.school,
      obj.department,
      obj.grade,
    );
  }
}
