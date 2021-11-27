import { Comment, SubjectObject, UserObject } from '.';

export interface CommentObject {
  uuid: string;
  subject: SubjectObject;
  user: UserObject;
  comment: string;
}

export class CommentFactory {
  public static createFromResponseObject(obj: CommentObject) {
    return new Comment(
      obj.uuid,
      obj.subject,
      obj.user,
      obj.comment,
    );
  }
}
