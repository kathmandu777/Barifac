from typing import Optional

from ..models import Department, School
from .base import BaseCRUD


class DepartmentCRUD(BaseCRUD):
    model = Department

    def get_by_school_and_name(self, school: School, name: str) -> Optional[model]:
        return self.get_query().filter_by(school_uuid=school.uuid, name=name).first()

    def create(self, data: dict = {}) -> model:
        name: str = data["name"]
        school: School = data["school"]
        department = self.get_by_school_and_name(school, name)
        return department if department else super().create(data)

    def update(self, obj: model, data: dict = {}) -> model:
        name: str = data["name"]
        school: School = data["school"]
        department = self.get_by_school_and_name(school, name)
        return department if department else super().update(obj, data)
