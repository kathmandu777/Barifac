from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field

from .teacher import ReadTeacherSchema
from .user import ReadUserSchema


class BaseTeacherCommentSchema(BaseModel):
    comment: Optional[str] = Field(None, max_length=2000)

    class Config:
        orm_mode = True


class ReadTeacherCommentSchema(BaseTeacherCommentSchema):
    uuid: UUID
    teacher: ReadTeacherSchema
    user: ReadUserSchema


class CreateTeacherCommentSchema(BaseTeacherCommentSchema):
    teacher_uuid: UUID
    user_uuid: UUID


class UpdateTeacherCommentSchema(BaseTeacherCommentSchema):
    teacher_uuid: UUID
    user_uuid: UUID
