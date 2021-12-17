import { AttendSubject, Evaluation } from '.';

export class Score {
  constructor(
    public uuid: string,
    public attendSubject: AttendSubject,
    public evaluation: Evaluation,
    public got_score: number,
    public max_score: number,
    public memo: string,
  ) {}
}

export class ScoreEval {
  constructor(
    public score_uuid: string,
    public attendSubject: AttendSubject,
    public evaluation: Evaluation,
    public got_score: number,
    public max_score: number,
    public memo: string,
  ) {}
}
