from fastapi import Request
from .base import AppHTTPException
from app.utils.response_handler import ResponseHandler
from loguru import logger


async def app_http_exception_handler(request: Request, exc: AppHTTPException):
    """
    Handler for HTTPException and CustomHTTPException.

    It wraps our standardized error payload into a proper
    `JSONResponse` so Starlette/FastAPI receive a valid ASGI response object.
    """
    return ResponseHandler.error_response(
        message=exc.message,
        title=exc.title,
        code=exc.status_code,
        errors={
            "error_code": exc.error_code,
            "details": exc.details,
            "path": request.url.path,
        },
    )


class UnauthorizedException(AppHTTPException):
    def __init__(self, message="Unauthorized"):
        super().__init__(
            status_code=401,
            message=message,
            error_code="UNAUTHORIZED",
            title="Unauthorized",
        )


class ForbiddenException(AppHTTPException):
    def __init__(self, message="Forbidden"):
        super().__init__(
            status_code=403, message=message, error_code="FORBIDDEN", title="Forbidden"
        )


class NotFoundException(AppHTTPException):
    def __init__(self, message="Not Found"):
        super().__init__(
            status_code=404, message=message, error_code="NOT_FOUND", title="Not Found"
        )


class BadRequestException(AppHTTPException):
    def __init__(self, message="Bad Request"):
        super().__init__(
            status_code=400,
            message=message,
            error_code="BAD_REQUEST",
            title="Bad Request",
        )
