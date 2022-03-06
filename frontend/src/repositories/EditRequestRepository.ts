import {
  EditRequestFactory,
  EditRequestResponse,
} from 'domains/factories/EditRequestFactory';
import { authClient } from 'infras/RestClient';

export interface CreateEditRequestRequest {
  comment: string;
  subject_uuid?: string;
  evaluation_uuid?: string;
}

export class EditRequestRepository {
  static async getsBySubject(subjectUuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<EditRequestResponse[]>(
      `/api/v1/edit_requests?subject_uuid=${subjectUuid}`,
    );
    return res.data.map(EditRequestFactory.createFromResponse);
  }
  static async create(data: CreateEditRequestRequest) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.post<
      CreateEditRequestRequest,
      EditRequestResponse
    >(`/api/v1/edit_requests/`, data);
    return EditRequestFactory.createFromResponse(res.data);
  }
  static async getsByEvaluation(evaluationUuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<EditRequestResponse[]>(
      `/api/v1/edit_requests?evaluation_uuid=${evaluationUuid}`,
    );
    return res.data.map(EditRequestFactory.createFromResponse);
  }

  static async delete(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.delete(`/api/v1/edit_requests/${uuid}`);
    return EditRequestFactory.createFromResponse(res.data);
  }
}
