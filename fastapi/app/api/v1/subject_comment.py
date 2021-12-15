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

from fastapi import Request


class SubjectCommentAPI:
    @classmethod
    def gets(
        cls, request: Request, subject_uuid: Optional[UUID]
    ) -> List[SubjectComment]:
        if subject_uuid:
            return SubjectCommentCRUD(request.state.db_session).gets_by_subject_uuid(
                subject_uuid
            )
        return SubjectCommentCRUD(request.state.db_session).gets()

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Optional[SubjectComment]:
        obj: Optional[SubjectComment] = SubjectCommentCRUD(
            request.state.db_session
        ).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(SubjectComment))
        return obj

    @classmethod
    def create(
        cls, request: Request, schema: CreateSubjectCommentSchema
    ) -> SubjectComment:

        subject: Optional[Subject] = SubjectCRUD(request.state.db_session).get_by_uuid(
            schema.subject_uuid
        )

        if not subject:
            raise ApiException(NotFoundObjectMatchingUuid(Subject))

        if schema.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)

        return SubjectCommentCRUD(request.state.db_session).create(schema.dict())

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
        return SubjectCommentCRUD(request.state.db_session).update(obj, schema.dict())

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
