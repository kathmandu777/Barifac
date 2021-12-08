from typing import Optional

from ..models import AttendSubject, Subject, User
from .base import BaseCRUD


class AttendSubjectCRUD(BaseCRUD):
    model = AttendSubject

    def get_by_user_and_subject(self, user: User, subject: Subject) -> Optional[model]:
        return (
            self.get_query()
            .filter_by(
                user_uuid=user.uuid,
                subject_uuid=subject.uuid,
            )
            .first()
        )

    def create(self, data: dict = {}) -> model:
        subject: Subject = data["subject"]
        user: User = data["user"]
        attend_subject = self.get_by_user_and_subject(user, subject)
        return attend_subject if attend_subject else super().create(data)

    def update(self, obj: model, data: dict = {}) -> model:
        subject: Subject = data["subject"]
        user: User = data["user"]
        attend_subject = self.get_by_user_and_subject(user, subject)
        return attend_subject if attend_subject else super().update(obj, data)
