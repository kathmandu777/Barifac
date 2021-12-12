from typing import List, Optional

from app.core.exceptions import (
    ApiException,
    NotFoundObjectMatchingUuid,
    SameObjectAlreadyExists,
)
from app.db.database import get_db_session
from app.models import School, Teacher
from sqlalchemy.orm import scoped_session

from .base import BaseCRUD
from .school import SchoolCRUD

db_session = get_db_session()


class TeacherCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, Teacher)

    def get_by_name_and_school(self, name: str, school: School) -> Optional[Teacher]:
        return self.get_query().filter_by(name=name, school_uuid=school.uuid).first()

    def gets_by_school_uuid(self, school_uuid) -> List[Teacher]:
        return self.get_query().filter_by(school_uuid=school_uuid).all()

    def create(self, data: dict = {}) -> Teacher:
        name: str = data["name"]
        school: Optional[School] = SchoolCRUD(db_session).get_by_uuid(
            data["school_uuid"]
        )
        if not school:
            raise ApiException(NotFoundObjectMatchingUuid(School))
        teacher = self.get_by_name_and_school(name, school)
        return teacher if teacher else super().create(data)

    def update(self, obj: Teacher, data: dict = {}) -> Teacher:
        name: str = data["name"]
        school: Optional[School] = SchoolCRUD(db_session).get_by_uuid(
            data["school_uuid"]
        )
        if not school:
            raise ApiException(NotFoundObjectMatchingUuid(School))
        teacher = self.get_by_name_and_school(name, school)
        if teacher and teacher.uuid != obj.uuid:
            raise ApiException(SameObjectAlreadyExists)
        return super().update(obj, data)
