import { SubjectFactory, SubjectResponse, UserFactory, UserResponse } from '..';
import { SubjectComment } from '../entities/SubjetComment';

export interface SubjectCommentResponse {
  uuid: string;
  subject: SubjectResponse;
  user: UserResponse;
  comment: string;
}

export class SubjectCommentFactory {
  public static createFromResponse(res: SubjectCommentResponse) {
    return new SubjectComment(
      res.uuid,
      SubjectFactory.createFromResponse(res.subject),
      UserFactory.createFromResponse(res.user),
      res.comment,
    );
  }
}
