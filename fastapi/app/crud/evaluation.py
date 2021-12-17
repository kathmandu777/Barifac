from typing import List, Optional
from uuid import UUID

from app.core.exceptions import (
    ApiException,
    NotFoundObjectMatchingUuid,
    SameObjectAlreadyExists,
)
from app.db.database import get_db_session
from sqlalchemy.orm import scoped_session

from ..models import Evaluation, Subject
from .base import BaseCRUD
from .subject import SubjectCRUD

db_session = get_db_session()


class EvaluationCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, Evaluation)

    def get_by_name_and_subject(
        self, name: str, subject: Subject
    ) -> Optional[Evaluation]:
        return (
            self.get_query()
            .filter_by(
                name=name,
                subject_uuid=subject.uuid,
            )
            .first()
        )

    def gets_by_subject_uuid(self, subject_uuid: UUID) -> List[Evaluation]:
        return self.get_query().filter_by(subject_uuid=subject_uuid).all()

    def create(self, data: dict = {}) -> Evaluation:
        subject: Optional[Subject] = SubjectCRUD(db_session).get_by_uuid(
            data["subject_uuid"]
        )
        if not subject:
            raise ApiException(NotFoundObjectMatchingUuid(Subject))
        evaluation = self.get_by_name_and_subject(data["name"], subject)
        if evaluation:
            raise ApiException(SameObjectAlreadyExists)
        return super().create(data)

    def update(self, uuid: UUID, data: dict = {}) -> Evaluation:
        obj = self.get_by_uuid(uuid)
        if obj is None:
            raise ApiException(NotFoundObjectMatchingUuid(Evaluation))

        subject: Optional[Subject] = SubjectCRUD(db_session).get_by_uuid(
            data["subject_uuid"]
        )
        if not subject:
            raise ApiException(NotFoundObjectMatchingUuid(Subject))
        evaluation = self.get_by_name_and_subject(data["name"], subject)
        if evaluation and evaluation.uuid != obj.uuid:
            raise ApiException(SameObjectAlreadyExists)
        return super().update(uuid, data)
