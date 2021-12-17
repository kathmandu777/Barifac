import { authClient } from 'infras/RestClient';

export interface EditRequest {
  comment: string;
  uuid: string;
  user: {
    username: string;
    email: string;
    grade: 5;
    uid: string;
    uuid: string;
  };
  subject?: {
    name: string;
    uuid: string;
  };
  evaluation?: {
    name: string;
    rate: number;
    type: string;
    uuid: string;
  };
}

export interface CreateEditRequestRequest {
  comment: string;
  subject_uuid?: string;
  evaluation_uuid?: string;
}

export class EditRequestRepository {
  static async getsBySubject(subjectUuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<EditRequest[]>(
      `/api/v1/edit_requests?subject_uuid=${subjectUuid}`,
    );
    return res.data;
  }
  static async create(data: CreateEditRequestRequest) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.post<
      CreateEditRequestRequest,
      EditRequest
    >(`/api/v1/edit_requests/`, data);
    return res.data;
  }
  static async getsByEvaluation(evaluationUuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<EditRequest[]>(
      `/api/v1/edit_requests?evaluation_uuid=${evaluationUuid}`,
    );
    return res.data;
  }
}
