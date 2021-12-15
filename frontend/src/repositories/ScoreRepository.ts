import { authClient } from 'infras/RestClient';
import { ScoreFactory, ScoreObject, AttendSubject, Evaluation } from 'domains';

interface ScoreCreateRequest {
  attendSubject: AttendSubject;
  evaluation: Evaluation;
  gotScore: number;
  maxScore: number;
  memo: string;
}

interface ScoreUpdateRequest {
  uuid: string;
  attendSubject: AttendSubject;
  evaluation: Evaluation;
  gotScore: number;
  maxScore: number;
  memo: string;
}

export class ScoreRepository {
  static async gets() {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<ScoreObject[]>('/api/v1/scores');
    return res.data.map(score => ScoreFactory.createFromResponseObject(score));
  }

  static async get(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<ScoreObject[]>(
      `/api/v1/scores/${uuid}`,
    );
    return res.data.map(score => ScoreFactory.createFromResponseObject(score));
  }

  public static async create({
    attendSubject,
    evaluation,
    gotScore,
    maxScore,
    memo,
  }: ScoreCreateRequest) {
    const params = {
      attendSubject,
      evaluation,
      gotScore,
      maxScore,
      memo,
    };
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.post<ScoreCreateRequest, ScoreObject>(
      `/api/v1/scores`,
      params,
    );
    return ScoreFactory.createFromResponseObject(res.data);
  }

  public static async update({
    uuid,
    attendSubject,
    evaluation,
    gotScore,
    maxScore,
    memo,
  }: ScoreUpdateRequest) {
    const params = {
      uuid,
      attendSubject,
      evaluation,
      gotScore,
      maxScore,
      memo,
    };
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.put<ScoreUpdateRequest, ScoreObject>(
      '/api/v1/score',
      params,
    );
    return ScoreFactory.createFromResponseObject(res.data);
  }

  public static async delete(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.delete(`api/v1/evaluations/${uuid}`);
    return res.data.text;
  }
}
