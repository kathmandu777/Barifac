from typing import List, Optional
from uuid import UUID

from app.api.v1 import UserAPI
from app.dependencies import login_required
from app.models import User
from app.schemas import CreateUserSchema, ReadUserSchema, UpdateUserSchema

from fastapi import APIRouter, Depends, Request

user_router = APIRouter()

# TODO: user list 廃止


@user_router.get("/", response_model=List[ReadUserSchema])
async def gets(request: Request) -> List[User]:
    return UserAPI.gets(request)


@user_router.get(
    "/{uuid}", response_model=ReadUserSchema, dependencies=[Depends(login_required)]
)
async def get(request: Request, uuid: UUID) -> Optional[User]:
    return UserAPI.get(request, uuid)


@user_router.post("/", response_model=ReadUserSchema)
async def create(request: Request, schema: CreateUserSchema) -> User:
    return UserAPI.create(request, schema)


@user_router.put(
    "/{uuid}/", response_model=ReadUserSchema, dependencies=[Depends(login_required)]
)
async def update(request: Request, uuid: UUID, schema: UpdateUserSchema) -> User:
    return UserAPI.update(request, uuid, schema)


@user_router.delete("/{uuid}/", dependencies=[Depends(login_required)])
async def delete(request: Request, uuid: UUID) -> None:
    return UserAPI.delete(request, uuid)
