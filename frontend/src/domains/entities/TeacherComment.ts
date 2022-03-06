import { ReductionUser, Teacher } from '..';

export class TeacherComment {
  constructor(
    public uuid: string,
    public teacher: Teacher,
    public user: ReductionUser,
    public comment: string,
  ) {}
}
