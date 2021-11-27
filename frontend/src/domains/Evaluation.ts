import { Subject } from ".";

export class Evaluation {
  constructor(
    public uuid: string,
    public subject: Subject,
    public name: string,
    public rate: number,
    public type: string,
  ) {}
}
