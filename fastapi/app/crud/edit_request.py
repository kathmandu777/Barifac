from typing import List
from uuid import UUID

from app.core.exceptions import ApiException, NotFoundObjectMatchingUuid, create_error
from app.db.database import get_db_session
from sqlalchemy.orm import scoped_session

from ..models import EditRequest, Evaluation, Subject
from .base import BaseCRUD
from .evaluation import EvaluationCRUD
from .subject import SubjectCRUD

db_session = get_db_session()


class EditRequestCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, EditRequest)

    def gets_by_user_uuid(self, user_uuid: UUID) -> List[EditRequest]:
        return self.get_query().filter_by(user_uuid=user_uuid).all()

    def create(self, data: dict = {}) -> EditRequest:
        if not ((data["subject_uuid"] is None) ^ (data["evaluation_uuid"] is None)):
            raise ApiException(create_error("Specify only one foreign key."))
        if (
            data["subject_uuid"] is not None
            and SubjectCRUD(db_session).get_by_uuid(data["subject_uuid"]) is None
        ):
            raise ApiException(NotFoundObjectMatchingUuid(Subject))
        if (
            data["evaluation_uuid"] is not None
            and EvaluationCRUD(db_session).get_by_uuid(data["evaluation_uuid"]) is None
        ):
            raise ApiException(NotFoundObjectMatchingUuid(Evaluation))
        return super().create(data)

    def update(self, uuid: UUID, data: dict = {}) -> EditRequest:
        obj = self.get_by_uuid(uuid)
        if obj is None:
            raise ApiException(NotFoundObjectMatchingUuid(EditRequest))

        if not ((data["subject_uuid"] is None) ^ (data["evaluation_uuid"] is None)):
            raise ApiException(create_error("Specify only one foreign key."))

        if (
            data["subject_uuid"] is not None
            and SubjectCRUD(db_session).get_by_uuid(data["subject_uuid"]) is None
        ):
            raise ApiException(NotFoundObjectMatchingUuid(Subject))
        if (
            data["evaluation_uuid"] is not None
            and EvaluationCRUD(db_session).get_by_uuid(data["evaluation_uuid"]) is None
        ):
            raise ApiException(NotFoundObjectMatchingUuid(Evaluation))
        return super().update(uuid, data)
