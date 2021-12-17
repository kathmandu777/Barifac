import { ScoreEval } from 'domains';

// ValueObject
export class ScoreEvalResponse {
  constructor(
    public evaluationName: string,
    public evaluationUUID: string,
    public attendSubjectUUID: string,
    public subjectName: string,
    public rate: number,
    public scores: ScoreEval[],
  ) {}
}
