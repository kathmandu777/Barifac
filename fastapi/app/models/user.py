from sqlalchemy import BOOLEAN, VARCHAR, Column, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from ..models import BaseModelMixin


class User(BaseModelMixin):
    __tablename__ = "users"

    MAX_LENGTH_USERNAME = 256
    MIN_LENGTH_USERNAME = 3
    username = Column(VARCHAR(MAX_LENGTH_USERNAME), unique=False, nullable=False)
    email = Column(String, unique=True, nullable=False)

    MAX_LENGTH_UID = 128
    uid = Column(VARCHAR(MAX_LENGTH_UID), nullable=True)
    MIN_LENGTH_PASSWORD = 8
    hashed_password = Column(String, nullable=True)
    school_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("schools.uuid", ondelete="CASCADE"),
        nullable=True,
    )
    department_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("departments.uuid", ondelete="CASCADE"),
        nullable=True,
    )
    grade = Column(Integer, nullable=True)

    is_admin = Column(BOOLEAN, nullable=False, default=False)

    attend_subjects = relationship("AttendSubject", backref="user", cascade="all")
    teacher_comments = relationship("TeacherComment", backref="user", cascade="all")
    subject_comments = relationship("SubjectComment", backref="user", cascade="all")
    edit_requests = relationship("EditRequest", backref="user", cascade="all")
