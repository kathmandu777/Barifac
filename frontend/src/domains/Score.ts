import { AttendSubject,  Evaluation} from ".";

export class Score {
  constructor(
    public uuid: string,
    public attendSubject: AttendSubject,
    public evaluation: Evaluation,
    public gotScore: number,
    public maxScore: number,
    public memo: string,
  ) {}
}
