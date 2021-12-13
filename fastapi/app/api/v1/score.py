from typing import List, Optional
from uuid import UUID

from app.core.exceptions import (
    ApiException,
    NotFoundObjectMatchingUuid,
    PermissionDenied,
)
from app.crud import AttendSubjectCRUD, ScoreCRUD
from app.models import AttendSubject, Score
from app.schemas import CreateScoreSchema, UpdateScoreSchema

from fastapi import Request


class ScoreAPI:
    @classmethod
    def gets(cls, request: Request) -> List[Score]:
        return ScoreCRUD(request.state.db_session).gets_by_user(request.user)

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Score:
        obj: Optional[Score] = ScoreCRUD(request.state.db_session).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(Score))
        if obj.attend_subject.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        return obj

    @classmethod
    def create(cls, request: Request, schema: CreateScoreSchema) -> Score:
        attend_subject: Optional[AttendSubject] = AttendSubjectCRUD(
            request.state.db_session
        ).get_by_uuid(schema.attend_subject_uuid)
        if not attend_subject:
            raise ApiException(NotFoundObjectMatchingUuid(AttendSubject))
        if attend_subject.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        return ScoreCRUD(request.state.db_session).create(schema.dict())

    @classmethod
    def update(cls, request: Request, uuid: UUID, schema: UpdateScoreSchema) -> Score:
        obj: Optional[Score] = ScoreCRUD(request.state.db_session).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(Score))
        if obj.attend_subject.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        return ScoreCRUD(request.state.db_session).update(obj, schema.dict())

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        obj: Optional[Score] = ScoreCRUD(request.state.db_session).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(Score))
        if obj.attend_subject.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        return ScoreCRUD(request.state.db_session).delete_by_uuid(uuid)
