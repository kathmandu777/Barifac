from ..models import School, Teacher
from .base import BaseCRUD


class TeacherCRUD(BaseCRUD):
    model = Teacher

    def get_by_name_and_school(self, name: str, school: School):
        return self.get_query().filter_by(name=name, school_uuid=school.uuid).first()

    def create(self, data: dict = {}):
        name: str = data["name"]
        school: School = data["school"]
        teacher = self.get_by_name_and_school(name, school)
        return teacher if teacher else super().create(data)

    def update(self, data: dict = {}):
        name: str = data["name"]
        school: School = data["school"]
        teacher = self.get_by_name_and_school(name, school)
        return teacher if teacher else super().update(data)
