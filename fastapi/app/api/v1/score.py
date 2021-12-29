from typing import Optional
from uuid import UUID

from app.core.exceptions import (
    ApiException,
    NotFoundObjectMatchingUuid,
    PermissionDenied,
)
from app.crud import AttendSubjectCRUD, EvaluationCRUD, ScoreCRUD
from app.models import AttendSubject, Evaluation, Score
from app.schemas import CreateScoreSchema, UpdateScoreSchema
from fastapi_pagination import Page, paginate
from sqlalchemy import and_

from fastapi import Request


class ScoreAPI:
    @classmethod
    def gets(
        cls,
        request: Request,
        attend_subject_uuid: Optional[UUID],
        evaluation_uuid: Optional[UUID],
    ) -> Page[Score]:
        q = True
        if attend_subject_uuid:
            q = and_(q, Score.attend_subject_uuid == attend_subject_uuid)
        if evaluation_uuid:
            q = and_(q, Score.evaluation_uuid == evaluation_uuid)
        q = and_(q, AttendSubject.user_uuid == request.user.uuid)
        return paginate(
            ScoreCRUD(request.state.db_session).gets_from_joined_attend_subjects(q)
        )

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Score:
        obj: Optional[Score] = ScoreCRUD(request.state.db_session).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(Score))
        if obj.attend_subject.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        return obj

    @classmethod
    def get_by_evaluation_uuid(cls, request: Request, evaluation_uuid: UUID):
        evaluation = EvaluationCRUD(request.state.db_session).get_by_uuid(
            evaluation_uuid
        )
        if evaluation is None:
            raise ApiException(NotFoundObjectMatchingUuid(Evaluation))
        scores = ScoreCRUD(request.state.db_session).gets_from_joined_attend_subjects(
            and_(
                AttendSubject.user_uuid == request.user.uuid,
                Score.evaluation_uuid == evaluation_uuid,
            )
        )
        attend_subject = AttendSubjectCRUD(
            request.state.db_session
        ).get_by_user_and_subject(request.user, evaluation.subject)
        if attend_subject is None:
            raise ApiException(NotFoundObjectMatchingUuid(AttendSubject))
        return {
            "attend_subject_uuid": attend_subject.uuid,
            "subject_name": attend_subject.subject.name,
            "subject_uuid": attend_subject.subject.uuid,
            "evaluation_name": evaluation.name,
            "evaluation_uuid": evaluation.uuid,
            "rate": evaluation.rate,
            "scores": [
                {
                    "got_score": score.got_score,
                    "max_score": score.max_score,
                    "score_uuid": score.uuid,
                    "memo": score.memo,
                }
                for score in scores
            ],
        }

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
        return ScoreCRUD(request.state.db_session).update(uuid, schema.dict())

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        obj: Optional[Score] = ScoreCRUD(request.state.db_session).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(Score))
        if obj.attend_subject.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        return ScoreCRUD(request.state.db_session).delete_by_uuid(uuid)
