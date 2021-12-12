from uuid import UUID

from pydantic import BaseModel

from .school import ReadSchoolSchema


class BaseTeacherSchema(BaseModel):
    name: str

    class Config:
        orm_mode = True


class CreateTeacherSchema(BaseTeacherSchema):
    school_uuid: UUID


class UpdateTeacherSchema(BaseTeacherSchema):
    school_uuid: UUID


class ReadTeacherSchema(BaseTeacherSchema):
    uuid: UUID
    school: ReadSchoolSchema
