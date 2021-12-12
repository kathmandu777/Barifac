from typing import List, Optional
from uuid import UUID

from app.core.exceptions import ApiException, NotFoundObjectMatchingUuid
from app.crud import UserCRUD
from app.models import User
from app.schemas import CreateUserSchema, UpdateUserSchema

from fastapi import Request


class UserAPI:
    @classmethod
    def gets(cls, request: Request) -> List[User]:
        return UserCRUD(request.state.db_session).gets()

    @classmethod
    def get(cls, request: Request, user_id: UUID) -> Optional[User]:
        return UserCRUD(request.state.db_session).get_by_uuid(user_id)

    @classmethod
    def create(cls, request: Request, schema: CreateUserSchema) -> User:
        return UserCRUD(request.state.db_session).create(schema.dict())

    @classmethod
    def update(cls, request: Request, uuid: UUID, schema: UpdateUserSchema) -> User:
        obj = UserCRUD(request.state.db_session).get_by_uuid(uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(User))
        return UserCRUD(request.state.db_session).update(obj, schema.dict())

    @classmethod
    def delete(cls, request: Request, uuid: UUID) -> None:
        return UserCRUD(request.state.db_session).delete_by_uuid(uuid)
