import { Subject, ReadableScore } from '..';

export class Evaluation {
  constructor(
    public uuid: string,
    public subject: Subject,
    public name: string,
    public rate: number,
    public type: string,
  ) {}
}

export class ReadableEvaluation {
  constructor(
    public evaluationUUID: string,
    public evaluationName: string,
    public rate: number,
    public scores: ReadableScore[],
  ) {}
}

export class EvaluationWithoutSubject {
  constructor(
    public uuid: string,
    public name: string,
    public rate: number,
    public type: string,
  ) {}
}
