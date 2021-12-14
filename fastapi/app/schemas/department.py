from typing import Optional
from uuid import UUID

from app.models import Department
from pydantic import BaseModel, Field

from .school import ReadSchoolSchema


class BaseDepartmentSchema(BaseModel):
    name: str = Field(..., max_length=Department.MAX_LENGTH_NAME)
    syllabus_url: Optional[str] = Field(
        None, max_length=Department.MAX_LENGTH_SYLLABUS_URL
    )

    class Config:
        orm_mode = True


class ReadDepartmentSchema(BaseDepartmentSchema):
    uuid: UUID
    school: ReadSchoolSchema


class CreateDepartmentSchema(BaseDepartmentSchema):
    school_uuid: UUID


class UpdateDepartmentSchema(BaseDepartmentSchema):
    school_uuid: UUID
