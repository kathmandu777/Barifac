import { authClient } from 'infras/RestClient';
import { SchoolFactory, SchoolResponse } from 'domains';

interface SchoolCreateRequest {
  name: string;
}

export class SchoolRepository {
  static async gets() {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<SchoolResponse[]>(`/api/v1/schools`);
    return res.data.map(school => SchoolFactory.createFromResponse(school));
  }
  static async get(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<SchoolResponse>(
      `/api/v1/schools/${uuid}`,
    );
    return SchoolFactory.createFromResponse(res.data);
  }
  public static async create({ name }: SchoolCreateRequest) {
    const params = {
      name,
    };
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.post<
      SchoolCreateRequest,
      SchoolResponse
    >(`/api/v1/schools`, params);
    return SchoolFactory.createFromResponse(res.data);
  }
}
