import { Term } from ".";

export class Subject {
  constructor(
    public uuid: string,
    public term: Term,
    public name: string,
    public teacher: string,
    public credits: number,
  ) {}
}
