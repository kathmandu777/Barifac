import { authClient } from 'infras/RestClient';
import {
  AttendSubject,
  AttendSubjectFactory,
  AttendSubjectObject,
  User,
  Subject,
  TargetScore,
} from 'domains';

interface AttendSubjectUpdateRequest {
  uuid: string;
  user: User;
  subject: Subject;
  targetValue: number;
  targetScore: TargetScore;
}

export class AttendSubjectRepository {
  static async gets() {
    const authClientObject = authClient();
    if (!authClientObject) return [];
    const res = await authClientObject.get<AttendSubjectObject[]>(
      '/api/v1/attend_subject',
    );
    return res.data.map(attendSubject =>
      AttendSubjectFactory.createFromResponseObject(attendSubject),
    );
  }

  static async get(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<AttendSubjectObject>(
      `/api/v1/attend_subjects/${uuid}`,
    );
    return AttendSubjectFactory.createFromResponseObject(res.data);
  }

  public static async update({
    uuid,
    user,
    subject,
    targetValue,
    targetScore,
  }: Partial<AttendSubjectUpdateRequest>) {
    const params = {
      uuid,
      user,
      subject,
      targetValue,
      targetScore,
    };
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.put<
      Partial<AttendSubjectUpdateRequest>,
      AttendSubjectObject
    >('/api/v1/attend_subjects', params);
    return AttendSubjectFactory.createFromResponseObject(res.data);
  }

  public static async delete(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.delete(`api/v1/attend_subjects/${uuid}`);
    return res.data.text;
  }
}
