import { AttendSubject, TargetScore, SubjectObject, UserObject } from '.';

export interface AttendSubjectObject {
  uuid: string;
  user: UserObject;
  subject: SubjectObject;
  target_value: number;
  target_score: TargetScore;
}

export class AttendSubjectFactory {
  public static createFromResponseObject(obj: AttendSubjectObject) {
    return new AttendSubject(
      obj.uuid,
      obj.user,
      obj.subject,
      obj.target_value,
      obj.target_score,
    );
  }
}
