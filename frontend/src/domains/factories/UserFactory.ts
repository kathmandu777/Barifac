import {
  Grade,
  User,
  SchoolResponse,
  DepartmentResponse,
  SchoolFactory,
  DepartmentWithoutSchoolFactory,
} from '..';

export interface UserResponse {
  uuid: string;
  uid: string;
  username: string;
  email: string;
  school: SchoolResponse;
  department: DepartmentResponse;
  grade: Grade;
}

export class UserFactory {
  public static createFromResponse(res: UserResponse) {
    const school = SchoolFactory.createFromResponse(res.school);
    const department = DepartmentWithoutSchoolFactory.createFromResponse(
      res.department,
    );
    return new User(
      res.uuid,
      res.uid,
      res.username,
      res.email,
      school,
      department,
      res.grade,
    );
  }
}
