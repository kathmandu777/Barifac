from sqlalchemy import Column, ForeignKey, VARCHAR
from sqlalchemy.dialects.postgresql import UUID

from ..models import BaseModelMixin


class TeacherComment(BaseModelMixin):
    __tablename__ = "teacher_comments"

    teacher_uuid = Column(
        UUID(as_uuid=True), ForeignKey("teachers.uuid"), nullable=False
    )
    user_uuid = Column(UUID(as_uuid=True), ForeignKey("users.uuid"), nullable=False)
    comment = Column(VARCHAR(2000), nullable=False)
