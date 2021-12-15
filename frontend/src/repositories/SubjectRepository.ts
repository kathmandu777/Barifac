import { authClient } from 'infras/RestClient';
import { SubjectFactory, SubjectObject, Subject, Term } from 'domains';

interface SubjectCreateRequest {
  term: Term;
  name: string;
  teacher: string;
  credits: number;
}

export class SubjectRepository {
  static async gets() {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<Subject[]>(`/api/v1/subjects`);
    return res.data.map(subject =>
      SubjectFactory.createFromResponseObject(subject),
    );
  }
  static async get(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<Subject>(`/api/v1/subjects/${uuid}`);
    return SubjectFactory.createFromResponseObject(res.data);
  }
  public static async create({
    term,
    name,
    teacher,
    credits,
  }: SubjectCreateRequest) {
    const params = {
      term,
      name,
      teacher,
      credits,
    };
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.post<
      SubjectCreateRequest,
      SubjectObject
    >(`/api/v1/subjects`, params);
    return SubjectFactory.createFromResponseObject(res.data);
  }
}
