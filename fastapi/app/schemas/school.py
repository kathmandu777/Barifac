from typing import Optional
from uuid import UUID

from app.models import School
from pydantic import BaseModel, Field


class BaseSchoolSchema(BaseModel):
    name: str = Field(..., max_length=School.MAX_LENGTH_NAME)
    syllabus_url: Optional[str] = Field(None, max_length=School.MAX_LENGTH_SYLLABUS_URL)

    class Config:
        orm_mode = True


class ReadSchoolSchema(BaseSchoolSchema):
    uuid: UUID


class CreateSchoolSchema(BaseSchoolSchema):
    pass


class UpdateSchoolSchema(BaseSchoolSchema):
    pass
