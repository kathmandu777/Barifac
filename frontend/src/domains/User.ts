import { School, Department } from 'domains';

export type Grade = 0 | 1 | 3 | 4 | 5;

export class User {
  constructor(
    public id: number,
    public uid: string,
    public name: string,
    public email: string,
    public school: School,
    public department: Department,
    public grade: Grade,
  ) {}
}
