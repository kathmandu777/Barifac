from typing import Optional

from app.models import User
from sqlalchemy.orm import scoped_session

from ..core.exceptions import ApiException, UidOrPasswordMustBeSet
from ..core.security import get_password_hash
from .base import BaseCRUD


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
