from uuid import UUID

from app.models import AttendSubject
from pydantic import BaseModel, Field

from .subject import ReadSimpleSubjectSchema, ReadSubjectSchema


class BaseAttendSubjectSchema(BaseModel):
    target_value: str = Field(..., max_length=AttendSubject.MAX_LENGTH_TARGET_NAME)
    target_score: int = Field(..., ge=0, le=100)

    class Config:
        orm_mode = True


class ReadAttendSubjectSchema(BaseAttendSubjectSchema):
    uuid: UUID
    subject: ReadSubjectSchema


class CreateAttendSubjectSchemaForSeed(BaseAttendSubjectSchema):
    subject_uuid: UUID
    user_uuid: UUID


class CreateAttendSubjectSchema(BaseAttendSubjectSchema):
    subject_uuid: UUID


class UpdateAttendSubjectSchema(BaseAttendSubjectSchema):
    subject_uuid: UUID


class ReadAttendSubjectWithEvaluationsScoresSchema(BaseAttendSubjectSchema):
    uuid: UUID
    subject: ReadSimpleSubjectSchema
