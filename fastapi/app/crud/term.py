from typing import List, Optional
from uuid import UUID

from app.core.exceptions import (
    ApiException,
    NotFoundObjectMatchingUuid,
    SameObjectAlreadyExists,
)
from sqlalchemy import and_
from sqlalchemy.orm import scoped_session

from ..models import SemesterEnum, Term
from .base import BaseCRUD


class TermCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, Term)

    def get_by_year_and_semester(
        self, academic_year: int, semester: str
    ) -> Optional[Term]:
        return (
            self.get_query()
            .filter_by(academic_year=academic_year, semester=semester)
            .first()
        )

    def gets_by_year_and_semester(
        self, academic_year: Optional[int], semester: Optional[SemesterEnum]
    ) -> List[Term]:
        q = True
        if academic_year is not None:
            q = and_(q, Term.academic_year == academic_year)
        if semester is not None:
            q = and_(q, Term.semester == semester.value)
        return self.get_query().filter(q).all()

    def create(self, data: dict = {}) -> Term:
        academic_year: int = data["academic_year"]
        semester: str = data["semester"]
        term = self.get_by_year_and_semester(academic_year, semester)
        if term:
            raise ApiException(SameObjectAlreadyExists)
        return super().create(data)

    def update(self, uuid: UUID, data: dict = {}) -> Term:
        obj = self.get_by_uuid(uuid)
        if obj is None:
            raise ApiException(NotFoundObjectMatchingUuid(Term))
        academic_year: int = data["academic_year"]
        semester: str = data["semester"]
        term = self.get_by_year_and_semester(academic_year, semester)
        if term and term.uuid != obj.uuid:
            raise ApiException(SameObjectAlreadyExists)
        return super().update(obj, data)
