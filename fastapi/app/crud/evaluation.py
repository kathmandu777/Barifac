from typing import Optional

from sqlalchemy.orm import scoped_session

from ..models import Evaluation, Subject
from .base import BaseCRUD


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

    def create(self, data: dict = {}) -> Evaluation:
        subject: Subject = data["subject"]
        evaluation = self.get_by_name_and_subject(data["name"], subject)
        return evaluation if evaluation else super().create(data)

    def update(self, obj: Evaluation, data: dict = {}) -> Evaluation:
        subject: Subject = data["subject"]
        evaluation = self.get_by_name_and_subject(data["name"], subject)
        return evaluation if evaluation else super().update(obj, data)
