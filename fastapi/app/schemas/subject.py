from pydantic import BaseModel

from ..models import School, Teacher, Term


class BaseSubjectSchema(BaseModel):
    name: str
    term: Term
    teacher: Teacher
    school: School
    credits: int

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
