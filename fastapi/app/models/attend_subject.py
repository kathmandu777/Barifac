from sqlalchemy import VARCHAR, Column, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.schema import UniqueConstraint

from ..models import BaseModelMixin


class AttendSubject(BaseModelMixin):
    __tablename__ = "attend_subjects"
    __table_args__ = (
        UniqueConstraint("user_uuid", "subject_uuid"),
        {},
    )

    user_uuid = Column(UUID(as_uuid=True), ForeignKey("users.uuid"), nullable=False)
    subject_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("subjects.uuid"),
        nullable=False,
    )
    target_value = Column(VARCHAR(1), nullable=False)
    target_score = Column(Integer, nullable=False)
