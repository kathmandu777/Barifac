from typing import Optional

from sqlalchemy.orm import scoped_session

from ..models import Term
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

    def create(self, data: dict = {}) -> Term:
        academic_year: int = data["academic_year"]
        semester: str = data["semester"]
        term = self.get_by_year_and_semester(academic_year, semester)
        return term if term else super().create(data)

    def update(self, obj: Term, data: dict = {}) -> Term:
        academic_year: int = data["academic_year"]
        semester: str = data["semester"]
        term = self.get_by_year_and_semester(academic_year, semester)
        return term if term else super().update(obj, data)
