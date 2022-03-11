import { School } from '..';

export class Department {
  constructor(
    public uuid: string,
    public school: School,
    public syllabusUrl: string,
    public name: string,
  ) {}
}

export class DepartmentWithoutSchool {
  constructor(
    public uuid: string,
    public syllabusUrl: string,
    public name: string,
  ) {}
}
