from typing import Optional

from app.core.exceptions import NOT_FOUND_OBJ_MATCHING_UUID, ApiException
from app.db.database import get_db_session
from sqlalchemy.orm import scoped_session

from ..models import Subject, SubjectComment
from .base import BaseCRUD
from .subject import SubjectCRUD

db_session = get_db_session()


class SubjectCommentCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, SubjectComment)

    def create(self, data: dict = {}) -> SubjectComment:
        subject: Optional[SubjectComment] = SubjectCRUD(db_session).get_by_uuid(
            data["subject_uuid"]
        )
        if not subject:
            raise ApiException(NOT_FOUND_OBJ_MATCHING_UUID(Subject))
        return super().create(data)

    def update(self, obj: SubjectComment, data: dict = {}) -> SubjectComment:
        subject: Optional[SubjectComment] = SubjectCRUD(db_session).get_by_uuid(
            data["subject_uuid"]
        )
        if not subject:
            raise ApiException(NOT_FOUND_OBJ_MATCHING_UUID(Subject))
        return super().update(obj, data)
