from sqlalchemy import VARCHAR, Column, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
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

    name = Column(VARCHAR(100), nullable=False)
    subject_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("subjects.uuid"),
        nullable=False,
    )
    rate = Column(Integer, nullable=False)
    type = Column(VARCHAR(20), nullable=False)
