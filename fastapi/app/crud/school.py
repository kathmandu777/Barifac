from ..models import School
from .base import BaseCRUD


class SchoolCRUD(BaseCRUD):
    model = School

    def get_by_name(self, name: str):
        return self.get_query().filter_by(name=name).first()

    def create(self, data: dict = {}):
        name: str = data["name"]
        school = self.get_by_name(name)
        return school if school else super().create(data)

    def update(self, data: dict = {}):
        name: str = data["name"]
        school = self.get_by_name(name)
        return school if school else super().update(data)
