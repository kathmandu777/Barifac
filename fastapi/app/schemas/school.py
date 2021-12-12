from uuid import UUID

from app.models import School
from pydantic import BaseModel, Field


class BaseSchoolSchema(BaseModel):
    name: str = Field(..., max_length=School.MAX_LENGTH_NAME)

    class Config:
        orm_mode = True


class ReadSchoolSchema(BaseSchoolSchema):
    uuid: UUID


class CreateSchoolSchema(BaseSchoolSchema):
    pass


class UpdateSchoolSchema(BaseSchoolSchema):
    pass
