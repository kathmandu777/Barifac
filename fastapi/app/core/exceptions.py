import sys
from typing import Type

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


class ApiException(HTTPException):
    def __init__(self, *errors: Type[BaseError]) -> None:
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
