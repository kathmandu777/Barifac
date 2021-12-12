from typing import Optional

from app.core.exceptions import NOT_FOUND_OBJ_MATCHING_UUID, ApiException
from app.db.database import get_db_session
from sqlalchemy.orm import scoped_session

from ..models import AttendSubject, Evaluation, Score
from .attend_subject import AttendSubjectCRUD
from .base import BaseCRUD
from .evaluation import EvaluationCRUD

db_session = get_db_session()


class ScoreCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, Score)

    def create(self, data: dict = {}) -> Score:
        attend_subject: Optional[Score] = AttendSubjectCRUD(
            self.db_session
        ).get_by_uuid(data["attend_subject_uuid"])
        if not attend_subject:
            raise ApiException(NOT_FOUND_OBJ_MATCHING_UUID(AttendSubject))
        evaluation: Optional[Evaluation] = EvaluationCRUD(db_session).get_by_uuid(
            data["evaluation_uuid"]
        )
        if not evaluation:
            raise ApiException(NOT_FOUND_OBJ_MATCHING_UUID(Evaluation))
        return super().create(data)

    def update(self, obj: Score, data: dict = {}) -> Score:
        attend_subject: Optional[Score] = AttendSubjectCRUD(
            self.db_session
        ).get_by_uuid(data["attend_subject_uuid"])
        if not attend_subject:
            raise ApiException(NOT_FOUND_OBJ_MATCHING_UUID(AttendSubject))
        evaluation: Optional[Evaluation] = EvaluationCRUD(db_session).get_by_uuid(
            data["evaluation_uuid"]
        )
        if not evaluation:
            raise ApiException(NOT_FOUND_OBJ_MATCHING_UUID(Evaluation))
        return super().update(obj, data)
