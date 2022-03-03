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

interface TeacherCommentPage {
  items: TeacherComment[];
}

export class TeacherCommentRepository {
  static async getsByTeacher(teacherUuid: string, page: number) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<TeacherCommentPage>(
      `/api/v1/teacher_comment?teacher_uuid=${teacherUuid}&page=${page}`,
    );
    return res.data.items;
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

  static async delete(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.delete(
      `/api/v1/teacher_comment/${uuid}`,
    );
    return res.data;
  }
}
