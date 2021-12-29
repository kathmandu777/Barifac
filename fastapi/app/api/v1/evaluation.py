from typing import Optional
from uuid import UUID

from app.crud import EvaluationCRUD
from app.models import Evaluation
from app.schemas import CreateEvaluationSchema, UpdateEvaluationSchema
from fastapi_pagination import Page, paginate

from fastapi import Request


class EvaluationAPI:
    @classmethod
    def gets(cls, request: Request, subject_uuid: Optional[UUID]) -> Page[Evaluation]:
        if subject_uuid:
            return EvaluationCRUD(request.state.db_session).gets_by_subject_uuid(
                subject_uuid
            )
        return paginate(EvaluationCRUD(request.state.db_session).gets())

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Optional[Evaluation]:
        return EvaluationCRUD(request.state.db_session).get_by_uuid(uuid)

    @classmethod
    def create(cls, request: Request, schema: CreateEvaluationSchema) -> Evaluation:
        return EvaluationCRUD(request.state.db_session).create(schema.dict())

    @classmethod
    def update(
        cls, request: Request, uuid: UUID, schema: UpdateEvaluationSchema
    ) -> Evaluation:
        return EvaluationCRUD(request.state.db_session).update(uuid, schema.dict())

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        return EvaluationCRUD(request.state.db_session).delete_by_uuid(uuid)
