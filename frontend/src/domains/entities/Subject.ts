import { School, Term } from '..';

export class Subject {
  constructor(
    public uuid: string,
    public term: Term,
    public name: string,
    public syllabusUrl: string,
    public category: string,
    public type: string,
    public targetGrade: number,
    public teacher: { name: string; uuid: string },
    public credits: number,
    public school: School,
    public department: { uuid: string; name: string; syllabusUrl: string },
  ) {}
}

export class ReductionSubject {
  constructor(public name: string, public uuid: string) {}
}
