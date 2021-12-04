from sqlalchemy import VARCHAR, Column
from sqlalchemy.orm import relationship

from ..models import BaseModelMixin


class School(BaseModelMixin):
    __tablename__ = "schools"

    name = Column(VARCHAR(100), unique=True, nullable=False)

    departments = relationship("Department", backref="school")
