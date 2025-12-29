from typing import Any, Optional
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
                "data": data  # Convert to JSON-serializable format
            },
        )
    # static method is used to create an error response without creating an instance of the class
    @staticmethod
    def error_response(message: str, code: int, errors: Optional[Any] = None):
        """Helper function to create an error response"""
        return JSONResponse(
            status_code=code,
            content={
                "status": "error",
                "message": message,
                "detail": errors  # Convert to JSON-serializable format
            },
        )
