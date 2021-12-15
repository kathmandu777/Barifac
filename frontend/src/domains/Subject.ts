import { Teacher, Term } from '.';

export class Subject {
  constructor(
    public uuid: string,
    public term: Term,
    public name: string,
    public teacher: Teacher,
    public credits: number,
  ) {}
}
