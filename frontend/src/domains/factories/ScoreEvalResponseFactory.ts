import { ScoreEval, ScoreEvalResponse } from 'domains';

export interface ScoreEvalResponseObject {
  evaluation_name: string;
  evaluation_uuid: string;
  attend_subject_uuid: string;
  subject_name: string;
  rate: number;
  scores: ScoreEval[];
}

export class ScoreEvalResponseObjectFactory {
  public static createFromResponseObject(obj: ScoreEvalResponseObject) {
    return new ScoreEvalResponse(
      obj.evaluation_name,
      obj.evaluation_uuid,
      obj.attend_subject_uuid,
      obj.subject_name,
      obj.rate,
      obj.scores,
    );
  }
}
