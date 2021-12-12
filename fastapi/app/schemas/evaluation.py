from uuid import UUID

from app.models import Evaluation
from pydantic import BaseModel, Field

from .subject import ReadSubjectSchema


class BaseEvaluationSchema(BaseModel):
    name: str = Field(..., max_length=Evaluation.MAX_LENGTH_NAME)
    rate: int = Field(..., ge=0, le=100)
    type: str

    class Config:
        orm_mode = True


class ReadEvaluationSchema(BaseEvaluationSchema):
    uuid: UUID
    subject: ReadSubjectSchema


class CreateEvaluationSchema(BaseEvaluationSchema):
    subject_uuid: UUID


class UpdateEvaluationSchema(BaseEvaluationSchema):
    subject_uuid: UUID
