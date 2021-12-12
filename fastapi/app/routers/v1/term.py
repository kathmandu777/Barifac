from typing import List, Optional
from uuid import UUID

from app.api.v1 import TermAPI
from app.models import Term
from app.schemas import CreateTermSchema, ReadTermSchema, UpdateTermSchema

from fastapi import APIRouter, Request

term_router = APIRouter()


@term_router.get("/", response_model=List[ReadTermSchema])
async def gets(request: Request) -> List[Term]:
    return TermAPI.gets(request)


@term_router.get("/{uuid}", response_model=ReadTermSchema)
async def get(request: Request, uuid: UUID) -> Optional[Term]:
    return TermAPI.get(request, uuid)


@term_router.post("/", response_model=ReadTermSchema)
async def create(request: Request, schema: CreateTermSchema) -> Term:
    return TermAPI.create(request, schema)


@term_router.put("/{uuid}", response_model=ReadTermSchema)
async def update(request: Request, uuid: UUID, schema: UpdateTermSchema) -> Term:
    return TermAPI.update(request, uuid, schema)


@term_router.delete("/{uuid}")
async def delete(request: Request, uuid: UUID) -> None:
    return TermAPI.delete(request, uuid)
