from uuid import UUID

from app.models import Teacher
from pydantic import BaseModel, Field

from .school import ReadSchoolSchema


class BaseTeacherSchema(BaseModel):
    name: str = Field(..., max_length=Teacher.MAX_NAME_LENGTH)

    class Config:
        orm_mode = True


class CreateTeacherSchema(BaseTeacherSchema):
    school_uuid: UUID


class UpdateTeacherSchema(BaseTeacherSchema):
    school_uuid: UUID


class ReadTeacherSchema(BaseTeacherSchema):
    uuid: UUID
    school: ReadSchoolSchema
