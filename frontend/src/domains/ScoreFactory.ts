import { AttendSubjectObject, EvaluationObject, Score } from '.';

export interface ScoreObject {
  uuid: string;
  attendSubject: AttendSubjectObject;
  evaluation: EvaluationObject;
  got_score: number;
  max_score: number;
  memo: string;
}

export class ScoreFactory {
  public static createFromResponseObject(obj: ScoreObject) {
    return new Score(
      obj.uuid,
      obj.attendSubject,
      obj.evaluation,
      obj.got_score,
      obj.max_score,
      obj.memo,
    );
  }
}
