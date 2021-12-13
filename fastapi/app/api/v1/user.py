from typing import Optional

from app.core.exceptions import ApiException, NotFoundObjectMatchingUuid
from app.crud import UserCRUD
from app.models import User
from app.schemas import CreateUserSchema, UpdateUserSchema

from fastapi import Request


class UserAPI:
    @classmethod
    def get(cls, request: Request) -> Optional[User]:
        return UserCRUD(request.state.db_session).get_by_uuid(request.user.uuid)

    @classmethod
    def create(cls, request: Request, schema: CreateUserSchema) -> User:
        return UserCRUD(request.state.db_session).create(schema.dict())

    @classmethod
    def update(cls, request: Request, schema: UpdateUserSchema) -> User:
        obj = UserCRUD(request.state.db_session).get_by_uuid(request.user.uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(User))

        # is_adminをAPIで制御できるようにする場合は、一般ユーザーが変更できないようにする
        # data = schema.dict()
        # if not request.user.is_admin:
        #     data["is_admin"] = False
        return UserCRUD(request.state.db_session).update(obj, schema.dict())

    @classmethod
    def delete(cls, request: Request) -> None:
        obj = UserCRUD(request.state.db_session).get_by_uuid(request.user.uuid)
        if not obj:
            raise ApiException(NotFoundObjectMatchingUuid(User))
        return UserCRUD(request.state.db_session).delete_by_uuid(request.user.uuid)
