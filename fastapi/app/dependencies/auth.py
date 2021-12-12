from app.core.auth import OAuth2PasswordBearer
from app.core.exceptions import INVALID_TOKEN, ApiException, PermissionDenied

from fastapi import Depends, Request

OAUTH2_SCHEMA = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/login")


async def login_required(request: Request, token: str = Depends(OAUTH2_SCHEMA)) -> None:
    if not request.user.is_authenticated:
        raise ApiException(INVALID_TOKEN)


async def admin_required(request: Request, token: str = Depends(OAUTH2_SCHEMA)) -> None:
    if not request.user.is_authenticated:
        raise ApiException(INVALID_TOKEN)
    if not request.user.is_admin:
        raise ApiException(PermissionDenied)
