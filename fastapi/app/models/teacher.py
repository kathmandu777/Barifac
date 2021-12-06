from sqlalchemy import VARCHAR, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.schema import UniqueConstraint

from ..models import BaseModelMixin


class Teacher(BaseModelMixin):
    __tablename__ = "teachers"
    # TODO:  同姓同名同学校の教師がいた場合
    __table_args__ = UniqueConstraint("name", "school_uuid"), {}

    name = Column(VARCHAR(100), nullable=False)
    school_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("schools.uuid"),
        nullable=False,
    )

    subjects = relationship("Subject", backref="teacher")
    comments = relationship("TeacherComment", backref="teacher")
