from typing import List, Optional
from uuid import UUID

from app.core.exceptions import ApiException, create_error
from app.crud import UserCRUD
from app.schemas import CreateUserSchema, ReadUserSchema, UpdateUserSchema

from fastapi import Request


class UserAPI:
    @classmethod
    def gets(cls, request: Request) -> List[ReadUserSchema]:
        return UserCRUD(request.state.db_session).gets()

    @classmethod
    def get(cls, request: Request, user_id: UUID) -> Optional[ReadUserSchema]:
        return UserCRUD(request.state.db_session).get_by_uuid(user_id)

    @classmethod
    def create(cls, request: Request, schema: CreateUserSchema) -> CreateUserSchema:
        return UserCRUD(request.state.db_session).create(schema.dict())

    @classmethod
    def update(
        cls, request: Request, uuid: UUID, schema: UpdateUserSchema
    ) -> UpdateUserSchema:
        obj = UserCRUD(request.state.db_session).get_by_uuid(uuid)
        if not obj:
            raise ApiException(
                create_error("User matching the given UUID was not found")
            )
        return UserCRUD(request.state.db_session).update(obj, schema.dict())

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        return UserCRUD(request.state.db_session).delete_by_uuid(uuid)
