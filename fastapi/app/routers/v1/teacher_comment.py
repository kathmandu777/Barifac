from typing import List, Optional
from uuid import UUID

from app.api.v1 import TeacherCommentAPI
from app.dependencies import login_required
from app.models import TeacherComment
from app.schemas import (
    CreateTeacherCommentSchema,
    ReadTeacherCommentSchema,
    UpdateTeacherCommentSchema,
)

from fastapi import APIRouter, Depends, Request

teacher_comment_router = APIRouter()


@teacher_comment_router.get("/", response_model=List[ReadTeacherCommentSchema])
async def gets(
    request: Request,
    teacher_uuid: Optional[UUID] = None,
    user_uuid: Optional[UUID] = None,
) -> List[TeacherComment]:
    return TeacherCommentAPI.gets(request, teacher_uuid, user_uuid)


@teacher_comment_router.get("/{uuid}", response_model=ReadTeacherCommentSchema)
async def get(request: Request, uuid: UUID) -> TeacherComment:
    return TeacherCommentAPI.get(request, uuid)


@teacher_comment_router.post(
    "/",
    response_model=ReadTeacherCommentSchema,
    dependencies=[Depends(login_required)],
)
async def create(
    request: Request, schema: CreateTeacherCommentSchema
) -> TeacherComment:
    return TeacherCommentAPI.create(request, schema)


@teacher_comment_router.put(
    "/{uuid}",
    response_model=ReadTeacherCommentSchema,
    dependencies=[Depends(login_required)],
)
async def update(
    request: Request,
    uuid: UUID,
    schema: UpdateTeacherCommentSchema,
) -> TeacherComment:
    return TeacherCommentAPI.update(request, uuid, schema)


@teacher_comment_router.delete("/{uuid}", dependencies=[Depends(login_required)])
async def delete(request: Request, uuid: UUID) -> None:
    return TeacherCommentAPI.delete(request, uuid)
