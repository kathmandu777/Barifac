import { Grade, User, SchoolObject, DepartmentObject } from '.';

export interface UserObject {
  id: number;
  uid: string;
  name: string;
  email: string;
  school: SchoolObject;
  department: DepartmentObject;
  grade: Grade;
}

export class UserFactory {
  public static createFromResponseObject(obj: UserObject) {
    return new User(
      obj.id,
      obj.uid,
      obj.name,
      obj.email,
      obj.school,
      obj.department,
      obj.grade,
    );
  }
}
