from typing import List, Optional
from uuid import UUID

from app.core.exceptions import (
    ApiException,
    NotFoundObjectMatchingUuid,
    PermissionDenied,
)
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
        attend_subject = AttendSubjectCRUD(request.state.db_session).get_by_uuid(uuid)
        if not attend_subject:
            raise ApiException(NotFoundObjectMatchingUuid(AttendSubject))
        if attend_subject.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        return AttendSubjectCRUD(request.state.db_session).get_by_uuid(uuid)

    @classmethod
    def create(
        cls, request: Request, schema: CreateAttendSubjectSchema
    ) -> AttendSubject:
        data = schema.dict()
        data["user_uuid"] = request.user.uuid
        return AttendSubjectCRUD(request.state.db_session).create(data)

    @classmethod
    def update(
        cls, request: Request, uuid: UUID, schema: UpdateAttendSubjectSchema
    ) -> AttendSubject:
        obj = AttendSubjectCRUD(request.state.db_session).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(AttendSubject))
        if obj.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        data = schema.dict()
        data["user_uuid"] = request.user.uuid
        return AttendSubjectCRUD(request.state.db_session).update(obj, data)

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        obj = AttendSubjectCRUD(request.state.db_session).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(AttendSubject))
        if obj.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        return AttendSubjectCRUD(request.state.db_session).delete_by_uuid(uuid)
