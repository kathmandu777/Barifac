from typing import Optional
from uuid import UUID

from app.crud import SchoolCRUD
from app.models import School
from app.schemas import CreateSchoolSchema, UpdateSchoolSchema
from fastapi_pagination import Page, paginate

from fastapi import Request


class SchoolAPI:
    @classmethod
    def gets(cls, request: Request) -> Page[School]:
        return paginate(SchoolCRUD(request.state.db_session).gets())

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Optional[School]:
        return SchoolCRUD(request.state.db_session).get_by_uuid(uuid)

    @classmethod
    def create(cls, request: Request, schema: CreateSchoolSchema) -> School:
        return SchoolCRUD(request.state.db_session).create(schema.dict())

    @classmethod
    def update(cls, request: Request, uuid: UUID, schema: UpdateSchoolSchema) -> School:
        return SchoolCRUD(request.state.db_session).update(uuid, schema.dict())

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        return SchoolCRUD(request.state.db_session).delete_by_uuid(uuid)
