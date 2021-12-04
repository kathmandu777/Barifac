from sqlalchemy import Column, ForeignKey, VARCHAR
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.schema import UniqueConstraint

from ..models import BaseModelMixin


class Department(BaseModelMixin):
    __tablename__ = "departments"
    __table_args__ = UniqueConstraint("name", "school_uuid"), {}

    name = Column(VARCHAR(100), unique=True, nullable=False)
    school_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("schools.uuid"),
        nullable=False,
    )
