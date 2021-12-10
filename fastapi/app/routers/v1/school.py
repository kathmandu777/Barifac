from typing import List, Optional
from uuid import UUID

from app.api.v1 import SchoolAPI
from app.schemas import CreateSchoolSchema, ReadSchoolSchema, UpdateSchoolSchema

from fastapi import APIRouter, Request

school_router = APIRouter()

# TODO: schoolのdeleteなどはadmin_requiredをかける


@school_router.get("/", response_model=List[ReadSchoolSchema])
async def gets(request: Request) -> List[ReadSchoolSchema]:
    return SchoolAPI.gets(request)


@school_router.get("/{uuid}", response_model=ReadSchoolSchema)
async def get(request: Request, uuid: UUID) -> Optional[ReadSchoolSchema]:
    return SchoolAPI.get(request, uuid)


@school_router.post("/", response_model=ReadSchoolSchema)
async def create(request: Request, schema: CreateSchoolSchema) -> CreateSchoolSchema:
    return SchoolAPI.create(request, schema)


@school_router.put("/{uuid}/", response_model=ReadSchoolSchema)
async def update(
    request: Request, uuid: UUID, schema: UpdateSchoolSchema
) -> UpdateSchoolSchema:
    return SchoolAPI.update(request, uuid, schema)


@school_router.delete("/{uuid}/")
async def delete(request: Request, uuid: UUID) -> None:
    return SchoolAPI.delete(request, uuid)
