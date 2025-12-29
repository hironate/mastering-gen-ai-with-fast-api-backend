from fastapi import HTTPException
from typing import Any, Dict, Optional
from loguru import logger

class AppHTTPException(HTTPException):
    def __init__(self, status_code: int, message: str,error_code: str, details: Any = None, headers: Optional[Dict[str, str]] = None):
        logger.info(f"AppHTTPException: {message}")
        logger.info(f"AppHTTPException: {error_code}")
        logger.info(f"AppHTTPException: {details}")
        logger.info(f"AppHTTPException: {headers}")
        self.error_code = error_code
        # Use message as details if details is not provided
        self.details = details if details is not None else message
        super().__init__(status_code=status_code, detail=message , headers=headers)