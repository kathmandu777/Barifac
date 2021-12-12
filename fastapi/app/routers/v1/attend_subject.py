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


@attend_subject_router.get(
    "/",
    response_model=List[ReadAttendSubjectSchema],
    dependencies=[Depends(login_required)],
)
async def gets(request: Request) -> List[AttendSubject]:
    return AttendSubjectAPI.gets(request)


@attend_subject_router.get(
    "/{uuid}",
    response_model=ReadAttendSubjectSchema,
    dependencies=[Depends(login_required)],
)
async def get(request: Request, uuid: UUID) -> Optional[AttendSubject]:
    return AttendSubjectAPI.get(request, uuid)


@attend_subject_router.post(
    "/", response_model=ReadAttendSubjectSchema, dependencies=[Depends(login_required)]
)
async def create(request: Request, schema: CreateAttendSubjectSchema) -> AttendSubject:
    return AttendSubjectAPI.create(request, schema)


@attend_subject_router.put(
    "/{uuid}/",
    response_model=ReadAttendSubjectSchema,
    dependencies=[Depends(login_required)],
)
async def update(
    request: Request,
    uuid: UUID,
    schema: UpdateAttendSubjectSchema,
) -> AttendSubject:
    return AttendSubjectAPI.update(request, uuid, schema)


@attend_subject_router.delete("/{uuid}/", dependencies=[Depends(login_required)])
async def delete(request: Request, uuid: UUID) -> None:
    return AttendSubjectAPI.delete(request, uuid)
