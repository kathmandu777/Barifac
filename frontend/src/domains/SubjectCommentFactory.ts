import { SubjectFactory, SubjectObject, UserFactory, UserObject } from '.';
import { SubjectComment } from './SubjetComment';

export interface SubjectCommentObject {
  uuid: string;
  subject: SubjectObject;
  user: UserObject;
  comment: string;
}

export class SubjectCommentFactory {
  public static createFromResponseObject(obj: SubjectCommentObject) {
    return new SubjectComment(
      obj.uuid,
      SubjectFactory.createFromResponseObject(obj.subject),
      UserFactory.createFromResponseObject(obj.user),
      obj.comment,
    );
  }
}
