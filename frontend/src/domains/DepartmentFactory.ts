import { Department, SchoolObject } from '.';

export interface DepartmentObject {
  uuid: string;
  school: SchoolObject;
  syllabus_url: string;
  name: string;
}

export class DepartmentFactory {
  public static createFromResponseObject(obj: DepartmentObject) {
    return new Department(obj.uuid, obj.school, obj.syllabus_url, obj.name);
  }
}
