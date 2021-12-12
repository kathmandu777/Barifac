from sqlalchemy import VARCHAR, Column
from sqlalchemy.orm import relationship

from ..models import BaseModelMixin


class School(BaseModelMixin):
    __tablename__ = "schools"

    MAX_LENGTH_NAME = 100
    name = Column(VARCHAR(MAX_LENGTH_NAME), unique=True, nullable=False)

    departments = relationship("Department", backref="school", cascade="all")
    teachers = relationship("Teacher", backref="school", cascade="all")
    subjects = relationship("Subject", backref="school", cascade="all")
    users = relationship("User", backref="school", cascade="all")
