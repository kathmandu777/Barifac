import { School } from '..';

export interface SchoolResponse {
  uuid: string;
  syllabus_url: string;
  name: string;
}

export class SchoolFactory {
  public static createFromResponse(res: SchoolResponse) {
    return new School(res.uuid, res.syllabus_url, res.name);
  }
}
