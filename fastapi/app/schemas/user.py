from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class BaseUserSchema(BaseModel):
    username: str
    email: str

    class Config:
        orm_mode = True


class CreateUserSchema(BaseUserSchema):
    uid: Optional[str]
    password: Optional[str]


class UpdateUserSchema(BaseUserSchema):
    uid: Optional[str]
    password: Optional[str]
    is_admin: bool


class ReadUserSchema(BaseUserSchema):
    uuid: UUID
    uid: Optional[str]
    is_admin: bool
