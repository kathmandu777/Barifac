from sqlalchemy import VARCHAR, Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from ..models import BaseModelMixin


class EditRequest(BaseModelMixin):
    __tablename__ = "edit_requests"

    user_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("users.uuid", ondelete="CASCADE"),
        nullable=False,
    )
    MAX_LENGTH_COMMENT = 2000
    comment = Column(VARCHAR(MAX_LENGTH_COMMENT), nullable=False)

    # 編集依頼を受理するモデルのuuidフィールドを作成
    subject_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("subjects.uuid", ondelete="CASCADE"),
        nullable=True,
    )
    evaluation_uuid = Column(
        UUID(as_uuid=True),
        ForeignKey("evaluations.uuid", ondelete="CASCADE"),
        nullable=True,
    )
