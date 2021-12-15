import { Term } from '.';

export interface TermObject {
  uuid: string;
  academic_year: number;
  semester: string;
}

export class TermFactory {
  public static createFromResponseObject(obj: TermObject) {
    return new Term(obj.uuid, obj.academic_year, obj.semester);
  }
}
