from sqlalchemy import VARCHAR, Column, Integer
from sqlalchemy.orm import relationship
from sqlalchemy.sql.schema import UniqueConstraint

from ..models import BaseModelMixin


class Term(BaseModelMixin):
    __tablename__ = "terms"
    __table_args__ = UniqueConstraint("academic_year", "semester"), {}

    academic_year = Column(Integer, nullable=False)
    semester = Column(VARCHAR(10), nullable=False)  # TODO: enum

    subjects = relationship("Subject", backref="term")
