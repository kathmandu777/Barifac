import sys


from fastapi import HTTPException, status


class BaseError:
    code: int = status.HTTP_400_BAD_REQUEST
    detail: str = "Bad Request"


class FAILURE_LOGIN(BaseError):
    detail = "Failure login"


class ApiException(HTTPException):
    def __init__(self, *errors: BaseError) -> None:
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
    def __init__(self, e: Exception) -> None:
        _, value, _ = sys.exc_info()
        self.status_code = status.HTTP_500_INTERNAL_SERVER_ERROR
        self.detail = [
            {
                "error_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
                "error_msg": str(value),
            }
        ]
        super().__init__(self.status_code, self.detail)
