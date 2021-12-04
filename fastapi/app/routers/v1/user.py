from typing import List
from uuid import UUID

from app.api.v1 import UserAPI
from app.dependencies import login_required
from app.schemas import CreateUserSchema, ReadUserSchema, UpdateUserSchema

from fastapi import APIRouter, Depends, Request

user_router = APIRouter()

# TODO: user list 廃止


@user_router.get("/", response_model=List[ReadUserSchema])
async def gets(request: Request) -> List[ReadUserSchema]:
    return UserAPI.gets(request)


@user_router.get(
    "/{uuid}", response_model=ReadUserSchema, dependencies=[Depends(login_required)]
)
async def get(request: Request, uuid: UUID) -> ReadUserSchema:
    return UserAPI.get(request, uuid)


@user_router.post("/", response_model=ReadUserSchema)
async def create(request: Request, schema: CreateUserSchema) -> CreateUserSchema:
    return UserAPI.create(request, schema)


@user_router.put(
    "/{uuid}/", response_model=ReadUserSchema, dependencies=[Depends(login_required)]
)
async def update(
    request: Request, uuid: UUID, schema: UpdateUserSchema
) -> UpdateUserSchema:
    return UserAPI.update(request, uuid, schema)


@user_router.delete("/{uuid}/", dependencies=[Depends(login_required)])
async def delete(request: Request, uuid: UUID) -> None:
    return UserAPI.delete(request, uuid)
