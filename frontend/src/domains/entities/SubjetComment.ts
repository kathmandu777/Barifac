import { ReductionUser, Subject } from '..';

export class SubjectComment {
  constructor(
    public uuid: string,
    public subject: Subject,
    public user: ReductionUser,
    public comment: string,
  ) {}
}
