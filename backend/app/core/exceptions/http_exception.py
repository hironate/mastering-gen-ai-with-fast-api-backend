from fastapi import Request
from loguru import logger

from app.utils.response_handler import ResponseHandler

from .base import AppHTTPException


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
        errors=[{"message": exc.message}],
    )


class UnauthorizedException(AppHTTPException):
    def __init__(self, message="Unauthorized"):
        super().__init__(status_code=401, message=message, title="Unauthorized")


class ForbiddenException(AppHTTPException):
    def __init__(self, message="Forbidden"):
        super().__init__(status_code=403, message=message, title="Forbidden")


class NotFoundException(AppHTTPException):
    def __init__(self, message="Not Found"):
        super().__init__(status_code=404, message=message, title="Not Found")


class BadRequestException(AppHTTPException):
    def __init__(self, message="Bad Request"):
        super().__init__(status_code=400, message=message, title="Bad Request")
