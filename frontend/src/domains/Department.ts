import { School } from ".";

export class Department {
  constructor(
    public uuid: string,
    public school: School,
    public name: string,
  ) {}
}
