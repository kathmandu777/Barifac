import { authClient } from 'infras/RestClient';

export interface TeacherComment {
  comment: string;
  uuid: string;
  teacher: {
    name: string;
    uuid: string;
    school: {
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

export interface CreateTeacherCommentRequest {
  comment: string;
  teacher_uuid: string;
}

export interface UpdateTeacherCommentRequest {
  comment: string;
  teacher_uuid: string;
}

export class TeacherCommentRepository {
  static async getsByTeacher(teacherUuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<TeacherComment[]>(
      `/api/v1/teacher_comment?teacher_uuid=${teacherUuid}`,
    );
    return res.data;
  }
  static async create(data: CreateTeacherCommentRequest) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.post<
      CreateTeacherCommentRequest,
      TeacherComment
    >(`/api/v1/teacher_comment`, data);
    return res.data;
  }
}
