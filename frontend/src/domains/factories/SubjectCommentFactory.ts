import {
  ReductionUserFactory,
  ReductionUserResponse,
  SubjectFactory,
  SubjectResponse,
} from '..';
import { SubjectComment } from '../entities/SubjetComment';

export interface SubjectCommentResponse {
  uuid: string;
  subject: SubjectResponse;
  user: ReductionUserResponse;
  comment: string;
}

export class SubjectCommentFactory {
  public static createFromResponse(res: SubjectCommentResponse) {
    return new SubjectComment(
      res.uuid,
      SubjectFactory.createFromResponse(res.subject),
      ReductionUserFactory.createFromResponse(res.user),
      res.comment,
    );
  }
}
