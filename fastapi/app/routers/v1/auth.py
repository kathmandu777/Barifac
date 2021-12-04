from app.api.v1.auth import AuthAPI
from app.schemas.auth import AuthRequestSchema

from fastapi import APIRouter, Depends, Request

auth_router = APIRouter()


@auth_router.post("/login/")
async def login(request: Request, schema: AuthRequestSchema = Depends()):
    return AuthAPI.login(request, schema)
