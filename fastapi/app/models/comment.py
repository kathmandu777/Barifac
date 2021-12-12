from sqlalchemy import VARCHAR, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from ..models import BaseModelMixin


class TeacherComment(BaseModelMixin):
    __tablename__ = "teacher_comments"

    teacher_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("teachers.uuid", ondelete="CASCADE"),
        nullable=False,
    )
    user_uuid = Column(
        UUID(as_uuid=True), ForeignKey("users.uuid", ondelete="CASCADE"), nullable=False
    )
    MAX_LENGTH_COMMENT = 2000
    comment = Column(VARCHAR(MAX_LENGTH_COMMENT), nullable=False)


class SubjectComment(BaseModelMixin):
    __tablename__ = "subject_comments"

    subject_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("subjects.uuid", ondelete="CASCADE"),
        nullable=False,
    )
    user_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("users.uuid", ondelete="CASCADE"),
        nullable=False,
    )
    MAX_LENGTH_COMMENT = 2000
    comment = Column(VARCHAR(MAX_LENGTH_COMMENT), nullable=False)
