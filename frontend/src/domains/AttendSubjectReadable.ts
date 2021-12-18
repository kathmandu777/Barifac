import { Subject, User, Evaluation, AttendSubject } from '.';

export type TargetValue = 'A' | 'B' | 'C';

export class ScoreReadable {
  constructor(
    public scoreUuid: string,
    public gotScore: number,
    public maxScore: number,
    public memo: string,
  ) {}
}

export class EvaluationReadable {
  constructor(
    public evaluationUuid: string,
    public evaluationName: string,
    public rate: number,
    public scores: ScoreReadable[],
  ) {}
}

export class AttendSubjectReadable {
  constructor(
    public uuid: string,
    public targetValue: TargetValue,
    public targetScore: number,
    public subjectUuid: string,
    public subjectName: string,
    public evaluations: EvaluationReadable[],
  ) {}
}
