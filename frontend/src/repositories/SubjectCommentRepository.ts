import { authClient } from 'infras/RestClient';
import { SubjectCommentResponse, SubjectCommentFactory } from 'domains';

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
    const res = await authClientObject.get<SubjectCommentResponse[]>(
      `/api/v1/subjects_comments?subject_uuid=${subjectUuid}`,
    );
    return res.data.map(SubjectCommentFactory.createFromResponse);
  }
  static async create(data: CreateSubjectCommentRequest) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.post<
      CreateSubjectCommentRequest,
      SubjectCommentResponse
    >(`/api/v1/subjects_comments`, data);
    return SubjectCommentFactory.createFromResponse(res.data);
  }

  static async delete(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.delete(
      `/api/v1/subjects_comments/${uuid}`,
    );
    return SubjectCommentFactory.createFromResponse(res.data);
  }
}
