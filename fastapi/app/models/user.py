from sqlalchemy import BOOLEAN, VARCHAR, Column, ForeignKey, Integer, String
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from ..core.constants import USERNAME_MAX_LENGTH
from ..models import BaseModelMixin


class User(BaseModelMixin):
    __tablename__ = "users"

    username = Column(VARCHAR(USERNAME_MAX_LENGTH), unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    uid = Column(VARCHAR(128), nullable=True)
    hashed_password = Column(String, nullable=True)
    school_uuid = Column(UUID(as_uuid=True), ForeignKey("schools.uuid"), nullable=True)
    department_uuid = Column(
        UUID(as_uuid=True), ForeignKey("departments.uuid"), nullable=True
    )
    grade = Column(Integer, nullable=False)

    is_admin = Column(BOOLEAN, nullable=False, default=False)
    is_active = Column(BOOLEAN, nullable=False, default=True)

    attend_subjects = relationship("AttendSubject", backref="user")
    teacher_comments = relationship("TeacherComment", backref="user")
    subject_comments = relationship("SubjectComment", backref="user")
