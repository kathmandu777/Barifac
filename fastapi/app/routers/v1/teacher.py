from typing import List, Optional
from uuid import UUID

from app.api.v1 import TeacherAPI
from app.dependencies import admin_required
from app.models import Teacher
from app.schemas import CreateTeacherSchema, ReadTeacherSchema, UpdateTeacherSchema

from fastapi import APIRouter, Depends, Request

teacher_router = APIRouter()


@teacher_router.get("/", response_model=List[ReadTeacherSchema])
async def gets(request: Request, school_uuid: Optional[UUID] = None) -> List[Teacher]:
    return TeacherAPI.gets(request, school_uuid)


@teacher_router.get("/{uuid}", response_model=ReadTeacherSchema)
async def get(request: Request, uuid: UUID) -> Optional[Teacher]:
    return TeacherAPI.get(request, uuid)


@teacher_router.post("/", response_model=ReadTeacherSchema)
async def create(request: Request, schema: CreateTeacherSchema) -> Teacher:
    return TeacherAPI.create(request, schema)


@teacher_router.put(
    "/{uuid}", response_model=ReadTeacherSchema, dependencies=[Depends(admin_required)]
)
async def update(request: Request, uuid: UUID, schema: UpdateTeacherSchema) -> Teacher:
    return TeacherAPI.update(request, uuid, schema)


@teacher_router.delete("/{uuid}", dependencies=[Depends(admin_required)])
async def delete(request: Request, uuid: UUID) -> None:
    return TeacherAPI.delete(request, uuid)
