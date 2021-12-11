from typing import Optional

from sqlalchemy.orm import scoped_session

from ..models import School, Subject, Teacher, Term
from .base import BaseCRUD


class SubjectCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, Subject)

    def get_by_name_term_school_teacher(
        self, name: str, term: Term, school: School, teacher: Teacher
    ) -> Optional[Subject]:
        return (
            self.get_query()
            .filter_by(
                name=name,
                term_uuid=term.uuid,
                school_uuid=school.uuid,
                teacher_uuid=teacher.uuid,
            )
            .first()
        )

    def create(self, data: dict = {}) -> Subject:
        term: Term = data["term"]
        school: School = data["school"]
        name: str = data["name"]
        teacher: Teacher = data["teacher"]
        subject = self.get_by_name_term_school_teacher(name, term, school, teacher)
        return subject if subject else super().create(data)

    def update(self, obj: Subject, data: dict = {}) -> Subject:
        term: Term = data["term"]
        school: School = data["school"]
        name: str = data["name"]
        teacher: Teacher = data["teacher"]
        subject = self.get_by_name_term_school_teacher(name, term, school, teacher)
        return subject if subject else super().update(obj, data)
