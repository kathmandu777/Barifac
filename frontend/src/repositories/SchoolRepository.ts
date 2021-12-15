import { authClient } from 'infras/RestClient';
import { SchoolFactory, SchoolObject } from 'domains';

interface SchoolCreateRequest {
  name: string;
}

export class SchoolRepository {
  static async gets() {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<SchoolObject[]>(`/api/v1/schools`);
    return res.data.map(school =>
      SchoolFactory.createFromResponseObject(school),
    );
  }
  static async get(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<SchoolObject>(
      `/api/v1/schools/${uuid}`,
    );
    return SchoolFactory.createFromResponseObject(res.data);
  }
  public static async create({ name }: SchoolCreateRequest) {
    const params = {
      name,
    };
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.post<SchoolCreateRequest, SchoolObject>(
      `/api/v1/schools`,
      params,
    );
    return SchoolFactory.createFromResponseObject(res.data);
  }
}
