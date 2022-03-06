import {
  Grade,
  User,
  SchoolResponse,
  DepartmentResponse,
  SchoolFactory,
  DepartmentWithoutSchoolFactory,
  ReductionUser,
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

export type ReductionUserResponse = Pick<
  UserResponse,
  'uuid' | 'username' | 'grade'
>;

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

export class ReductionUserFactory {
  public static createFromResponse(res: ReductionUserResponse) {
    return new ReductionUser(res.uuid, res.username, res.grade);
  }
}
