import { Subject, User } from ".";

export type TargetScore = 'A' | 'B' | 'C';

export class AttendSubject {
  constructor(
    public uuid: string,
    public user: User,
    public subject: Subject,
    public targetValue: number,
    public targetScore: TargetScore,
  ) {}
}
