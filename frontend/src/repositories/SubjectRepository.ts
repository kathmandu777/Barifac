import { authClient } from 'infras/RestClient';
import { SubjectFactory, SubjectResponse, Term } from 'domains';

interface CreateSubjectRequestParams {
  term: Term;
  name: string;
  teacher: string;
  credits: number;
}

export class SubjectRepository {
  static async gets(
    school: string,
    department: string,
    term: string,
    category: string,
    grade: number,
  ) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    if (category === '一般') {
      const res = await authClientObject.get<SubjectResponse[]>(
        `/api/v1/subjects/?school_uuid=${school}&term_uuid=${term}&category=${category}&target_grade=${grade}`,
      );
      return res.data.map(SubjectFactory.createFromResponse);
    } else if (category === '専門') {
      const res = await authClientObject.get<SubjectResponse[]>(
        `/api/v1/subjects/?school_uuid=${school}&department_uuid=${department}&term_uuid=${term}&category=${category}&target_grade=${grade}`,
      );
      return res.data.map(SubjectFactory.createFromResponse);
    }
  }
  static async get(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<SubjectResponse>(
      `/api/v1/subjects/${uuid}`,
    );
    return SubjectFactory.createFromResponse(res.data);
  }
  public static async create({
    term,
    name,
    teacher,
    credits,
  }: CreateSubjectRequestParams) {
    const params = {
      term,
      name,
      teacher,
      credits,
    };
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.post<
      CreateSubjectRequestParams,
      SubjectResponse
    >(`/api/v1/subjects`, params);
    return SubjectFactory.createFromResponse(res.data);
  }
}
