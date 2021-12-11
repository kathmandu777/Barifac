from sqlalchemy.orm import scoped_session

from ..models import SubjectComment
from .base import BaseCRUD


class SubjectCommentCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, SubjectComment)
