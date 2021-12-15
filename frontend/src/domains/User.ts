import { School, Department } from 'domains';

export type Grade = 1 | 2 | 3 | 4 | 5;

export class User {
  constructor(
    public uuid: string,
    public uid: string,
    public username: string,
    public email: string,
    public school: School,
    public department: Department,
    public grade: Grade,
  ) {}
}
