from typing import Optional

from pydantic import BaseModel, Field

from ..models import Teacher, User


class BaseTeacherCommentSchema(BaseModel):
    teacher: Teacher
    user: User
    comment: Optional[str] = Field(None, max_length=2000)

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
