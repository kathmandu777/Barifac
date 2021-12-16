import { Grade } from 'domains';

export class UserUpdateRequest {
  constructor(
    public uid: string,
    public username: string,
    public email: string | undefined,
    public grade: Grade,
    public school_uuid: string,
    public department_uuid: string,
  ) {}
}
