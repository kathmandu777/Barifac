from typing import Optional
from uuid import UUID

from app.core.exceptions import (
    ApiException,
    NotFoundObjectMatchingUuid,
    SameObjectAlreadyExists,
)
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
        if school:
            raise ApiException(SameObjectAlreadyExists)
        return super().create(data)

    def update(self, uuid: UUID, data: dict = {}) -> School:
        obj = self.get_by_uuid(uuid)
        if obj is None:
            raise ApiException(NotFoundObjectMatchingUuid(School))
        name: str = data["name"]
        school = self.get_by_name(name)
        if school and school.uuid != obj.uuid:
            raise ApiException(SameObjectAlreadyExists)
        return super().update(uuid, data)
