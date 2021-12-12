from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field

from .subject import ReadSubjectSchema
from .user import ReadUserSchema


class BaseSubjectCommentSchema(BaseModel):
    comment: Optional[str] = Field(None, max_length=2000)

    class Config:
        orm_mode = True


class ReadSubjectCommentSchema(BaseSubjectCommentSchema):
    uuid: UUID
    subject: ReadSubjectSchema
    user: ReadUserSchema


class CreateSubjectCommentSchema(BaseSubjectCommentSchema):
    subject_uuid: UUID
    user_uuid: UUID


class UpdateSubjectCommentSchema(BaseSubjectCommentSchema):
    subject_uuid: UUID
    user_uuid: UUID
