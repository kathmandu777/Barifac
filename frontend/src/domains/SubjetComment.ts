import { Subject, User } from '.';

export class SubjectComment {
  constructor(
    public uuid: string,
    public subject: Subject,
    public user: User,
    public comment: string,
  ) {}
}
