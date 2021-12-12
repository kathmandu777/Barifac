from typing import List, Optional
from uuid import UUID

from app.crud import AttendSubjectCRUD
from app.models import AttendSubject
from app.schemas import CreateAttendSubjectSchema, UpdateAttendSubjectSchema

from fastapi import Request


class AttendSubjectAPI:
    @classmethod
    def gets(cls, request: Request) -> List[AttendSubject]:
        return AttendSubjectCRUD(request.state.db_session).gets_by_user(request.user)

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Optional[AttendSubject]:
        return AttendSubjectCRUD(request.state.db_session).get_by_uuid(uuid)

    @classmethod
    def create(
        cls, request: Request, schema: CreateAttendSubjectSchema
    ) -> AttendSubject:
        schema.user_uuid = request.user.uuid
        return AttendSubjectCRUD(request.state.db_session).create(schema.dict())

    @classmethod
    def update(
        cls, request: Request, uuid: UUID, schema: UpdateAttendSubjectSchema
    ) -> AttendSubject:
        user = request.user
        schema.user_uuid = user.uuid
        return AttendSubjectCRUD(request.state.db_session).update_by_user_and_uuid(
            user, uuid, schema.dict()
        )

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        return AttendSubjectCRUD(request.state.db_session).delete_by_user_and_uuid(
            request.user, uuid
        )
