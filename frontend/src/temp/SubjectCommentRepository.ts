import { authClient } from 'infras/RestClient';

export interface SubjectComment {
  comment: string;
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
  user: {
    username: string;
    grade: number;
    uuid: string;
  };
}

export interface CreateSubjectCommentRequest {
  comment: string;
  subject_uuid: string;
}

export interface UpdateSubjectCommentRequest {
  comment: string;
  subject_uuid: string;
}

export class SubjectCommentRepository {
  static async getsBySubject(subjectUuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<SubjectComment[]>(
      `/api/v1/subjects_comments?subject_uuid=${subjectUuid}`,
    );
    return res.data;
  }
  static async create(data: CreateSubjectCommentRequest) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.post<
      CreateSubjectCommentRequest,
      SubjectComment
    >(`/api/v1/subjects_comments`, data);
    return res.data;
  }
}
