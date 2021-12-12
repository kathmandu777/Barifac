from typing import List, Optional
from uuid import UUID

from app.core.exceptions import ApiException, NotFoundObjectMatchingUuid
from app.crud import TermCRUD
from app.models import Term
from app.schemas import CreateTermSchema, UpdateTermSchema

from fastapi import Request


class TermAPI:
    @classmethod
    def gets(cls, request: Request) -> List[Term]:
        return TermCRUD(request.state.db_session).gets()

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Optional[Term]:
        return TermCRUD(request.state.db_session).get_by_uuid(uuid)

    @classmethod
    def create(cls, request: Request, schema: CreateTermSchema) -> Term:
        return TermCRUD(request.state.db_session).create(schema.dict())

    @classmethod
    def update(cls, request: Request, uuid: UUID, schema: UpdateTermSchema) -> Term:
        obj = TermCRUD(request.state.db_session).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(Term))
        return TermCRUD(request.state.db_session).update(obj, schema.dict())

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        return TermCRUD(request.state.db_session).delete_by_uuid(uuid)
