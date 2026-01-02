from typing import Optional, Dict, Any
from fastapi import HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from app.utils.response_handler import ResponseHandler
from app.core.exceptions.base import AppHTTPException


async def app_http_exception_handler(request: Request, exc: AppHTTPException):
    """
    Handler for HTTPException and CustomHTTPException.

    It wraps our standardized error payload into a proper
    `JSONResponse` so Starlette/FastAPI receive a valid ASGI response object.
    """
    return ResponseHandler().error_response(
        message=exc.details,
        code=exc.status_code,
        errors={
            "path": request.url.path,
            "details": exc.details,
        },
    )

async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError
):
    return ResponseHandler().error_response(
        message="Validation Error",
        code=422,
        errors={
            "details": exc.errors(),
            "path": request.url.path,
        },
    )

async def internal_exception_handler(request: Request, exc: Exception):
    return ResponseHandler().error_response(
        message="Internal Server Error",
        code=500,
        errors={
            "path": request.url.path
        },
    )


