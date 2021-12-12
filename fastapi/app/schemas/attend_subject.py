from uuid import UUID

from app.models import AttendSubject
from pydantic import BaseModel, Field

from .subject import ReadSubjectSchema
from .user import ReadUserSchema


class BaseAttendSubjectSchema(BaseModel):
    target_value: str = Field(..., max_length=AttendSubject.MAX_LENGTH_TARGET_NAME)
    target_score: int = Field(..., ge=0, le=100)

    class Config:
        orm_mode = True


class ReadAttendSubjectSchema(BaseAttendSubjectSchema):
    uuid: UUID
    subject: ReadSubjectSchema
    user: ReadUserSchema


class CreateAttendSubjectSchema(BaseAttendSubjectSchema):
    subject_uuid: UUID
    user_uuid: UUID


class UpdateAttendSubjectSchema(BaseAttendSubjectSchema):
    subject_uuid: UUID
    user_uuid: UUID
