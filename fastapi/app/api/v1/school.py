from typing import List, Optional
from uuid import UUID

from app.core.exceptions import ApiException, create_error
from app.crud import SchoolCRUD
from app.schemas import BaseSchoolSchema, ReadSchoolSchema

from fastapi import Request


class SchoolAPI:
    @classmethod
    def gets(cls, request: Request) -> List[ReadSchoolSchema]:
        return SchoolCRUD(request.state.db_session).gets()

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Optional[ReadSchoolSchema]:
        return SchoolCRUD(request.state.db_session).get_by_uuid(uuid)

    @classmethod
    def create(cls, request: Request, schema: BaseSchoolSchema) -> ReadSchoolSchema:
        return SchoolCRUD(request.state.db_session).create(schema.dict())

    @classmethod
    def update(
        cls, request: Request, uuid: UUID, schema: BaseSchoolSchema
    ) -> ReadSchoolSchema:
        obj = SchoolCRUD(request.state.db_session).get_by_uuid(uuid)
        if not obj:
            raise ApiException(
                create_error("School matching the given UUID was not found")
            )
        return SchoolCRUD(request.state.db_session).update(obj, schema.dict())

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        return SchoolCRUD(request.state.db_session).delete_by_uuid(uuid)
