from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field

from .attend_subject import ReadAttendSubjectSchema
from .evaluation import ReadEvaluationSchema


class BaseScoreSchema(BaseModel):

    got_score: int
    max_score: int
    memo: Optional[str] = Field(None, max_length=2000)

    class Config:
        orm_mode = True


class ReadScoreSchema(BaseScoreSchema):
    uuid: UUID
    attend_subject: ReadAttendSubjectSchema
    evaluation: ReadEvaluationSchema


class CreateScoreSchema(BaseScoreSchema):
    attend_subject_uuid: UUID
    evaluation_uuid: UUID


class UpdateScoreSchema(BaseScoreSchema):
    attend_subject_uuid: UUID
    evaluation_uuid: UUID
