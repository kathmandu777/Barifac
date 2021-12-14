from uuid import UUID

from app.models import Subject
from pydantic import BaseModel, Field

from .school import ReadSchoolSchema
from .teacher import ReadTeacherSchema
from .term import ReadTermSchema


class BaseSubjectSchema(BaseModel):
    name: str = Field(..., max_length=Subject.MAX_LENGTH_NAME)
    credits: float

    class Config:
        orm_mode = True


class ReadSubjectSchema(BaseSubjectSchema):
    uuid: UUID
    term: ReadTermSchema
    teacher: ReadTeacherSchema
    school: ReadSchoolSchema


class CreateSubjectSchema(BaseSubjectSchema):
    term_uuid: UUID
    teacher_uuid: UUID
    school_uuid: UUID


class UpdateSubjectSchema(BaseSubjectSchema):
    term_uuid: UUID
    teacher_uuid: UUID
    school_uuid: UUID
