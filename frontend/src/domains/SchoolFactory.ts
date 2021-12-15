import { School } from '.';

export interface SchoolObject {
  uuid: string;
  syllabus_url: string;
  name: string;
}

export class SchoolFactory {
  public static createFromResponseObject(obj: SchoolObject) {
    return new School(obj.uuid, obj.syllabus_url, obj.name);
  }
}
