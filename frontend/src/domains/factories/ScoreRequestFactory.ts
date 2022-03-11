// ValueObject

import { ScoreCreateRequest, ScoreUpdateRequest } from 'domains';

export interface ScoreCreateRequestObject {
  got_score: number;
  max_score: number;
  memo: string;
  attend_subject_uuid: string;
  evaluation_uuid: string;
}

export interface ScoreUpdateRequestObject {
  uuid: string;
  got_score: number;
  max_score: number;
  memo: string;
  attend_subject_uuid: string;
  evaluation_uuid: string;
}

export class ScoreCreateRequestFactory {
  public static createFromResponseObject(obj: ScoreCreateRequestObject) {
    return new ScoreCreateRequest(
      obj.got_score,
      obj.max_score,
      obj.memo,
      obj.attend_subject_uuid,
      obj.evaluation_uuid,
    );
  }

  public static createEmpty() {
    return new ScoreCreateRequest(0, 0, '', '', '');
  }
}

export class ScoreUpdateRequestFactory {
  public static createFromResponseObject(obj: ScoreUpdateRequestObject) {
    return new ScoreUpdateRequest(
      obj.uuid,
      obj.got_score,
      obj.max_score,
      obj.memo,
      obj.attend_subject_uuid,
      obj.evaluation_uuid,
    );
  }
}
