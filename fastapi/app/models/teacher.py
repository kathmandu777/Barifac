from sqlalchemy import VARCHAR, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.schema import UniqueConstraint

from ..models import BaseModelMixin


class Teacher(BaseModelMixin):
    __tablename__ = "teachers"
    # TODO:  同姓同名同学校の教師がいた場合
    __table_args__ = UniqueConstraint("name", "school_uuid"), {}

    MAX_LENGTH_NAME = 100
    name = Column(VARCHAR(MAX_LENGTH_NAME), nullable=False)
    school_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("schools.uuid", ondelete="CASCADE"),
        nullable=False,
    )

    subjects = relationship("Subject", backref="teacher", cascade="all")
    comments = relationship("TeacherComment", backref="teacher", cascade="all")
