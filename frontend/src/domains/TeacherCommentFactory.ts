import { TeacherObject, UserObject } from '.';
import { TeacherComment } from './TeacherComment';

export interface TeacherCommentObject {
  uuid: string;
  teacher: TeacherObject;
  user: UserObject;
  comment: string;
}

export class TeacherCommentFactory {
  public static createFromResponseObject(obj: TeacherCommentObject) {
    return new TeacherComment(obj.uuid, obj.teacher, obj.user, obj.comment);
  }
}
