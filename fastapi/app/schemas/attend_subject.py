from pydantic import BaseModel

from ..models import Subject, User


class BaseAttendSubjectSchema(BaseModel):
    user: User
    subject: Subject
    target_value: str
    target_score: int

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
