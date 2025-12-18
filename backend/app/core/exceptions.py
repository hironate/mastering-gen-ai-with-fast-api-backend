from typing import Optional, Dict, Any
from fastapi import HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from pydantic import ValidationError
from app.utils.response_handler import ResponseHandler


class CustomHTTPException(HTTPException):
    def __init__(
        self,
        status_code: int,
        detail: Any = None,
        headers: Optional[Dict[str, str]] = None,
    ) -> None:
        super().__init__(status_code=status_code, detail=detail, headers=headers)


async def http_exception_handler(request: Request, exc: HTTPException):
    """
    Handler for HTTPException and CustomHTTPException.

    It wraps our standardized error payload into a proper
    `JSONResponse` so Starlette/FastAPI receive a valid ASGI response object.
    """
    # ResponseHandler().error_response() already returns a JSONResponse
    return ResponseHandler().error_response(
        message=str(exc.detail) if exc.detail else "An error occurred",
        detail={
            "code": exc.status_code,
            "path": request.url.path,
        },
        code=exc.status_code,
    )


async def request_validation_exception_handler(request: Request, exc: RequestValidationError):
    """Handler for FastAPI RequestValidationError (422 validation errors)."""
    # ResponseHandler().error_response() already returns a JSONResponse
    return ResponseHandler().error_response(
        message="Validation failed",
        detail={
            "errors": exc.errors(),
            "path": request.url.path,
        },
        code=422,
    )
