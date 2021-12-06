from sqlalchemy import VARCHAR, Column, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.schema import UniqueConstraint

from ..models import BaseModelMixin


class Subject(BaseModelMixin):
    __tablename__ = "subjects"
    __table_args__ = (
        UniqueConstraint("name", "school_uuid", "term_uuid", "teacher_uuid"),
        {},
    )

    name = Column(VARCHAR(100), nullable=False)
    school_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("schools.uuid"),
        nullable=False,
    )
    term_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("terms.uuid"),
        nullable=False,
    )
    teacher_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("teachers.uuid"),
        nullable=False,
    )
    credits = Column(Integer, nullable=False)

    evaluations = relationship("Evaluation", backref="subject")
    # TODO: fix variable name
    attend_subjects = relationship("AttendSubject", backref="subject")
