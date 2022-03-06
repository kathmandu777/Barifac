import {
  ReductionUserFactory,
  ReductionUserResponse,
  TeacherFactory,
  TeacherResponse,
} from '..';
import { TeacherComment } from '../entities/TeacherComment';

export interface TeacherCommentResponse {
  uuid: string;
  teacher: TeacherResponse;
  user: ReductionUserResponse;
  comment: string;
}

export class TeacherCommentFactory {
  public static createFromResponseObject(res: TeacherCommentResponse) {
    return new TeacherComment(
      res.uuid,
      TeacherFactory.createFromResponse(res.teacher),
      ReductionUserFactory.createFromResponse(res.user),
      res.comment,
    );
  }
}
