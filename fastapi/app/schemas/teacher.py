from pydantic import BaseModel

from ..models import School


class BaseTeacherSchema(BaseModel):
    name: str
    school: School

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
