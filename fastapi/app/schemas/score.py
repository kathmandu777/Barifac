from typing import Optional

from pydantic import BaseModel, Field

from ..models import AttendSubject, Evaluation


class BaseScoreSchema(BaseModel):
    attend_subject: AttendSubject
    evaluation: Evaluation
    got_score: int
    max_score: int
    memo: Optional[str] = Field(None, max_length=2000)

    class Config:
        orm_mode = True
        arbitrary_types_allowed = True
