from sqlalchemy.orm import scoped_session

from ..models import Score
from .base import BaseCRUD


class ScoreCRUD(BaseCRUD):
    def __init__(self, db_session: scoped_session):
        super().__init__(db_session, Score)
