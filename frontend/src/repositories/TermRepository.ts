import { authClient } from 'infras/RestClient';
import { TermFactory, TermObject } from 'domains';

interface TermCreateRequest {
  academicYear: number;
  semester: string;
}

export class TermRepository {
  static async gets() {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<TermObject[]>(`/api/v1/terms`);
    return res.data.map(term => TermFactory.createFromResponseObject(term));
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
