from app.models import School
from pydantic import BaseModel


class BaseDepartmentSchema(BaseModel):
    school: School
    name: str

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
