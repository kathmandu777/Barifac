import { authClient } from 'infras/RestClient';
import { DepartmentFactory, DepartmentObject, School } from 'domains';

interface DepartmentCreateRequest {
  school: School;
  syllabus_url: string;
  name: string;
}

export class DepartmentRepository {
  static async gets(schoolUuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<DepartmentObject>(
      `/api/v1/departments?school_uuid=${schoolUuid}`,
    );
    return DepartmentFactory.createFromResponseObject(res.data);
  }
  public static async create({
    school,
    syllabus_url,
    name,
  }: DepartmentCreateRequest) {
    const params = {
      school,
      syllabus_url,
      name,
    };
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.post<
      DepartmentCreateRequest,
      DepartmentObject
    >(`/api/v1/departments`, params);
    return res.data;
  }
}
