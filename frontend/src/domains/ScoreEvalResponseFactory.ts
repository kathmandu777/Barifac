import { Score, ScoreEvalResponse } from 'domains';

export interface ScoreEvalResponseObject {
  evaluation_name: string;
  evaluation_uuid: string;
  rate: number;
  scores: Score[];
}

export class ScoreEvalResponseObjectFactory {
  public static createFromResponseObject(obj: ScoreEvalResponseObject) {
    return new ScoreEvalResponse(
      obj.evaluation_name,
      obj.evaluation_uuid,
      obj.rate,
      obj.scores,
    );
  }
}
