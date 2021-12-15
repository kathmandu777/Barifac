import { SchoolFactory, SchoolObject, Teacher } from '.';

export interface TeacherObject {
  uuid: string;
  name: string;
  school: SchoolObject;
}

export class TeacherFactory {
  public static createFromResponseObject(obj: TeacherObject) {
    return new Teacher(
      obj.uuid,
      obj.name,
      SchoolFactory.createFromResponseObject(obj.school),
    );
  }
}
