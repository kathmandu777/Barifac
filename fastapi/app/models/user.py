from sqlalchemy import BOOLEAN, VARCHAR, Column, String

from ..core.constants import USERNAME_MAX_LENGTH
from ..models import BaseModelMixin


class User(BaseModelMixin):
    __tablename__ = "users"

    username = Column(VARCHAR(USERNAME_MAX_LENGTH), unique=True, nullable=False)
    mail = Column(String, unique=True, nullable=False)
    uid = Column(VARCHAR(128), nullable=True)
    hashed_password = Column(String, nullable=True)

    is_admin = Column(BOOLEAN, nullable=False, default=False)
    is_active = Column(BOOLEAN, nullable=False, default=True)
    is_not_active = Column(BOOLEAN, nullable=False, default=True)
