from typing import List, Optional
from uuid import UUID

from app.core.exceptions import (
    ApiException,
    NotFoundObjectMatchingUuid,
    PermissionDenied,
)
from app.crud import EditRequestCRUD
from app.models import EditRequest
from app.schemas import CreateEditRequestSchema, UpdateEditRequestSchema
from sqlalchemy import and_

from fastapi import Request


class EditRequestAPI:
    @classmethod
    def gets(
        cls,
        request: Request,
        user_uuid: Optional[UUID] = None,
        subject_uuid: Optional[UUID] = None,
        evaluation_uuid: Optional[UUID] = None,
    ) -> List[EditRequest]:
        q = True
        if user_uuid:
            q = and_(q, EditRequest.user_uuid == user_uuid)
        if subject_uuid:
            q = and_(q, EditRequest.subject_uuid == subject_uuid)
        if evaluation_uuid:
            q = and_(q, EditRequest.evaluation_uuid == evaluation_uuid)
        return EditRequestCRUD(request.state.db_session).gets(q)

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Optional[EditRequest]:
        return EditRequestCRUD(request.state.db_session).get_by_uuid(uuid)

    @classmethod
    def create(cls, request: Request, schema: CreateEditRequestSchema) -> EditRequest:
        data = schema.dict()
        data["user_uuid"] = request.user.uuid
        return EditRequestCRUD(request.state.db_session).create(data)

    @classmethod
    def update(
        cls, request: Request, uuid: UUID, schema: UpdateEditRequestSchema
    ) -> EditRequest:
        obj: Optional[EditRequest] = EditRequestCRUD(
            request.state.db_session
        ).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(EditRequest))

        if obj.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        data = schema.dict()
        data["user_uuid"] = request.user.uuid
        return EditRequestCRUD(request.state.db_session).update(uuid, data)

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        obj: Optional[EditRequest] = EditRequestCRUD(
            request.state.db_session
        ).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(EditRequest))
        if obj.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        return EditRequestCRUD(request.state.db_session).delete_by_uuid(uuid)
