from typing import Optional

from ..core.exceptions import UID_OR_PASSWORD_MUST_BE_SET, ApiException
from ..core.security import get_password_hash
from ..models import User
from .base import BaseCRUD


class UserCRUD(BaseCRUD):
    model = User

    def create(self, data: dict = {}) -> model:
        if data["password"] is not None:
            password = data.pop("password")
            data["hashed_password"] = get_password_hash(password)
            return super().create(data)
        elif data["uid"] is not None:
            return super().create(data)
        else:
            raise ApiException(UID_OR_PASSWORD_MUST_BE_SET)

    def update(self, obj: model, data: dict = {}) -> model:
        if data["password"] is not None:
            password = data.pop("password")
            data["hashed_password"] = get_password_hash(password)
            return super().update(obj, data)
        elif data["uid"] is not None:
            return super().update(obj, data)
        else:
            raise ApiException(UID_OR_PASSWORD_MUST_BE_SET)

    def get_by_email(self, email: str) -> Optional[model]:
        return self.get_query().filter_by(email=email).first()
