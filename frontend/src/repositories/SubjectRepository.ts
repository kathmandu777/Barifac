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
    grade: number,
    page: number,
  ) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const department2 = '471bfab6-e473-491b-b55e-08f461079b29';
    const department3 = 'bc7f927c-215b-46fe-b777-4f53c3d13c8b';
    const res = await authClientObject.get<SubjectPage>(
      //`/api/v1/subjects/?school_uuid=${school}&department_uuid=${department}&term_uuid${term}&target_grade=${grade}`,
      `/api/v1/subjects/?school_uuid=${school}&term_uuid${term}&target_grade=${grade}&page=${page}`,
    );
    return res.data.items;
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
