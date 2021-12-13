from typing import Optional

from app.db.database import get_db_session
from app.models import Department, School, User
from sqlalchemy.orm import scoped_session

from ..core.exceptions import (
    ApiException,
    NotFoundObjectMatchingUuid,
    UidOrPasswordMustBeSet,
)
from ..core.security import get_password_hash
from .base import BaseCRUD
from .department import DepartmentCRUD
from .school import SchoolCRUD

db_session = get_db_session()


class UserCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, User)

    def create(self, data: dict = {}) -> User:
        if data["password"] is not None:
            password = data.pop("password")
            data["hashed_password"] = get_password_hash(password)
            return super().create(data)
        elif data["uid"] is not None:
            return super().create(data)
        else:
            raise ApiException(UidOrPasswordMustBeSet)

    def update(self, obj: User, data: dict = {}) -> User:
        if not SchoolCRUD(db_session).get_by_uuid(data["school_uuid"]):
            raise ApiException(NotFoundObjectMatchingUuid(School))
        if not DepartmentCRUD(db_session).get_by_uuid(data["department_uuid"]):
            raise ApiException(NotFoundObjectMatchingUuid(Department))

        if data["password"] is not None:
            password = data.pop("password")
            data["hashed_password"] = get_password_hash(password)
            return super().update(obj, data)
        elif data["uid"] is not None:
            return super().update(obj, data)
        else:
            raise ApiException(UidOrPasswordMustBeSet)

    def get_by_email(self, email: str) -> Optional[User]:
        return self.get_query().filter_by(email=email).first()
