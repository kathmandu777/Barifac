import {
  Department,
  DepartmentWithoutSchool,
  SchoolFactory,
  SchoolResponse,
} from '..';

export interface DepartmentResponse {
  uuid: string;
  school: SchoolResponse;
  syllabus_url: string;
  name: string;
}

export type DepartmentWithoutSchoolResponse = Omit<
  DepartmentResponse,
  'school'
>;

export class DepartmentFactory {
  public static createFromResponse(res: DepartmentResponse) {
    return new Department(
      res.uuid,
      SchoolFactory.createFromResponse(res.school),
      res.syllabus_url,
      res.name,
    );
  }
}

export class DepartmentWithoutSchoolFactory {
  public static createFromResponse(res: DepartmentWithoutSchoolResponse) {
    return new DepartmentWithoutSchool(res.uuid, res.syllabus_url, res.name);
  }
}
