import { authClient } from 'infras/RestClient';
import { TermFactory, TermObject } from 'domains';

interface TermCreateRequest {
  academicYear: number;
  semester: string;
}

export interface TermInterface {
  academic_year: number;
  semester: string;
  uuid: string;
}

interface TermPage {
  items: TermObject[];
}

export class TermRepository {
  static async gets(year: number, semester: string, page: number) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<TermPage>(
      `/api/v1/terms/?academic_year=${year}&semester=${semester}&page=${page}`,
    );
    //return res.data.map(term => TermFactory.createFromResponseObject(term));
    return res.data.items;
  }
  static async get(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<TermObject>(`/api/v1/terms/${uuid}`);
    return TermFactory.createFromResponseObject(res.data);
  }
  public static async create({ academicYear, semester }: TermCreateRequest) {
    const params = {
      academicYear,
      semester,
    };
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.post<TermCreateRequest, TermObject>(
      `/api/v1/terms`,
      params,
    );
    return TermFactory.createFromResponseObject(res.data);
  }
}
