from typing import List, Optional
from uuid import UUID

from app.crud import DepartmentCRUD
from app.models import Department
from app.schemas import CreateDepartmentSchema, UpdateDepartmentSchema

from fastapi import Request


class DepartmentAPI:
    @classmethod
    def gets(cls, request: Request, school_uuid: Optional[UUID]) -> List[Department]:
        if school_uuid:
            return DepartmentCRUD(request.state.db_session).gets_by_school_uuid(
                school_uuid
            )
        return DepartmentCRUD(request.state.db_session).gets()

    @classmethod
    def get(cls, request: Request, uuid: UUID) -> Optional[Department]:
        return DepartmentCRUD(request.state.db_session).get_by_uuid(uuid)

    @classmethod
    def create(cls, request: Request, schema: CreateDepartmentSchema) -> Department:
        return DepartmentCRUD(request.state.db_session).create(schema.dict())

    @classmethod
    def update(
        cls, request: Request, uuid: UUID, schema: UpdateDepartmentSchema
    ) -> Department:
        return DepartmentCRUD(request.state.db_session).update(uuid, schema.dict())

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        return DepartmentCRUD(request.state.db_session).delete_by_uuid(uuid)
