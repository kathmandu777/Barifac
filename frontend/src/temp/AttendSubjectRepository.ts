import { authClient } from 'infras/RestClient';

export interface ReadableAttendSubject {
  uuid: string;
  target_value: string;
  target_score: number;
  subject_uuid: string;
  subject_name: string;
  evaluations: {
    evaluation_uuid: string;
    evaluation_name: string;
    rate: number;
    scores: {
      score_uuid: string;
      got_score: number;
      max_score: number;
      memo: string;
    }[];
  }[];
}
export interface AttendSubject {
  target_value: string;
  target_score: number;
  uuid: string;
  subject: {
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
  };
}

export interface UpdateAttendSubjectRequest {
  subject_uuid: string;
  target_value: string;
  target_score: number;
}

export class AttendSubjectRepository {
  static async getReadable(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<ReadableAttendSubject>(
      `/api/v1/attend_subjects/${uuid}/readable`,
    );
    return res.data;
  }

  static async get(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<ReadableAttendSubject>(
      `/api/v1/attend_subjects/${uuid}/readable`,
    );
    return res.data;
  }
  static async update(uuid: string, data: UpdateAttendSubjectRequest) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.put<
      UpdateAttendSubjectRequest,
      AttendSubject
    >(`/api/v1/attend_subjects/${uuid}`, data);
    return res.data;
  }
}
