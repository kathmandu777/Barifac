import { Term } from '.';

export interface TermObject {
  uuid: string;
  academicYear: number;
  semester: string;
}

export class  TermFactory {
  public static createFromResponseObject(obj: TermObject) {
    return new  Term(
      obj.uuid,
      obj.academicYear,
      obj.semester,
    );
  }
}
