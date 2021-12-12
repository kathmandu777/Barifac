from uuid import UUID

from pydantic import BaseModel

from .subject import ReadSubjectSchema


class BaseEvaluationSchema(BaseModel):
    name: str
    rate: int
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
