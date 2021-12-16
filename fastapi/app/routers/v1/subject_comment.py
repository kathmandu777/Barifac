from typing import List, Optional
from uuid import UUID

from app.api.v1 import SubjectCommentAPI
from app.dependencies import login_required
from app.models import SubjectComment
from app.schemas import (
    CreateSubjectCommentSchema,
    ReadSubjectCommentSchema,
    UpdateSubjectCommentSchema,
)

from fastapi import APIRouter, Depends, Request

subject_comment_router = APIRouter()


@subject_comment_router.get("/", response_model=List[ReadSubjectCommentSchema])
async def gets(
    request: Request,
    subject_uuid: Optional[UUID] = None,
    user_uuid: Optional[UUID] = None,
) -> List[SubjectComment]:
    return SubjectCommentAPI.gets(request, subject_uuid, user_uuid)


@subject_comment_router.get("/{uuid}", response_model=ReadSubjectCommentSchema)
async def get(request: Request, uuid: UUID) -> SubjectComment:
    return SubjectCommentAPI.get(request, uuid)


@subject_comment_router.post(
    "/",
    response_model=ReadSubjectCommentSchema,
    dependencies=[Depends(login_required)],
)
async def create(
    request: Request, schema: CreateSubjectCommentSchema
) -> SubjectComment:
    return SubjectCommentAPI.create(request, schema)


@subject_comment_router.put(
    "/{uuid}",
    response_model=ReadSubjectCommentSchema,
    dependencies=[Depends(login_required)],
)
async def update(
    request: Request,
    uuid: UUID,
    schema: UpdateSubjectCommentSchema,
) -> SubjectComment:
    return SubjectCommentAPI.update(request, uuid, schema)


@subject_comment_router.delete("/{uuid}", dependencies=[Depends(login_required)])
async def delete(request: Request, uuid: UUID) -> None:
    return SubjectCommentAPI.delete(request, uuid)
