import { authClient } from 'infras/RestClient';
import { DepartmentFactory, DepartmentResponse, School } from 'domains';

interface CreateDepartmentRequest {
  school: School;
  syllabus_url: string;
  name: string;
}

export class DepartmentRepository {
  static async gets(schoolUuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<DepartmentResponse[]>(
      `/api/v1/departments?school_uuid=${schoolUuid}`,
    );
    return res.data.map(department =>
      DepartmentFactory.createFromResponse(department),
    );
  }

  static async get(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<DepartmentResponse>(
      `/api/v1/departments/${uuid}}`,
    );
    return DepartmentFactory.createFromResponse(res.data);
  }

  public static async create({
    school,
    syllabus_url,
    name,
  }: CreateDepartmentRequest) {
    const params = {
      school,
      syllabus_url,
      name,
    };
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.post<
      CreateDepartmentRequest,
      DepartmentResponse
    >(`/api/v1/departments`, params);
    return res.data;
  }
}
