import {
  AttendSubjectFactory,
  AttendSubjectResponse,
  EvaluationFactory,
  EvaluationResponse,
  ReadableScore,
  Score,
} from '..';

export interface ScoreResponse {
  uuid: string;
  attend_subject: AttendSubjectResponse;
  evaluation: EvaluationResponse;
  got_score: number;
  max_score: number;
  memo: string;
}

export interface ReadableScoreResponse {
  score_uuid: string;
  got_score: number;
  max_score: number;
  memo: string;
}

export class ScoreFactory {
  public static createFromResponseObject(res: ScoreResponse) {
    const attendSubject = AttendSubjectFactory.createFromResponse(
      res.attend_subject,
    );
    const evaluation = EvaluationFactory.createFromResponse(res.evaluation);
    return new Score(
      res.uuid,
      attendSubject,
      evaluation,
      res.got_score,
      res.max_score,
      res.memo,
    );
  }
}

export class ReadableScoreFactory {
  public static createFromResponse(res: ReadableScoreResponse) {
    return new ReadableScore(
      res.score_uuid,
      res.got_score,
      res.max_score,
      res.memo,
    );
  }
}
