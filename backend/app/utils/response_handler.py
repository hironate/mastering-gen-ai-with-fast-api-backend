from typing import Optional, Dict, Any
from fastapi import HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import ValidationError

class ResponseHandler:

    def __init__(self):
        pass

    def success_response( self, data: Any = None, message: str = "Operation successful", code: int = 200):
        """Helper function to create a success response"""
        return JSONResponse(
            status_code=code,
            content={
                "status": "success",
                "message": message,
                "data": jsonable_encoder(data)  # Convert to JSON-serializable format
            }
        )


    def error_response(self, message: str, detail: Any = None, code: int = 400):
        """Helper function to create an error response"""
        return JSONResponse(
            status_code=code,
            content={
                "status": "error",
                "message": message,
                "detail": jsonable_encoder(detail)  # Convert to JSON-serializable format
            }
        )