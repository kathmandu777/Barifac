from sqlalchemy import VARCHAR, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from sqlalchemy.schema import UniqueConstraint

from ..models import BaseModelMixin


class Department(BaseModelMixin):
    __tablename__ = "departments"
    __table_args__ = UniqueConstraint("name", "school_uuid"), {}

    MAX_LENGTH_NAME = 100
    name = Column(VARCHAR(MAX_LENGTH_NAME), nullable=False)
    school_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("schools.uuid"),
        nullable=False,
    )

    users = relationship("User", backref="department")
