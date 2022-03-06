import {
  AttendSubject,
  TargetValue,
  SubjectResponse,
  UserResponse,
  ReadableEvaluationResponse,
  ReadableAttendSubject,
  ReadableEvaluationFactory,
  SubjectFactory,
  UserFactory,
} from '..';

export interface AttendSubjectResponse {
  uuid: string;
  user: UserResponse;
  subject: SubjectResponse;
  target_value: TargetValue;
  target_score: number;
}

export interface ReadableAttendSubjectResponse {
  uuid: string;
  target_value: TargetValue;
  target_score: number;
  subject_uuid: string;
  subject_name: string;
  evaluations: ReadableEvaluationResponse[];
}

export class AttendSubjectFactory {
  public static createFromResponse(res: AttendSubjectResponse) {
    const subject = SubjectFactory.createFromResponse(res.subject);
    const user = UserFactory.createFromResponse(res.user);
    return new AttendSubject(
      res.uuid,
      user,
      subject,
      res.target_value,
      res.target_score,
    );
  }
}

export class ReadableAttendSubjectFactory {
  public static createFromResponse(res: ReadableAttendSubjectResponse) {
    const evaluations = res.evaluations.map(
      ReadableEvaluationFactory.createFromResponse,
    );
    return new ReadableAttendSubject(
      res.uuid,
      res.target_value,
      res.target_score,
      res.subject_uuid,
      res.subject_name,
      evaluations,
    );
  }
}
