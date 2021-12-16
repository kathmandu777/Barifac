from typing import List, Optional
from uuid import UUID

from app.api.v1 import TermAPI
from app.dependencies import admin_required
from app.models import SemesterEnum, Term
from app.schemas import CreateTermSchema, ReadTermSchema, UpdateTermSchema

from fastapi import APIRouter, Depends, Request

term_router = APIRouter()


@term_router.get("/", response_model=List[ReadTermSchema])
async def gets(
    request: Request,
    academic_year: Optional[int] = None,
    semester: Optional[SemesterEnum] = None,
) -> List[Term]:
    return TermAPI.gets(request, academic_year, semester)


@term_router.get("/{uuid}", response_model=ReadTermSchema)
async def get(request: Request, uuid: UUID) -> Optional[Term]:
    return TermAPI.get(request, uuid)


@term_router.post("/", response_model=ReadTermSchema)
async def create(request: Request, schema: CreateTermSchema) -> Term:
    return TermAPI.create(request, schema)


@term_router.put(
    "/{uuid}", response_model=ReadTermSchema, dependencies=[Depends(admin_required)]
)
async def update(request: Request, uuid: UUID, schema: UpdateTermSchema) -> Term:
    return TermAPI.update(request, uuid, schema)


@term_router.delete("/{uuid}", dependencies=[Depends(admin_required)])
async def delete(request: Request, uuid: UUID) -> None:
    return TermAPI.delete(request, uuid)
