from typing import Any, Dict, Optional

from fastapi import HTTPException


class AppHTTPException(HTTPException):
    def __init__(
        self,
        status_code: int,
        message: str,
        details: Any = None,
        title: str = None,
        errors: Any = None,
        headers: Optional[Dict[str, str]] = None,
    ):
        self.details = details if details is not None else message
        self.message = message
        self.title = title if title is not None else "Error"
        self.errors = errors if errors is not None else {"message": self.message}
        super().__init__(status_code=status_code, detail=message, headers=headers)
