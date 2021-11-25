from sqlalchemy import BOOLEAN, VARCHAR, Column, String

from ..models import BaseModelMixin


class User(BaseModelMixin):
    __tablename__ = "users"

    username = Column(VARCHAR(256), unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    uid = Column(VARCHAR(128), nullable=True)
    hashed_password = Column(String, nullable=True)

    is_admin = Column(BOOLEAN, nullable=False, default=False)
    is_active = Column(BOOLEAN, nullable=False, default=True)
