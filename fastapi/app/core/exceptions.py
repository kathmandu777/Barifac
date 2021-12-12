import sys
from typing import Type, TypeVar, Union

from fastapi import HTTPException, status


class BaseError:
    code: int = status.HTTP_400_BAD_REQUEST
    detail: str = "Bad Request"


class FAILURE_LOGIN(BaseError):
    detail = "Failure login"


class INVALID_EMAIL_OR_PASSWORD(BaseError):
    detail = "email or password was incorrect."


class INVALID_TOKEN(BaseError):
    code = status.HTTP_401_UNAUTHORIZED
    detail = "Invalid token"


class EXPIRED_TOKEN(BaseError):
    code = status.HTTP_401_UNAUTHORIZED
    detail = "Token was expired."


class UID_OR_PASSWORD_MUST_BE_SET(BaseError):
    detail = "uid or password must be set."


BaseErrorInstanceType = TypeVar("BaseErrorInstanceType", bound=BaseError)


class NOT_FOUND_OBJ_MATCHING_UUID(BaseError):
    def __init__(self, cls):
        self.detail = f"{cls.__name__} matching the given uuid was not found."


class SAME_OBJECT_ALREADY_EXISTS(BaseError):
    detail = "Same object already exists."


class PermissionDenied(BaseError):
    detail = "Permission denied."
    code = status.HTTP_403_FORBIDDEN


def create_error(
    error_msg: str, error_code: int = status.HTTP_400_BAD_REQUEST
) -> Type[BaseError]:
    class Error(BaseError):
        detail = error_msg
        code = error_code

    return Error


class ApiException(HTTPException):
    def __init__(self, *errors: Union[Type[BaseError], BaseErrorInstanceType]) -> None:
        self.status_code = status.HTTP_400_BAD_REQUEST
        self.detail = [
            {
                "error_code": str(error.code),
                "error_msg": error.detail,
            }
            for error in list(errors)
        ]
        super().__init__(self.status_code, self.detail)


class SystemException(HTTPException):
    def __init__(self, e: Type[Exception]) -> None:
        _, value, _ = sys.exc_info()
        self.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        self.detail = [
            {
                "error_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "error_msg": str(value),
            }
        ]
        super().__init__(self.status_code, self.detail)
