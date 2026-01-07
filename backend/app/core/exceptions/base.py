from fastapi import HTTPException
from typing import Any, Dict, Optional

class AppHTTPException(HTTPException):
    def __init__(self, status_code: int, message: str, error_code: str, details: Any = None, headers: Optional[Dict[str, str]] = None):
        self.error_code = error_code
        self.details = details if details is not None else message
        super().__init__(status_code=status_code, detail=message , headers=headers)