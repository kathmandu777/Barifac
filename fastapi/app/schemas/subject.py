from uuid import UUID

from pydantic import BaseModel

from .school import ReadSchoolSchema
from .teacher import ReadTeacherSchema
from .term import ReadTermSchema


class BaseSubjectSchema(BaseModel):
    name: str
    credits: int

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
