import { authClient } from 'infras/RestClient';
import {
  ReadableAttendSubjectFactory,
  ReadableAttendSubjectResponse,
  AttendSubject,
  AttendSubjectResponse,
  AttendSubjectFactory,
} from 'domains';

export interface CreateOrUpdateAttendSubjectParams {
  target_value: string;
  target_score: number;
  subject_uuid: string;
}

export class AttendSubjectRepository {
  static async gets() {
    const authClientObject = authClient();
    if (!authClientObject) return [];
    const res = await authClientObject.get<AttendSubjectResponse[]>(
      '/api/v1/attend_subject',
    );
    return res.data.map(AttendSubjectFactory.createFromResponse);
  }

  static async get(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<AttendSubjectResponse>(
      `/api/v1/attend_subjects/${uuid}`,
    );
    return AttendSubjectFactory.createFromResponse(res.data);
  }

  static async getsReadable() {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<ReadableAttendSubjectResponse[]>(
      `/api/v1/attend_subjects/readable`,
    );
    return res.data.map(ReadableAttendSubjectFactory.createFromResponse);
  }

  static async getReadable(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<ReadableAttendSubjectResponse>(
      `/api/v1/attend_subjects/${uuid}/readable`,
    );
    return ReadableAttendSubjectFactory.createFromResponse(res.data);
  }

  static async create({
    target_value,
    target_score,
    subject_uuid,
  }: Partial<CreateOrUpdateAttendSubjectParams>) {
    const params = {
      target_value,
      target_score,
      subject_uuid,
    };
    const authClientObject = authClient();
    if (!authClientObject) return;
    try {
      const res = await authClientObject.post<
        Partial<CreateOrUpdateAttendSubjectParams>,
        AttendSubject
      >(`/api/v1/attend_subjects/`, params);
      return res.data;
    } catch {
      return;
    }
  }

  static async update(uuid: string, data: CreateOrUpdateAttendSubjectParams) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.put<
      CreateOrUpdateAttendSubjectParams,
      AttendSubject
    >(`/api/v1/attend_subjects/${uuid}`, data);
    return res.data;
  }

  static async delete(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.delete(`api/v1/attend_subjects/${uuid}`);
    return res.data;
  }
}
