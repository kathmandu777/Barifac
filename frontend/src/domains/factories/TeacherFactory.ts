import { SchoolFactory, SchoolResponse, Teacher } from '..';

export interface TeacherResponse {
  uuid: string;
  name: string;
  school: SchoolResponse;
}

export class TeacherFactory {
  public static createFromResponse(res: TeacherResponse) {
    return new Teacher(
      res.uuid,
      res.name,
      SchoolFactory.createFromResponse(res.school),
    );
  }
}
