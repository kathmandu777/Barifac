import {
  ReductionUser,
  ReductionSubject,
  EvaluationWithoutSubject,
} from 'domains';

export class EditRequest {
  constructor(
    public comment: string,
    public user: ReductionUser,
    public subject?: ReductionSubject,
    public evaluation?: EvaluationWithoutSubject,
  ) {}
}
