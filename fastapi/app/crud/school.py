from typing import Optional

from sqlalchemy.orm import scoped_session

from ..models import School
from .base import BaseCRUD


class SchoolCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, School)

    def get_by_name(self, name: str) -> Optional[School]:
        return self.get_query().filter_by(name=name).first()

    def create(self, data: dict = {}) -> School:
        name: str = data["name"]
        school = self.get_by_name(name)
        return school if school else super().create(data)

    def update(self, obj: School, data: dict = {}) -> School:
        name: str = data["name"]
        school = self.get_by_name(name)
        return school if school else super().update(obj, data)
