import { SubjectObject, UserObject } from '.';
import { SubjectComment } from './SubjetComment';

export interface SubjectCommentObject {
  uuid: string;
  subject: SubjectObject;
  user: UserObject;
  comment: string;
}

export class SubjectCommentFactory {
  public static createFromResponseObject(obj: SubjectCommentObject) {
    return new SubjectComment(obj.uuid, obj.subject, obj.user, obj.comment);
  }
}
