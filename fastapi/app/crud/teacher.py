from typing import Optional

from app.core.exceptions import (
    NOT_FOUND_OBJ_MATCHING_UUID,
    SAME_OBJECT_ALREADY_EXISTS,
    ApiException,
)
from app.db.database import get_db_session
from sqlalchemy.orm import scoped_session

from ..models import School, Teacher
from .base import BaseCRUD
from .school import SchoolCRUD

db_session = get_db_session()


class TeacherCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, Teacher)

    def get_by_name_and_school(self, name: str, school: School) -> Optional[Teacher]:
        return self.get_query().filter_by(name=name, school_uuid=school.uuid).first()

    def create(self, data: dict = {}) -> Teacher:
        name: str = data["name"]
        school: Optional[School] = SchoolCRUD(db_session).get_by_uuid(
            data["school_uuid"]
        )
        if not school:
            raise ApiException(NOT_FOUND_OBJ_MATCHING_UUID(School))
        teacher = self.get_by_name_and_school(name, school)
        return teacher if teacher else super().create(data)

    def update(self, obj: Teacher, data: dict = {}) -> Teacher:
        name: str = data["name"]
        school: Optional[School] = SchoolCRUD(db_session).get_by_uuid(
            data["school_uuid"]
        )
        if not school:
            raise ApiException(NOT_FOUND_OBJ_MATCHING_UUID(School))
        teacher = self.get_by_name_and_school(name, school)
        if teacher and teacher.uuid != obj.uuid:
            raise ApiException(SAME_OBJECT_ALREADY_EXISTS)
        return super().update(obj, data)
