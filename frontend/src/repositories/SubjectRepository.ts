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

export class SubjectRepository {
  static async gets(
    school: string,
    department: string,
    term: string,
    grade: number,
  ) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<SubjectInterface[]>(
      `/api/v1/subjects/?school_uuid=${school}&department_uuid=${department}&term_uuid${term}&target_grade=${grade}`,
    );
    return res.data;
  }
  static async get(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return; // undefined の検証(呼び出し側)
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
