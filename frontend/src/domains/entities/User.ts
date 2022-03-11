import { School } from 'domains';
import { DepartmentWithoutSchool } from './Department';

export type Grade = 1 | 2 | 3 | 4 | 5;

export class User {
  constructor(
    public uuid: string,
    public uid: string,
    public username: string,
    public email: string,
    public school: School,
    public department: DepartmentWithoutSchool,
    public grade: Grade,
  ) {}
}

export class ReductionUser {
  constructor(
    public uuid: string,
    public username: string,
    public grade: Grade,
  ) {}
}
