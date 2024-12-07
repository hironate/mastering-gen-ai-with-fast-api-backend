from typing import Optional, Dict
from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
from typing import Any
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

async def http_exception_handler(request: Request, exc: CustomHTTPException):
    return ResponseHandler.error_response(
        message=exc.detail,
        code=exc.status_code,
        errors={
            "path": request.url.path
        }
    )

async def validation_exception_handler(request: Request, exc: ValidationError):
    return ResponseHandler.error_response(
        message="Validation Error",
        code=422,
        errors={
            "detail": [
                {
                    "loc": err["loc"],
                    "msg": str(err["msg"]),
                    "type": err["type"]
                }
                for err in exc.errors()
            ],
            "path": request.url.path
        }
    )
