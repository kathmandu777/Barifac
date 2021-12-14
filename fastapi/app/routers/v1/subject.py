from typing import List, Optional
from uuid import UUID

from app.api.v1 import SubjectAPI
from app.dependencies import admin_required
from app.models import Subject
from app.schemas import CreateSubjectSchema, ReadSubjectSchema, UpdateSubjectSchema

from fastapi import APIRouter, Depends, Request

subject_router = APIRouter()


@subject_router.get("/", response_model=List[ReadSubjectSchema])
async def gets(request: Request, school_uuid: Optional[UUID] = None) -> List[Subject]:
    return SubjectAPI.gets(request, school_uuid)


@subject_router.get("/{uuid}", response_model=ReadSubjectSchema)
async def get(request: Request, uuid: UUID) -> Optional[Subject]:
    return SubjectAPI.get(request, uuid)


@subject_router.post("/", response_model=ReadSubjectSchema)
async def create(request: Request, schema: CreateSubjectSchema) -> Subject:
    return SubjectAPI.create(request, schema)


@subject_router.put(
    "/{uuid}", response_model=ReadSubjectSchema, dependencies=[Depends(admin_required)]
)
async def update(request: Request, uuid: UUID, schema: UpdateSubjectSchema) -> Subject:
    return SubjectAPI.update(request, uuid, schema)


@subject_router.delete("/{uuid}", dependencies=[Depends(admin_required)])
async def delete(request: Request, uuid: UUID) -> None:
    return SubjectAPI.delete(request, uuid)
