from typing import List, Optional
from uuid import UUID

from app.core.exceptions import ApiException, NotFoundObjectMatchingUuid
from app.crud import SubjectCRUD
from app.models import Subject
from app.schemas import CreateSubjectSchema, UpdateSubjectSchema

from fastapi import Request


class SubjectAPI:
    @classmethod
    def gets(cls, request: Request, school_uuid: Optional[UUID]) -> List[Subject]:
        if school_uuid:
            return SubjectCRUD(request.state.db_session).gets_by_school_uuid(
                school_uuid
            )
        return SubjectCRUD(request.state.db_session).gets()

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Optional[Subject]:
        return SubjectCRUD(request.state.db_session).get_by_uuid(uuid)

    @classmethod
    def create(cls, request: Request, schema: CreateSubjectSchema) -> Subject:
        return SubjectCRUD(request.state.db_session).create(schema.dict())

    @classmethod
    def update(
        cls, request: Request, uuid: UUID, schema: UpdateSubjectSchema
    ) -> Subject:
        obj = SubjectCRUD(request.state.db_session).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(Subject))
        return SubjectCRUD(request.state.db_session).update(obj, schema.dict())

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        return SubjectCRUD(request.state.db_session).delete_by_uuid(uuid)
