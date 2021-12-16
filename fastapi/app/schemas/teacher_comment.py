from uuid import UUID

from app.models import TeacherComment
from pydantic import BaseModel, Field

from .teacher import ReadTeacherSchema
from .user import ReadSimpleUserSchema


class BaseTeacherCommentSchema(BaseModel):
    comment: str = Field(..., max_length=TeacherComment.MAX_LENGTH_COMMENT)

    class Config:
        orm_mode = True


class ReadTeacherCommentSchema(BaseTeacherCommentSchema):
    uuid: UUID
    teacher: ReadTeacherSchema
    user: ReadSimpleUserSchema


class CreateTeacherCommentSchema(BaseTeacherCommentSchema):
    teacher_uuid: UUID


class UpdateTeacherCommentSchema(BaseTeacherCommentSchema):
    teacher_uuid: UUID
