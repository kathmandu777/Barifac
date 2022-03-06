import { authClient } from 'infras/RestClient';
import { SubjectFactory, SubjectResponse, Term } from 'domains';

interface SubjectCreateRequest {
  term: Term;
  name: string;
  teacher: string;
  credits: number;
}

export interface SubjectInterface {
  name: string;
  credits: number;
  syllabus_url: string;
  category: string;
  type: string;
  target_grade: number;
  uuid: string;
  term: {
    academic_year: number;
    semester: string;
    uuid: string;
  };
  teacher: {
    name: string;
    uuid: string;
  };
  school: {
    name: string;
    syllabus_url: string;
    uuid: string;
  };
  department: {
    name: string;
    syllabus_url: string;
    uuid: string;
  };
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
      const res = await authClientObject.get<SubjectInterface[]>(
        `/api/v1/subjects/?school_uuid=${school}&term_uuid=${term}&category=${category}&target_grade=${grade}`,
      );
      return res.data;
    } else if (category === '専門') {
      const res = await authClientObject.get<SubjectInterface[]>(
        `/api/v1/subjects/?school_uuid=${school}&department_uuid=${department}&term_uuid=${term}&category=${category}&target_grade=${grade}`,
      );
      return res.data;
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
      SubjectResponse
    >(`/api/v1/subjects`, params);
    return SubjectFactory.createFromResponse(res.data);
  }
}
