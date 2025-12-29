from .base import AppHTTPException


class UnauthorizedException(AppHTTPException):
    def __init__(self, message="Unauthorized"):
        super().__init__(
            status_code=401,
            message=message,
            error_code="UNAUTHORIZED"
        )

class ForbiddenException(AppHTTPException):
    def __init__(self, message="Forbidden"):
        super().__init__(status_code=403, message=message, error_code="FORBIDDEN")

class NotFoundException(AppHTTPException):
    def __init__(self, message="Not Found"):
        super().__init__(status_code=404, message=message, error_code="NOT_FOUND")

class BadRequestException(AppHTTPException):
    def __init__(self, message="Bad Request"):
        super().__init__(status_code=400, message=message, error_code="BAD_REQUEST")