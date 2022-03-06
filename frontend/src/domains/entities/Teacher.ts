import { School } from '..';

export class Teacher {
  constructor(
    public uuid: string,
    public name: string,
    public school: School,
  ) {}
}
