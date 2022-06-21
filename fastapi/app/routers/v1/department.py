from typing import Optional
from uuid import UUID

from app.api.v1 import DepartmentAPI
from app.dependencies import admin_required
from app.models import Department
from app.schemas import (
    CreateDepartmentSchema,
    ReadDepartmentSchema,
    UpdateDepartmentSchema,
)
from fastapi_pagination import Page

from fastapi import APIRouter, Depends, Request

department_router = APIRouter()


@department_router.get("/", response_model=Page[ReadDepartmentSchema])
async def gets(
    request: Request, school_uuid: Optional[UUID] = None
) -> Page[Department]:
    return DepartmentAPI.gets(request, school_uuid)


@department_router.get("/{uuid}", response_model=ReadDepartmentSchema)
async def get(request: Request, uuid: UUID) -> Optional[Department]:
    return DepartmentAPI.get(request, uuid)


@department_router.post("/", response_model=ReadDepartmentSchema)
async def create(request: Request, schema: CreateDepartmentSchema) -> Department:
    return DepartmentAPI.create(request, schema)


@department_router.put(
    "/{uuid}",
    response_model=ReadDepartmentSchema,
    dependencies=[Depends(admin_required)],
)
async def update(
    request: Request, uuid: UUID, schema: UpdateDepartmentSchema
) -> Department:
    return DepartmentAPI.update(request, uuid, schema)


@department_router.delete("/{uuid}", dependencies=[Depends(admin_required)])
async def delete(request: Request, uuid: UUID) -> None:
    return DepartmentAPI.delete(request, uuid)
