import { Subject, User } from '.';

export type TargetScore = 'A' | 'B' | 'C';

export class AttendSubject {
  constructor(
    public uuid: string,
    public user: User,
    public subject: Subject,
    // 応急処置
    public target_value: number,
    public target_score: TargetScore,
  ) {}
}
