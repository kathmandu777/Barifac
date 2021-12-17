// TODO: スネークケースをキャメルケースに変換するために後々対応すべき
import {
  AttendSubject,
  AttendSubjectReadable,
  TargetValue,
  SubjectObject,
  UserObject,
  UserFactory,
  SubjectFactory,
  Evaluation,
  EvaluationFactory,
} from '.';

export interface AttendSubjectReadableObject {
  uuid: string;
  targetValue: TargetValue;
  targetScore: number;
  subjectUuid: string;
  subjectName: string;
  evaluations: Evaluation[];
}

export class AttendSubjectReadableFactory {
  public static createFromResponseObject(obj: AttendSubjectReadableObject) {
    return new AttendSubjectReadable(
      obj.uuid,
      obj.targetValue,
      obj.targetScore,
      obj.subjectUuid,
      obj.subjectName,
      //EvaluationFactory.createFromResponseObject(obj.evaluations),
    );
  }
}
