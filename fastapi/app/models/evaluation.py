from sqlalchemy import VARCHAR, Column, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.schema import UniqueConstraint

from ..models import BaseModelMixin


class Evaluation(BaseModelMixin):
    __tablename__ = "evaluations"
    __table_args__ = (
        UniqueConstraint(
            "name",
            "subject_uuid",
        ),
        {},
    )

    MAX_LENGTH_NAME = 100
    name = Column(VARCHAR(MAX_LENGTH_NAME), nullable=False)
    subject_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("subjects.uuid", ondelete="CASCADE"),
        nullable=False,
    )
    rate = Column(Integer, nullable=False)
    type = Column(VARCHAR(20), nullable=False)  # TODO: enum

    scores = relationship("Score", backref="evaluation", cascade="all")
