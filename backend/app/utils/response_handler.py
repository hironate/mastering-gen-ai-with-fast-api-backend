from typing import Any, Optional
from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

class ResponseHandler:
    @staticmethod
    def success_response(data: Any = None, message: str = "Operation successful", code: int = 200):
        """Helper function to create a success response"""
        return JSONResponse(     
            status_code=code,
            content={
                "status": "success",
                "message": message,
                "data": data
            },
        )

    @staticmethod
    def error_response(message: str, code: int, errors: Optional[Any] = None):
        """Helper function to create an error response"""
        return JSONResponse(
            status_code=code,
            content={
                "status": "error",
                "message": message,
                "detail": errors
            },
        )


async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError
):
    return ResponseHandler.error_response(
        message="Validation Error",
        code=422,
        errors={
            "details": exc.errors(),
            "path": request.url.path,
        },
    )


async def internal_exception_handler(request: Request, exc: Exception):
    return ResponseHandler.error_response(
        message="Internal Server Error",
        code=500,
        errors={
            "path": request.url.path
        },
    )
