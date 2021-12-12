from sqlalchemy import VARCHAR, Column, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
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
    MAX_LENGTH_TARGET_NAME = 1
    target_value = Column(VARCHAR(MAX_LENGTH_TARGET_NAME), nullable=False)
    target_score = Column(Integer, nullable=False)

    scores = relationship("Score", backref="attend_subject", cascade="all")
