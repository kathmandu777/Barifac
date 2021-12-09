from typing import Optional

from ..models import Evaluation, Subject
from .base import BaseCRUD


class EvaluationCRUD(BaseCRUD):
    model = Evaluation

    def get_by_name_and_subject(self, name: str, subject: Subject) -> Optional[model]:
        return (
            self.get_query()
            .filter_by(
                name=name,
                subject_uuid=subject.uuid,
            )
            .first()
        )

    def create(self, data: dict = {}) -> model:
        subject: Subject = data["subject"]
        evaluation = self.get_by_name_and_subject(data["name"], subject)
        return evaluation if evaluation else super().create(data)

    def update(self, obj: model, data: dict = {}) -> model:
        subject: Subject = data["subject"]
        evaluation = self.get_by_name_and_subject(data["name"], subject)
        return evaluation if evaluation else super().update(obj, data)
