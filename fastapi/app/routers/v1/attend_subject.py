from typing import List, Optional
from uuid import UUID

from app.api.v1 import AttendSubjectAPI
from app.dependencies import login_required
from app.models import AttendSubject
from app.schemas import (
    CreateAttendSubjectSchema,
    ReadAttendSubjectSchema,
    UpdateAttendSubjectSchema,
)

from fastapi import APIRouter, Depends, Request

attend_subject_router = APIRouter()


@attend_subject_router.get("/", response_model=List[ReadAttendSubjectSchema])
async def gets(request: Request, _=Depends(login_required)) -> List[AttendSubject]:
    return AttendSubjectAPI.gets(request)


@attend_subject_router.get("/{uuid}", response_model=ReadAttendSubjectSchema)
async def get(
    request: Request, uuid: UUID, _=Depends(login_required)
) -> Optional[AttendSubject]:
    return AttendSubjectAPI.get(request, uuid)


@attend_subject_router.post("/", response_model=ReadAttendSubjectSchema)
async def create(
    request: Request, schema: CreateAttendSubjectSchema, _=Depends(login_required)
) -> AttendSubject:
    return AttendSubjectAPI.create(request, schema)


@attend_subject_router.put("/{uuid}/", response_model=ReadAttendSubjectSchema)
async def update(
    request: Request,
    uuid: UUID,
    schema: UpdateAttendSubjectSchema,
    _=Depends(login_required),
) -> AttendSubject:
    return AttendSubjectAPI.update(request, uuid, schema)


@attend_subject_router.delete("/{uuid}/")
async def delete(request: Request, uuid: UUID, _=Depends(login_required)) -> None:
    return AttendSubjectAPI.delete(request, uuid)
