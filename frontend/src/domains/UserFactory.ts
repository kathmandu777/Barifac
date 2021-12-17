import {
  Grade,
  User,
  SchoolObject,
  DepartmentObject,
  SchoolFactory,
  DepartmentFactory,
} from '.';

export interface UserObject {
  uuid: string;
  uid: string;
  username: string;
  email: string;
  school: SchoolObject;
  department: DepartmentObject;
  grade: Grade;
}

export class UserFactory {
  public static createFromResponseObject(obj: UserObject) {
    return new User(
      obj.uuid,
      obj.uid,
      obj.username,
      obj.email,
      obj.school,
      obj.department,
      obj.grade,
    );
  }
}
