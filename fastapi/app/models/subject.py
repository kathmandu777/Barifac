from sqlalchemy import Column, Float, ForeignKey, VARCHAR
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

    evaluations = relationship("Evaluation", backref="subject", cascade="all")
    # TODO: fix variable name
    attend_subjects = relationship("AttendSubject", backref="subject", cascade="all")
    comments = relationship("SubjectComment", backref="subject", cascade="all")
