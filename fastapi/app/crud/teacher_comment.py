from typing import Optional

from app.core.exceptions import ApiException, NotFoundObjectMatchingUuid
from app.db.database import get_db_session
from sqlalchemy.orm import scoped_session

from ..models import Teacher, TeacherComment
from .base import BaseCRUD
from .teacher import TeacherCRUD

db_session = get_db_session()


class TeacherCommentCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, TeacherComment)

    def create(self, data: dict = {}) -> TeacherComment:
        teacher: Optional[TeacherComment] = TeacherCRUD(db_session).get_by_uuid(
            data["teacher_uuid"]
        )
        if not teacher:
            raise ApiException(NotFoundObjectMatchingUuid(Teacher))
        return super().create(data)

    def update(self, obj: TeacherComment, data: dict = {}) -> TeacherComment:
        teacher: Optional[TeacherComment] = TeacherCRUD(db_session).get_by_uuid(
            data["teacher_uuid"]
        )
        if not teacher:
            raise ApiException(NotFoundObjectMatchingUuid(Teacher))
        return super().update(obj, data)
