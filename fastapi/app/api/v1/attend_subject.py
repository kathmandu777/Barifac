from typing import List, Optional
from uuid import UUID

from app.core.exceptions import (
    ApiException,
    NotFoundObjectMatchingUuid,
    PermissionDenied,
)
from app.crud import AttendSubjectCRUD, EvaluationCRUD, ScoreCRUD
from app.models import AttendSubject
from app.schemas import CreateAttendSubjectSchema, UpdateAttendSubjectSchema

from fastapi import Request


class AttendSubjectAPI:
    @classmethod
    def gets(cls, request: Request, term_uuid: Optional[UUID]) -> List[AttendSubject]:
        if term_uuid:
            return AttendSubjectCRUD(
                request.state.db_session
            ).gets_by_user_and_term_uuid(request.user, term_uuid)
        return AttendSubjectCRUD(request.state.db_session).gets_by_user(request.user)

    @classmethod
    def gets_readable_data(cls, request: Request, term_uuid: Optional[UUID]):
        if term_uuid:
            attend_subjects = AttendSubjectCRUD(
                request.state.db_session
            ).gets_by_user_and_term_uuid(request.user, term_uuid)
        else:
            attend_subjects = AttendSubjectCRUD(request.state.db_session).gets_by_user(
                request.user
            )

        data = []
        for attend_subject in attend_subjects:
            evaluations = EvaluationCRUD(request.state.db_session).gets_by_subject_uuid(
                attend_subject.subject.uuid
            )
            evaluations_data = []
            for evaluation in evaluations:
                scores = ScoreCRUD(
                    request.state.db_session
                ).gets_by_attend_subject_evaluation(attend_subject, evaluation)
                evaluations_data.append(
                    {
                        "evaluation_uuid": evaluation.uuid,
                        "evaluation_name": evaluation.name,
                        "rate": evaluation.rate,
                        "scores": [
                            {
                                "score_uuid": score.uuid,
                                "got_score": score.got_score,
                                "max_score": score.max_score,
                                "memo": score.memo,
                            }
                            for score in scores
                        ],
                    }
                )
            data.append(
                {
                    "uuid": attend_subject.uuid,
                    "target_value": attend_subject.target_value,
                    "target_score": attend_subject.target_score,
                    "subject_uuid": attend_subject.subject_uuid,
                    "subject_name": attend_subject.subject.name,
                    "teacher_uuid": attend_subject.subject.teacher.uuid,
                    "teacher_name": attend_subject.subject.teacher.name,
                    "evaluations": evaluations_data,
                }
            )
        return data

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Optional[AttendSubject]:
        obj = AttendSubjectCRUD(request.state.db_session).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(AttendSubject))
        if obj.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        return obj

    @classmethod
    def get_readable_data(cls, request: Request, uuid: UUID):
        attend_subject = AttendSubjectCRUD(request.state.db_session).get_by_uuid(uuid)
        if not attend_subject:
            raise ApiException(NotFoundObjectMatchingUuid(AttendSubject))
        if attend_subject.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        evaluations = EvaluationCRUD(request.state.db_session).gets_by_subject_uuid(
            attend_subject.subject.uuid
        )
        evaluations_data = []
        for evaluation in evaluations:
            scores = ScoreCRUD(
                request.state.db_session
            ).gets_by_attend_subject_evaluation(attend_subject, evaluation)
            evaluations_data.append(
                {
                    "evaluation_uuid": evaluation.uuid,
                    "evaluation_name": evaluation.name,
                    "rate": evaluation.rate,
                    "scores": [
                        {
                            "score_uuid": score.uuid,
                            "got_score": score.got_score,
                            "max_score": score.max_score,
                            "memo": score.memo,
                        }
                        for score in scores
                    ],
                }
            )
        return {
            "uuid": attend_subject.uuid,
            "target_value": attend_subject.target_value,
            "target_score": attend_subject.target_score,
            "subject_uuid": attend_subject.subject_uuid,
            "subject_name": attend_subject.subject.name,
            "teacher_uuid": attend_subject.subject.teacher.uuid,
            "teacher_name": attend_subject.subject.teacher.name,
            "evaluations": evaluations_data,
        }

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
        return AttendSubjectCRUD(request.state.db_session).update(uuid, data)

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        obj = AttendSubjectCRUD(request.state.db_session).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(AttendSubject))
        if obj.user_uuid != request.user.uuid:
            raise ApiException(PermissionDenied)
        return AttendSubjectCRUD(request.state.db_session).delete_by_uuid(uuid)
