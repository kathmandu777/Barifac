export type Grade = 0 | 1 | 3 | 4 | 5;

export class User {
  constructor(
    public id: number,
    public uid: string,
    public name: string,
    public email: string,
    public school: string,
    public department: string,
    public grade: Grade,
  ) {}
}
