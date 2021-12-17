from typing import Optional
from uuid import UUID

from app.models import EditRequest
from pydantic import BaseModel, Field

from .evaluation import ReadSimpleEvaluationSchema
from .subject import ReadSubjectSchema
from .user import ReadUserForOtherUserSchema


class BaseEditRequestSchema(BaseModel):
    comment: str = Field(..., max_length=EditRequest.MAX_LENGTH_COMMENT)

    class Config:
        orm_mode = True


class ReadEditRequestSchema(BaseEditRequestSchema):
    uuid: UUID
    user: ReadUserForOtherUserSchema
    subject: Optional[ReadSubjectSchema]
    evaluation: Optional[ReadSimpleEvaluationSchema]


class CreateEditRequestSchema(BaseEditRequestSchema):
    subject_uuid: Optional[UUID]
    evaluation_uuid: Optional[UUID]


class UpdateEditRequestSchema(BaseEditRequestSchema):
    subject_uuid: Optional[UUID]
    evaluation_uuid: Optional[UUID]
