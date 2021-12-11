from sqlalchemy.orm import scoped_session

from ..models import TeacherComment
from .base import BaseCRUD


class TeacherCommentCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, TeacherComment)
