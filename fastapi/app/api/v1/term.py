from typing import List, Optional
from uuid import UUID

from app.crud import TermCRUD
from app.models import SemesterEnum, Term
from app.schemas import CreateTermSchema, UpdateTermSchema

from fastapi import Request


class TermAPI:
    @classmethod
    def gets(
        cls,
        request: Request,
        academic_year: Optional[int] = None,
        semester: Optional[SemesterEnum] = None,
    ) -> List[Term]:
        return TermCRUD(request.state.db_session).gets_by_year_and_semester(
            academic_year, semester
        )

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Optional[Term]:
        return TermCRUD(request.state.db_session).get_by_uuid(uuid)

    @classmethod
    def create(cls, request: Request, schema: CreateTermSchema) -> Term:
        return TermCRUD(request.state.db_session).create(schema.dict())

    @classmethod
    def update(cls, request: Request, uuid: UUID, schema: UpdateTermSchema) -> Term:
        return TermCRUD(request.state.db_session).update(uuid, schema.dict())

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        return TermCRUD(request.state.db_session).delete_by_uuid(uuid)
