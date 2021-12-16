from typing import List, Optional
from uuid import UUID

from app.crud import TeacherCRUD
from app.models import Teacher
from app.schemas import CreateTeacherSchema, UpdateTeacherSchema

from fastapi import Request


class TeacherAPI:
    @classmethod
    def gets(cls, request: Request, school_uuid: Optional[UUID]) -> List[Teacher]:
        if school_uuid:
            return TeacherCRUD(request.state.db_session).gets_by_school_uuid(
                school_uuid
            )
        return TeacherCRUD(request.state.db_session).gets()

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Optional[Teacher]:
        return TeacherCRUD(request.state.db_session).get_by_uuid(uuid)

    @classmethod
    def create(cls, request: Request, schema: CreateTeacherSchema) -> Teacher:
        return TeacherCRUD(request.state.db_session).create(schema.dict())

    @classmethod
    def update(
        cls, request: Request, uuid: UUID, schema: UpdateTeacherSchema
    ) -> Teacher:
        return TeacherCRUD(request.state.db_session).update(uuid, schema.dict())

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        return TeacherCRUD(request.state.db_session).delete_by_uuid(uuid)
