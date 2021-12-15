import {
  Subject,
  TeacherFactory,
  TeacherObject,
  TermFactory,
  TermObject,
} from '.';

export interface SubjectObject {
  uuid: string;
  term: TermObject;
  name: string;
  teacher: TeacherObject;
  credits: number;
}

export class SubjectFactory {
  public static createFromResponseObject(obj: SubjectObject) {
    return new Subject(
      obj.uuid,
      TermFactory.createFromResponseObject(obj.term),
      obj.name,
      TeacherFactory.createFromResponseObject(obj.teacher),
      obj.credits,
    );
  }
}
