import { Subject, TeacherObject, TermObject } from '.';

export interface SubjectObject {
  uuid: string;
  term: TermObject;
  name: string;
  teacher: TeacherObject;
  credits: number;
}

export class SubjectFactory {
  public static createFromResponseObject(obj: SubjectObject) {
    return new Subject(obj.uuid, obj.term, obj.name, obj.teacher, obj.credits);
  }
}
