import { authClient } from 'infras/RestClient';
import { SubjectFactory, SubjectObject, Subject, Term } from 'domains';

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

interface SubjectPage {
  items: SubjectInterface[];
}

export class SubjectRepository {
  static async gets(
    school: string,
    department: string,
    term: string,
    category: string,
    grade: number,
    page: number,
  ) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    if (category === '一般') {
      const res = await authClientObject.get<SubjectPage>(
        `/api/v1/subjects/?school_uuid=${school}&term_uuid=${term}&category=${category}&target_grade=${grade}&page=${page}`,
      );
      return res.data.items;
    } else if (category === '専門') {
      const res = await authClientObject.get<SubjectPage>(
        `/api/v1/subjects/?school_uuid=${school}&department_uuid=${department}&term_uuid=${term}&category=${category}&target_grade=${grade}&page=${page}`,
      );
      return res.data.items;
    }
  }
  static async get(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<SubjectObject>(
      `/api/v1/subjects/${uuid}`,
    );
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
