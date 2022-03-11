import { authClient } from 'infras/RestClient';
import {
  ScoreFactory,
  ScoreResponse,
  ScoreEvalResponseObject,
  ScoreEvalResponseObjectFactory,
  ScoreCreateRequestObject,
  ScoreUpdateRequestObject,
} from 'domains';

export class ScoreRepository {
  static async gets() {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<ScoreResponse[]>('/api/v1/scores');
    return res.data.map(score => ScoreFactory.createFromResponseObject(score));
  }

  static async getsByEvaluation(evalUUID: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<ScoreEvalResponseObject>(
      `/api/v1/scores/evaluations/${evalUUID}`,
    );
    return ScoreEvalResponseObjectFactory.createFromResponseObject(res.data);
  }

  static async get(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.get<ScoreResponse[]>(
      `/api/v1/scores/${uuid}`,
    );
    return res.data.map(score => ScoreFactory.createFromResponseObject(score));
  }

  public static async create({
    attend_subject_uuid,
    evaluation_uuid,
    got_score,
    max_score,
    memo,
  }: ScoreCreateRequestObject) {
    const params = {
      attend_subject_uuid,
      evaluation_uuid,
      got_score,
      max_score,
      memo,
    };
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.post<
      ScoreCreateRequestObject,
      // 要対応
      ScoreResponse
    >(`/api/v1/scores`, params);
    return ScoreFactory.createFromResponseObject(res.data);
  }

  public static async update({
    uuid,
    attend_subject_uuid,
    evaluation_uuid,
    got_score,
    max_score,
    memo,
  }: ScoreUpdateRequestObject) {
    const params = {
      attend_subject_uuid,
      evaluation_uuid,
      got_score,
      max_score,
      memo,
    };
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.put<
      ScoreCreateRequestObject,
      ScoreResponse
    >(`/api/v1/scores/${uuid}`, params);
    return ScoreFactory.createFromResponseObject(res.data);
  }

  public static async delete(uuid: string) {
    const authClientObject = authClient();
    if (!authClientObject) return;
    const res = await authClientObject.delete(`api/v1/scores/${uuid}`);
    return res.data;
  }
}
