import { TeacherFactory, TeacherObject, UserFactory, UserObject } from '.';
import { TeacherComment } from './TeacherComment';

export interface TeacherCommentObject {
  uuid: string;
  teacher: TeacherObject;
  user: UserObject;
  comment: string;
}

export class TeacherCommentFactory {
  public static createFromResponseObject(obj: TeacherCommentObject) {
    return new TeacherComment(
      obj.uuid,
      TeacherFactory.createFromResponseObject(obj.teacher),
      UserFactory.createFromResponseObject(obj.user),
      obj.comment,
    );
  }
}
