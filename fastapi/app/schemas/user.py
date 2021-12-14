from typing import Optional
from uuid import UUID

from app.models import User
from pydantic import BaseModel, Field

from .department import ReadDepartmentSchema
from .school import ReadSchoolSchema


class BaseUserSchema(BaseModel):
    username: str = Field(
        ..., min_length=User.MIN_LENGTH_USERNAME, max_length=User.MAX_LENGTH_USERNAME
    )
    email: str = Field(..., regex=r"[^\s]+@[^\s]+")
    grade: Optional[int] = Field(None, ge=1, le=5)

    class Config:
        orm_mode = True


class CreateUserSchema(BaseUserSchema):
    password: Optional[str] = Field(None, min_length=User.MIN_LENGTH_PASSWORD)


class UpdateUserSchema(BaseUserSchema):
    password: Optional[str] = Field(None, min_length=User.MIN_LENGTH_PASSWORD)
    school_uuid: UUID
    department_uuid: UUID


class ReadUserSchema(BaseUserSchema):
    uuid: UUID
    school: Optional[ReadSchoolSchema]
    department: Optional[ReadDepartmentSchema]
