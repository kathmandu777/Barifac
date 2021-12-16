from typing import List, Optional
from uuid import UUID

from app.core.exceptions import (
    ApiException,
    NotFoundObjectMatchingUuid,
    PermissionDenied,
)
from app.crud import SubjectCommentCRUD, SubjectCRUD
from app.models import Subject, SubjectComment
from app.schemas import CreateSubjectCommentSchema, UpdateSubjectCommentSchema
from sqlalchemy import and_

from fastapi import Request


class SubjectCommentAPI:
    @classmethod
    def gets(
        cls,
        request: Request,
        subject_uuid: Optional[UUID],
        user_uuid: Optional[UUID],
    ) -> List[SubjectComment]:
        q = True
        if subject_uuid:
            q = and_(q, SubjectComment.subject_uuid == subject_uuid)
        if user_uuid:
            q = and_(q, (SubjectComment.user_uuid == user_uuid))
        return SubjectCommentCRUD(request.state.db_session).gets(q)

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Optional[SubjectComment]:
        return SubjectCommentCRUD(request.state.db_session).get_by_uuid(uuid)

    @classmethod
    def create(
        cls, request: Request, schema: CreateSubjectCommentSchema
    ) -> SubjectComment:
        subject: Optional[Subject] = SubjectCRUD(request.state.db_session).get_by_uuid(
            schema.subject_uuid
        )
        if subject is None:
            raise ApiException(NotFoundObjectMatchingUuid(Subject))
        data = schema.dict()
        data["user_uuid"] = request.user.uuid
        return SubjectCommentCRUD(request.state.db_session).create(data)

    @classmethod
    def update(
        cls, request: Request, uuid: UUID, schema: UpdateSubjectCommentSchema
    ) -> SubjectComment:
        obj: Optional[SubjectComment] = SubjectCommentCRUD(
            request.state.db_session
        ).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(SubjectComment))
        if obj.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        data = schema.dict()
        data["user_uuid"] = request.user.uuid
        return SubjectCommentCRUD(request.state.db_session).update(uuid, data)

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        obj: Optional[SubjectComment] = SubjectCommentCRUD(
            request.state.db_session
        ).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(SubjectComment))
        if obj.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        return SubjectCommentCRUD(request.state.db_session).delete_by_uuid(uuid)
