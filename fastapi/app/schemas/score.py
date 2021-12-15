from typing import Optional
from uuid import UUID

from app.models import Score
from pydantic import BaseModel, Field

from .evaluation import ReadEvaluationSchema


class BaseScoreSchema(BaseModel):

    got_score: int
    max_score: int
    memo: Optional[str] = Field(None, max_length=Score.MAX_LENGTH_MEMO)

    class Config:
        orm_mode = True


class ReadScoreSchema(BaseScoreSchema):
    uuid: UUID
    evaluation: ReadEvaluationSchema


class CreateScoreSchema(BaseScoreSchema):
    attend_subject_uuid: UUID
    evaluation_uuid: UUID


class UpdateScoreSchema(BaseScoreSchema):
    attend_subject_uuid: UUID
    evaluation_uuid: UUID


class ReadSimpleScoreSchema(BaseScoreSchema):
    uuid: UUID
