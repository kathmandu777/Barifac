from uuid import UUID

from pydantic import BaseModel


class BaseSchoolSchema(BaseModel):
    name: str

    class Config:
        orm_mode = True


class ReadSchoolSchema(BaseSchoolSchema):
    uuid: UUID


class CreateSchoolSchema(BaseSchoolSchema):
    pass


class UpdateSchoolSchema(BaseSchoolSchema):
    pass
