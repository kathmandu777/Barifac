import { TeacherFactory, TeacherResponse, UserFactory, UserResponse } from '..';
import { TeacherComment } from '../entities/TeacherComment';

export interface TeacherCommentResponse {
  uuid: string;
  teacher: TeacherResponse;
  user: UserResponse;
  comment: string;
}

export class TeacherCommentFactory {
  public static createFromResponseObject(res: TeacherCommentResponse) {
    return new TeacherComment(
      res.uuid,
      TeacherFactory.createFromResponse(res.teacher),
      UserFactory.createFromResponse(res.user),
      res.comment,
    );
  }
}
