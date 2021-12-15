from sqlalchemy import VARCHAR, Column, Float, ForeignKey, Integer
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

    MAX_LENGTH_NAME = 100
    name = Column(VARCHAR(MAX_LENGTH_NAME), nullable=False)
    school_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("schools.uuid", ondelete="CASCADE"),
        nullable=False,
    )
    term_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("terms.uuid", ondelete="CASCADE"),
        nullable=False,
    )
    teacher_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("teachers.uuid", ondelete="CASCADE"),
        nullable=False,
    )
    credits = Column(Float, nullable=False)

    MAX_LENGTH_CATEGORY = 10
    category = Column(VARCHAR(MAX_LENGTH_CATEGORY), nullable=True)
    MAX_LENGTH_TYPE = 10
    type = Column(VARCHAR(MAX_LENGTH_TYPE), nullable=True)
    target_grade = Column(Integer, nullable=True)
    department_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("departments.uuid", ondelete="CASCADE"),
        nullable=True,
    )

    # syllabus information
    MAX_LENGTH_SYLLABUS_URL = 1024
    syllabus_url = Column(VARCHAR(MAX_LENGTH_SYLLABUS_URL), nullable=True)

    evaluations = relationship("Evaluation", backref="subject", cascade="all")
    # TODO: fix variable name
    attend_subjects = relationship("AttendSubject", backref="subject", cascade="all")
    comments = relationship("SubjectComment", backref="subject", cascade="all")
