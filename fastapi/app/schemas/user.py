from typing import Optional
from uuid import UUID

from app.core.constants import (
    PASSWORD_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH,
)
from pydantic import BaseModel, Field


class BaseUserSchema(BaseModel):
    username: str = Field(
        ..., min_length=USERNAME_MIN_LENGTH, max_length=USERNAME_MAX_LENGTH
    )
    email: str = Field(..., regex=r"[^\s]+@[^\s]+")
    grade: int = Field(..., gte=1, lte=5)

    class Config:
        orm_mode = True


class CreateUserSchema(BaseUserSchema):
    uid: Optional[str]
    password: Optional[str] = Field(None, min_length=PASSWORD_MIN_LENGTH)


class UpdateUserSchema(BaseUserSchema):
    uid: Optional[str]
    password: Optional[str] = Field(None, min_length=PASSWORD_MIN_LENGTH)
    is_admin: bool


class ReadUserSchema(BaseUserSchema):
    uuid: UUID
    uid: Optional[str]
    is_admin: bool
