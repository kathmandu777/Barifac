import { Department, SchoolObject } from '.';

export interface DepartmentObject {
  uuid: string;
  school: SchoolObject;
  name: string;
}

export class DepartmentFactory {
  public static createFromResponseObject(obj: DepartmentObject) {
    return new Department(
      obj.uuid,
      obj.school,
      obj.name,
    );
  }
}
