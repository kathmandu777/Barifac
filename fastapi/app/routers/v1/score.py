from typing import List, Optional
from uuid import UUID

from app.api.v1 import ScoreAPI
from app.dependencies import login_required
from app.models import Score
from app.schemas import CreateScoreSchema, ReadScoreSchema, UpdateScoreSchema

from fastapi import APIRouter, Depends, Request

score_router = APIRouter()


@score_router.get(
    "/",
    response_model=List[ReadScoreSchema],
    dependencies=[Depends(login_required)],
)
async def gets(request: Request) -> List[Score]:
    return ScoreAPI.gets(request)


@score_router.get(
    "/{uuid}",
    response_model=ReadScoreSchema,
    dependencies=[Depends(login_required)],
)
async def get(request: Request, uuid: UUID) -> Optional[Score]:
    return ScoreAPI.get(request, uuid)


@score_router.post(
    "/", response_model=ReadScoreSchema, dependencies=[Depends(login_required)]
)
async def create(request: Request, schema: CreateScoreSchema) -> Score:
    return ScoreAPI.create(request, schema)


@score_router.put(
    "/{uuid}",
    response_model=ReadScoreSchema,
    dependencies=[Depends(login_required)],
)
async def update(
    request: Request,
    uuid: UUID,
    schema: UpdateScoreSchema,
) -> Score:
    return ScoreAPI.update(request, uuid, schema)


@score_router.delete("/{uuid}", dependencies=[Depends(login_required)])
async def delete(request: Request, uuid: UUID) -> None:
    return ScoreAPI.delete(request, uuid)
