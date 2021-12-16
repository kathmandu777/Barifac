from typing import List, Optional
from uuid import UUID

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

    def gets_by_teacher_uuid(self, teacher_uuid: UUID) -> List[TeacherComment]:
        return self.get_query().filter_by(teacher_uuid=teacher_uuid).all()

    def create(self, data: dict = {}) -> TeacherComment:
        teacher: Optional[TeacherComment] = TeacherCRUD(db_session).get_by_uuid(
            data["teacher_uuid"]
        )
        if not teacher:
            raise ApiException(NotFoundObjectMatchingUuid(Teacher))
        return super().create(data)

    def update(self, uuid: UUID, data: dict = {}) -> TeacherComment:
        obj = self.get_by_uuid(uuid)
        if obj is None:
            raise ApiException(NotFoundObjectMatchingUuid(TeacherComment))

        teacher: Optional[TeacherComment] = TeacherCRUD(db_session).get_by_uuid(
            data["teacher_uuid"]
        )
        if not teacher:
            raise ApiException(NotFoundObjectMatchingUuid(Teacher))
        return super().update(obj, data)
