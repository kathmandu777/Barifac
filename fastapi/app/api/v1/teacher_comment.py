from typing import Optional
from uuid import UUID

from app.core.exceptions import (
    ApiException,
    NotFoundObjectMatchingUuid,
    PermissionDenied,
)
from app.crud import TeacherCommentCRUD
from app.crud.teacher import TeacherCRUD
from app.models import TeacherComment
from app.models.teacher import Teacher
from app.schemas import CreateTeacherCommentSchema, UpdateTeacherCommentSchema
from fastapi_pagination import Page, paginate
from sqlalchemy import and_

from fastapi import Request


class TeacherCommentAPI:
    @classmethod
    def gets(
        cls,
        request: Request,
        teacher_uuid: Optional[UUID] = None,
        user_uuid: Optional[UUID] = None,
    ) -> Page[TeacherComment]:
        q = True
        if teacher_uuid:
            q = and_(q, TeacherComment.teacher_uuid == teacher_uuid)
        if user_uuid:
            q = and_(q, TeacherComment.user_uuid == user_uuid)
        return paginate(TeacherCommentCRUD(request.state.db_session).gets(q))

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Optional[TeacherComment]:
        return TeacherCommentCRUD(request.state.db_session).get_by_uuid(uuid)

    @classmethod
    def create(
        cls, request: Request, schema: CreateTeacherCommentSchema
    ) -> TeacherComment:
        teacher: Optional[Teacher] = TeacherCRUD(request.state.db_session).get_by_uuid(
            schema.teacher_uuid
        )
        if teacher is None:
            raise ApiException(NotFoundObjectMatchingUuid(Teacher))
        data = schema.dict()
        data["user_uuid"] = request.user.uuid
        return TeacherCommentCRUD(request.state.db_session).create(data)

    @classmethod
    def update(
        cls, request: Request, uuid: UUID, schema: UpdateTeacherCommentSchema
    ) -> TeacherComment:
        obj: Optional[TeacherComment] = TeacherCommentCRUD(
            request.state.db_session
        ).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(TeacherComment))
        if obj.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        data = schema.dict()
        data["user_uuid"] = request.user.uuid
        return TeacherCommentCRUD(request.state.db_session).update(uuid, data)

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        obj: Optional[TeacherComment] = TeacherCommentCRUD(
            request.state.db_session
        ).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(TeacherComment))
        if obj.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        return TeacherCommentCRUD(request.state.db_session).delete_by_uuid(uuid)
