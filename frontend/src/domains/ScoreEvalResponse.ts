import { Score } from 'domains';

// ValueObject
export class ScoreEvalResponse {
  constructor(
    public evaluationName: string,
    public evaluationUUID: string,
    public rate: number,
    public scores: Score[],
  ) {}
}
