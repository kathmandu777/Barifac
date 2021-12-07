from sqlalchemy import VARCHAR, Column, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID

from ..models import BaseModelMixin


class Score(BaseModelMixin):
    __tablename__ = "scores"

    attend_subject_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("attend_subjects.uuid"),
        nullable=False,
    )
    evaluation_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("evaluations.uuid"),
        nullable=False,
    )
    got_score = Column(Integer, nullable=False)
    max_score = Column(Integer, nullable=False)
    memo = Column(VARCHAR(2000), nullable=True)
