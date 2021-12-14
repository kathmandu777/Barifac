from typing import List, Optional
from uuid import UUID

from app.api.v1 import SchoolAPI
from app.dependencies import admin_required
from app.models import School
from app.schemas import CreateSchoolSchema, ReadSchoolSchema, UpdateSchoolSchema

from fastapi import APIRouter, Depends, Request

school_router = APIRouter()

# TODO: schoolのdeleteなどはadmin_requiredをかける


@school_router.get("/", response_model=List[ReadSchoolSchema])
async def gets(request: Request) -> List[School]:
    return SchoolAPI.gets(request)


@school_router.get("/{uuid}", response_model=ReadSchoolSchema)
async def get(request: Request, uuid: UUID) -> Optional[School]:
    return SchoolAPI.get(request, uuid)


@school_router.post("/", response_model=ReadSchoolSchema)
async def create(request: Request, schema: CreateSchoolSchema) -> School:
    return SchoolAPI.create(request, schema)


@school_router.put(
    "/{uuid}", response_model=ReadSchoolSchema, dependencies=[Depends(admin_required)]
)
async def update(request: Request, uuid: UUID, schema: UpdateSchoolSchema) -> School:
    return SchoolAPI.update(request, uuid, schema)


@school_router.delete("/{uuid}", dependencies=[Depends(admin_required)])
async def delete(request: Request, uuid: UUID) -> None:
    return SchoolAPI.delete(request, uuid)
