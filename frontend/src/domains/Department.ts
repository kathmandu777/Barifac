import { School } from '.';

export class Department {
  constructor(
    public uuid: string,
    public school: School,
    public syllabus_url: string,
    public name: string,
  ) {}
}
