import { EvaluationWithoutSubject, ReductionSubject } from 'domains';
import { EditRequest } from 'domains/entities/EditRequest';
import { ReductionUserResponse } from './UserFactory';

export interface EditRequestResponse {
  comment: string;
  user: ReductionUserResponse;
  subject?: ReductionSubject;
  evaluation?: EvaluationWithoutSubject;
}

export class EditRequestFactory {
  public static createFromResponse(res: EditRequestResponse) {
    return new EditRequest(res.comment, res.user, res.subject, res.evaluation);
  }
}
