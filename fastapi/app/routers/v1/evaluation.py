from typing import List, Optional
from uuid import UUID

from app.api.v1 import EvaluationAPI
from app.dependencies import admin_required
from app.models import Evaluation
from app.schemas import (
    CreateEvaluationSchema,
    ReadEvaluationSchema,
    UpdateEvaluationSchema,
)

from fastapi import APIRouter, Depends, Request

evaluation_router = APIRouter()


@evaluation_router.get("/", response_model=List[ReadEvaluationSchema])
async def gets(
    request: Request, subject_uuid: Optional[UUID] = None
) -> List[Evaluation]:
    return EvaluationAPI.gets(request, subject_uuid)


@evaluation_router.get("/{uuid}", response_model=ReadEvaluationSchema)
async def get(request: Request, uuid: UUID) -> Optional[Evaluation]:
    return EvaluationAPI.get(request, uuid)


@evaluation_router.post("/", response_model=ReadEvaluationSchema)
async def create(request: Request, schema: CreateEvaluationSchema) -> Evaluation:
    return EvaluationAPI.create(request, schema)


@evaluation_router.put(
    "/{uuid}",
    response_model=ReadEvaluationSchema,
    dependencies=[Depends(admin_required)],
)
async def update(
    request: Request, uuid: UUID, schema: UpdateEvaluationSchema
) -> Evaluation:
    return EvaluationAPI.update(request, uuid, schema)


@evaluation_router.delete("/{uuid}", dependencies=[Depends(admin_required)])
async def delete(request: Request, uuid: UUID) -> None:
    return EvaluationAPI.delete(request, uuid)
