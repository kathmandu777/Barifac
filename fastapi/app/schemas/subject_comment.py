from uuid import UUID

from app.models import SubjectComment
from pydantic import BaseModel, Field

from .subject import ReadSubjectSchema
from .user import ReadSimpleUserSchema


class BaseSubjectCommentSchema(BaseModel):
    comment: str = Field(..., max_length=SubjectComment.MAX_LENGTH_COMMENT)

    class Config:
        orm_mode = True


class ReadSubjectCommentSchema(BaseSubjectCommentSchema):
    uuid: UUID
    subject: ReadSubjectSchema
    user: ReadSimpleUserSchema


class CreateSubjectCommentSchema(BaseSubjectCommentSchema):
    subject_uuid: UUID


class CreateSubjectCommentForSeedSchema(BaseSubjectCommentSchema):
    subject_uuid: UUID
    user_uuid: UUID


class UpdateSubjectCommentSchema(BaseSubjectCommentSchema):
    subject_uuid: UUID
