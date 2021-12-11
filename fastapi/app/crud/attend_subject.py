from typing import Optional

from sqlalchemy.orm import scoped_session

from ..models import AttendSubject, Subject, User
from .base import BaseCRUD


class AttendSubjectCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, AttendSubject)

    def get_by_user_and_subject(
        self, user: User, subject: Subject
    ) -> Optional[AttendSubject]:
        return (
            self.get_query()
            .filter_by(
                user_uuid=user.uuid,
                subject_uuid=subject.uuid,
            )
            .first()
        )

    def create(self, data: dict = {}) -> AttendSubject:
        subject: Subject = data["subject"]
        user: User = data["user"]
        attend_subject = self.get_by_user_and_subject(user, subject)
        return attend_subject if attend_subject else super().create(data)

    def update(self, obj: AttendSubject, data: dict = {}) -> AttendSubject:
        subject: Subject = data["subject"]
        user: User = data["user"]
        attend_subject = self.get_by_user_and_subject(user, subject)
        return attend_subject if attend_subject else super().update(obj, data)
