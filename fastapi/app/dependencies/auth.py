from app.core.exceptions import ApiException, InvalidToken, PermissionDenied

from fastapi import Request


async def login_required(request: Request) -> None:
    if not request.user.is_authenticated:
        raise ApiException(InvalidToken)


async def admin_required(request: Request) -> None:
    if not request.user.is_authenticated:
        raise ApiException(InvalidToken)
    if not request.user.is_admin:
        raise ApiException(PermissionDenied)
