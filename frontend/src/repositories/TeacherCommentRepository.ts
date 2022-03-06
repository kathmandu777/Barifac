import { authClient } from 'infras/RestClient';
import { TeacherCommentResponse, TeacherCommentFactory } from 'domains';

export interface CreateTeacherCommentRequestParams {
  comment: string;
  teacher_uuid: string;
}

export interface UpdateTeacherCommentRequestParams {
  comment: string;
  teacher_uuid: string;
}

export class TeacherCommentRepository {
  static async getsByTeacher(teacherUuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<TeacherCommentResponse[]>(
      `/api/v1/teacher_comment?teacher_uuid=${teacherUuid}`,
    );
    return res.data.map(TeacherCommentFactory.createFromResponseObject);
  }
  static async create(data: CreateTeacherCommentRequestParams) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.post<
      CreateTeacherCommentRequestParams,
      TeacherCommentResponse
    >(`/api/v1/teacher_comment`, data);
    return TeacherCommentFactory.createFromResponseObject(res.data);
  }

  static async delete(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.delete(
      `/api/v1/teacher_comment/${uuid}`,
    );
    return TeacherCommentFactory.createFromResponseObject(res.data);
  }
}
