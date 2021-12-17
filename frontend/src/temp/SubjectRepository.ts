import { authClient } from 'infras/RestClient';

export interface Subject {
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
  static async get(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<Subject>(`/api/v1/subjects/${uuid}`);
    return res.data;
  }
}
