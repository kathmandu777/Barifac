import { authClient } from 'infras/RestClient';
import { Grade } from './UserRepository';

export interface Evaluations {
  evaluations: {
    evaluation_uuid: string;
    evaluation_name: string;
    rate: number;
    scores: {
      score_uuid: string;
      got_score: number;
      max_score: number;
      memo: string;
    }[];
  }[];
}

export interface AttendSubjectReadableInterface {
  uuid: string;
  target_value: string;
  target_score: number;
  subject_uuid: string;
  subject_name: string;
  evaluations: Evaluations;
}

interface AttendSubjectCreateRequest {
  target_value: string;
  target_score: number;
  subject_uuid: string;
}

export class AttendSubjectReadableRepository {
  static async gets() {
    const authClientObject = authClient();
    if (!authClientObject) return [] as AttendSubjectReadableInterface[];
    const res = await authClientObject.get<AttendSubjectReadableInterface[]>(
      `/api/v1/attend_subjects/readable`,
    );
    return res.data;
  }

  static async create({
    target_value,
    target_score,
    subject_uuid,
  }: Partial<AttendSubjectCreateRequest>) {
    const params = {
      target_value,
      target_score,
      subject_uuid,
    };
    const authClientObject = authClient();
    if (!authClientObject) return;
    try {
      const res = await authClientObject.post<
        Partial<AttendSubjectCreateRequest>,
        AttendSubjectReadableInterface
      >(`/api/v1/attend_subjects/`, params);
      return res.data;
    } catch {
      return;
    }
  }

  static async delete(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.delete(`api/v1/attend_subjects/${uuid}`);
    return res.data;
  }
}
