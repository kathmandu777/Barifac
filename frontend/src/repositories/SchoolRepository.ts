import { authClient } from 'infras/RestClient';
import { SchoolFactory, SchoolObject } from 'domains';

interface SchoolCreateRequest {
  name: string;
}

interface SchoolPage {
  items: SchoolObject[];
}

export class SchoolRepository {
  static async gets(page: number) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<SchoolPage>(
      `/api/v1/schools?page=${page}`,
    );
    return res.data.items.map(school =>
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
