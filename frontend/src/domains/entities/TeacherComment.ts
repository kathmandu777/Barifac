import { Teacher, User } from '..';

export class TeacherComment {
  constructor(
    public uuid: string,
    public teacher: Teacher,
    public user: User,
    public comment: string,
  ) {}
}
