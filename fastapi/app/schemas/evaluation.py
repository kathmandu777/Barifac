from pydantic import BaseModel

from ..models import Subject


class BaseEvaluationSchema(BaseModel):
    name: str
    subject: Subject
    rate: int
    type: str

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
