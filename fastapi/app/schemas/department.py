from uuid import UUID

from pydantic import BaseModel

from .school import ReadSchoolSchema


class BaseDepartmentSchema(BaseModel):
    name: str

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True


class ReadDepartmentSchema(BaseDepartmentSchema):
    uuid: UUID
    school: ReadSchoolSchema


class CreateDepartmentSchema(BaseDepartmentSchema):
    school_uuid: UUID


class UpdateDepartmentSchema(BaseDepartmentSchema):
    school_uuid: UUID
