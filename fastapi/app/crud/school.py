from typing import Optional

from ..models import School
from .base import BaseCRUD


class SchoolCRUD(BaseCRUD):
    model = School

    def get_by_name(self, name: str) -> Optional[model]:
        return self.get_query().filter_by(name=name).first()

    def create(self, data: dict = {}) -> model:
        name: str = data["name"]
        school = self.get_by_name(name)
        return school if school else super().create(data)

    def update(self, obj: model, data: dict = {}) -> model:
        name: str = data["name"]
        school = self.get_by_name(name)
        return school if school else super().update(obj, data)
