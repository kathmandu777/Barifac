import { Subject, User, ReadableEvaluation } from '..';

export type TargetValue = 'A' | 'B' | 'C';

export class AttendSubject {
  constructor(
    public uuid: string,
    public user: User,
    public subject: Subject,
    public targetValue: TargetValue,
    public targetScore: number,
  ) {}
}

export class ReadableAttendSubject {
  constructor(
    public uuid: string,
    public targetValue: TargetValue,
    public targetScore: number,
    public subjectUUID: string,
    public subjectName: string,
    public evaluations: ReadableEvaluation[],
  ) {}
}
