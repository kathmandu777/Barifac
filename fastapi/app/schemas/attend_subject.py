from uuid import UUID

from pydantic import BaseModel

from .subject import ReadSubjectSchema
from .user import ReadUserSchema


class BaseAttendSubjectSchema(BaseModel):
    target_value: str
    target_score: int

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
