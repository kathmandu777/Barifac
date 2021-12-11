from typing import Optional

from sqlalchemy.orm import scoped_session

from ..models import School, Teacher
from .base import BaseCRUD


class TeacherCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, Teacher)

    def get_by_name_and_school(self, name: str, school: School) -> Optional[Teacher]:
        return self.get_query().filter_by(name=name, school_uuid=school.uuid).first()

    def create(self, data: dict = {}) -> Teacher:
        name: str = data["name"]
        school: School = data["school"]
        teacher = self.get_by_name_and_school(name, school)
        return teacher if teacher else super().create(data)

    def update(self, obj: Teacher, data: dict = {}) -> Teacher:
        name: str = data["name"]
        school: School = data["school"]
        teacher = self.get_by_name_and_school(name, school)
        return teacher if teacher else super().update(obj, data)
