from fastapi import HTTPException
from typing import Any, Dict, Optional


class AppHTTPException(HTTPException):
    def __init__(
        self,
        status_code: int,
        message: str,
        error_code: str,
        details: Any = None,
        title: str = None,
        errors: Any = None,
        headers: Optional[Dict[str, str]] = None,
    ):
        self.error_code = error_code
        self.details = details if details is not None else message
        self.message = message  # Store message as attribute
        self.title = title if title is not None else "Error"
        self.errors = errors if errors is not None else {"details": self.details}
        super().__init__(status_code=status_code, detail=message, headers=headers)
