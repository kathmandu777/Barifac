import { AttendSubjectObject, EvaluationObject, Score } from '.';

export interface ScoreObject {
  uuid: string;
  attendSubject: AttendSubjectObject;
  evaluation: EvaluationObject;
  gotScore: number;
  maxScore: number;
  memo: string;
}

export class ScoreFactory {
  public static createFromResponseObject(obj: ScoreObject) {
    return new Score(
      obj.uuid,
      obj.attendSubject,
      obj.evaluation,
      obj.gotScore,
      obj.maxScore,
      obj.memo,
    );
  }
}
