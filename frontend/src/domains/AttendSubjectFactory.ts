import { AttendSubject, TargetScore, SubjectObject, UserObject } from '.';

export interface AttendSubjectObject {
  uuid: string;
  user: UserObject;
  subject: SubjectObject;
  targetValue: number;
  targetScore: TargetScore;
}

export class AttendSubjectFactory {
  public static createFromResponseObject(obj: AttendSubjectObject) {
    return new AttendSubject(
      obj.uuid,
      obj.user,
      obj.subject,
      obj.targetValue,
      obj.targetScore,
    );
  }
}
