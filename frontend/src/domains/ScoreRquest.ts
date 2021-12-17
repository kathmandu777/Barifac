// ValueObject

export class ScoreCreateRequest {
  constructor(
    public got_score: number,
    public max_score: number,
    public memo: string,
    public attend_subject_uuid: string,
    public evaluation_uuid: string,
  ) {}
}

export class ScoreUpdateRequest {
  constructor(
    public uuid: string,
    public got_score: number,
    public max_score: number,
    public memo: string,
    public attend_subject_uuid: string,
    public evaluation_uuid: string,
  ) {}
}
