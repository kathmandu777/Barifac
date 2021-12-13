from typing import List, Optional
from uuid import UUID

from app.core.exceptions import (
    ApiException,
    NotFoundObjectMatchingUuid,
    SameObjectAlreadyExists,
)
from app.db.database import get_db_session
from sqlalchemy.orm import scoped_session

from ..models import School, Subject, Teacher, Term
from .base import BaseCRUD
from .school import SchoolCRUD
from .teacher import TeacherCRUD
from .term import TermCRUD

db_session = get_db_session()


class SubjectCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, Subject)

    def gets_by_school_uuid(self, school_uuid: UUID) -> List[Subject]:
        return self.get_query().filter_by(school_uuid=school_uuid).all()

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
        term: Optional[Term] = TermCRUD(db_session).get_by_uuid(data["term_uuid"])
        if not term:
            raise ApiException(NotFoundObjectMatchingUuid(Term))
        school: Optional[School] = SchoolCRUD(db_session).get_by_uuid(
            data["school_uuid"]
        )
        if not school:
            raise ApiException(NotFoundObjectMatchingUuid(School))
        teacher: Optional[Teacher] = TeacherCRUD(db_session).get_by_uuid(
            data["teacher_uuid"]
        )
        if not teacher:
            raise ApiException(NotFoundObjectMatchingUuid(Teacher))
        name: str = data["name"]
        subject = self.get_by_name_term_school_teacher(name, term, school, teacher)
        if subject:
            raise ApiException(SameObjectAlreadyExists)
        return super().create(data)

    def update(self, obj: Subject, data: dict = {}) -> Subject:
        term: Optional[Term] = TermCRUD(db_session).get_by_uuid(data["term_uuid"])
        if not term:
            raise ApiException(NotFoundObjectMatchingUuid(Term))
        school: Optional[School] = SchoolCRUD(db_session).get_by_uuid(
            data["school_uuid"]
        )
        if not school:
            raise ApiException(NotFoundObjectMatchingUuid(School))
        teacher: Optional[Teacher] = TeacherCRUD(db_session).get_by_uuid(
            data["teacher_uuid"]
        )
        if not teacher:
            raise ApiException(NotFoundObjectMatchingUuid(Teacher))
        name: str = data["name"]
        subject = self.get_by_name_term_school_teacher(name, term, school, teacher)
        if subject and subject.uuid != obj.uuid:
            raise ApiException(SameObjectAlreadyExists)
        return super().update(obj, data)
