from typing import Optional
from uuid import UUID

from app.models import User
from pydantic import BaseModel, Field


class BaseUserSchema(BaseModel):
    username: str = Field(
        ..., min_length=User.MIN_LENGTH_USERNAME, max_length=User.MAX_LENGTH_USERNAME
    )
    email: str = Field(..., regex=r"[^\s]+@[^\s]+")
    grade: Optional[int] = Field(None, ge=1, le=5)

    class Config:
        orm_mode = True


class CreateUserSchema(BaseUserSchema):
    uid: Optional[str]
    password: Optional[str] = Field(None, min_length=User.MIN_LENGTH_PASSWORD)


class UpdateUserSchema(BaseUserSchema):
    uid: Optional[str]
    password: Optional[str] = Field(None, min_length=User.MIN_LENGTH_PASSWORD)
    is_admin: bool


class ReadUserSchema(BaseUserSchema):
    uuid: UUID
    uid: Optional[str]
    is_admin: bool
