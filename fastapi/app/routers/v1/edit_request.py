from typing import Optional
from uuid import UUID

from app.api.v1 import EditRequestAPI
from app.dependencies import login_required
from app.models import EditRequest
from app.schemas import (
    CreateEditRequestSchema,
    ReadEditRequestSchema,
    UpdateEditRequestSchema,
)
from fastapi_pagination import Page

from fastapi import APIRouter, Depends, Request

edit_request_router = APIRouter()


@edit_request_router.get("/", response_model=Page[ReadEditRequestSchema])
async def gets(
    request: Request,
    user_uuid: Optional[UUID] = None,
    subject_uuid: Optional[UUID] = None,
    evaluation_uuid: Optional[UUID] = None,
) -> Page[EditRequest]:
    return EditRequestAPI.gets(request, user_uuid, subject_uuid, evaluation_uuid)


@edit_request_router.get("/{uuid}", response_model=ReadEditRequestSchema)
async def get(request: Request, uuid: UUID) -> Optional[EditRequest]:
    return EditRequestAPI.get(request, uuid)


@edit_request_router.post(
    "/",
    response_model=ReadEditRequestSchema,
    dependencies=[Depends(login_required)],
)
async def create(request: Request, schema: CreateEditRequestSchema) -> EditRequest:
    return EditRequestAPI.create(request, schema)


@edit_request_router.put(
    "/{uuid}",
    response_model=ReadEditRequestSchema,
    dependencies=[Depends(login_required)],
)
async def update(
    request: Request,
    uuid: UUID,
    schema: UpdateEditRequestSchema,
) -> EditRequest:
    return EditRequestAPI.update(request, uuid, schema)


@edit_request_router.delete("/{uuid}", dependencies=[Depends(login_required)])
async def delete(request: Request, uuid: UUID) -> None:
    return EditRequestAPI.delete(request, uuid)
