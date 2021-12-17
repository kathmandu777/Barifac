from typing import List, Optional
from uuid import UUID

from app.core.exceptions import ApiException, NotFoundObjectMatchingUuid
from app.db.database import get_db_session
from sqlalchemy.orm import scoped_session

from ..models import AttendSubject, Evaluation, Score, User
from .attend_subject import AttendSubjectCRUD
from .base import BaseCRUD
from .evaluation import EvaluationCRUD

db_session = get_db_session()


class ScoreCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, Score)

    def gets_by_user(self, user: User) -> List[Score]:
        return (
            self.get_query()
            .join(AttendSubject)
            .filter(AttendSubject.user_uuid == user.uuid)
            .all()
        )

    def gets_from_joined_attend_subjects(self, query) -> List[Score]:
        return self.get_query().join(AttendSubject).filter(query).all()

    def gets_by_attend_subject_evaluation(
        self, attend_subject: AttendSubject, evaluation: Evaluation
    ) -> List[Score]:
        return (
            self.get_query()
            .join(Evaluation)
            .filter(
                Score.attend_subject_uuid == attend_subject.uuid,
                Evaluation.uuid == evaluation.uuid,
            )
            .all()
        )

    def create(self, data: dict = {}) -> Score:
        attend_subject: Optional[Score] = AttendSubjectCRUD(
            self.db_session
        ).get_by_uuid(data["attend_subject_uuid"])
        if not attend_subject:
            raise ApiException(NotFoundObjectMatchingUuid(AttendSubject))
        evaluation: Optional[Evaluation] = EvaluationCRUD(db_session).get_by_uuid(
            data["evaluation_uuid"]
        )
        if not evaluation:
            raise ApiException(NotFoundObjectMatchingUuid(Evaluation))
        return super().create(data)

    def update(self, uuid: UUID, data: dict = {}) -> Score:
        attend_subject: Optional[Score] = AttendSubjectCRUD(
            self.db_session
        ).get_by_uuid(data["attend_subject_uuid"])
        if not attend_subject:
            raise ApiException(NotFoundObjectMatchingUuid(AttendSubject))
        evaluation: Optional[Evaluation] = EvaluationCRUD(db_session).get_by_uuid(
            data["evaluation_uuid"]
        )
        if not evaluation:
            raise ApiException(NotFoundObjectMatchingUuid(Evaluation))
        return super().update(uuid, data)
