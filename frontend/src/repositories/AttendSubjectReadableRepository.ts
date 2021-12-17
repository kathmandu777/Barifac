import { authClient } from 'infras/RestClient';

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

export class AttendSubjectReadableRepository {
  static async gets() {
    const authClientObject = authClient();
    if (!authClientObject) return [] as AttendSubjectReadableInterface[];
    const res = await authClientObject.get<AttendSubjectReadableInterface[]>(
      `/api/v1/attend_subjects/readable`,
    );
    return res.data;
  }
}
