from typing import Any, Optional

from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from loguru import logger


class ResponseHandler:
    @staticmethod
    def success_response(
        data: Any = None, message: str = "Operation successful", code: int = 200
    ):
        """Helper function to create a success response"""
        return JSONResponse(
            status_code=code,
            content={"status": "success", "message": message, "data": data},
        )

    @staticmethod
    def error_response(
        message: str, code: int, title: str = "Error", errors: Optional[Any] = None
    ):
        """Helper function to create an error response"""
        return JSONResponse(
            status_code=code,
            content={
                "status": "error",
                "title": title,
                "message": message,
                "errors": errors,
            },
        )

    @staticmethod
    async def validation_error(request: Request, exc: RequestValidationError):
        logger.error(f"Validation Error: {exc.errors()}, Path: {request.url.path}")
        return JSONResponse(
            status_code=422,
            content={
                "status": "error",
                "title": "Validation error",
                "message": exc.errors()[0].get("msg"),
                "errors": [
                    {
                        "field": error.get("loc")[1],
                        "message": error.get("msg"),
                        "type": "value_error",
                    }
                    for error in exc.errors()
                ],
            },
        )

    @staticmethod
    async def internal_error(request: Request, exc: Exception):
        logger.error(f"Internal Server Error: {exc}, Path: {request.url.path}")
        return JSONResponse(
            status_code=500,
            content={
                "status": "error",
                "title": "Internal Server Error",
                "message": str(exc),
                "errors": [{"message": str(exc)}],
            },
        )
