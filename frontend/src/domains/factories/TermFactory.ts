import { Term } from '..';

export interface TermResponse {
  uuid: string;
  academic_year: number;
  semester: string;
}

export class TermFactory {
  public static createFromResponse(res: TermResponse) {
    return new Term(res.uuid, res.academic_year, res.semester);
  }
}
