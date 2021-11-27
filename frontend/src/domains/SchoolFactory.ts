import { School } from '.';

export interface SchoolObject {
  uuid: string;
  name: string,
}

export class SchoolFactory {
  public static createFromResponseObject(obj: SchoolObject) {
    return new School(
      obj.uuid,
      obj.name,
    );
  }
}
