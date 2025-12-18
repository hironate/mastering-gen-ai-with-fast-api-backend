from pydantic import BaseModel
from typing import Optional, Any, Generic, TypeVar

T = TypeVar('T')


class StandardResponse(BaseModel, Generic[T]):
    """Standard response format for all API endpoints"""
    status: str  # "success" or "error"
    message: str
    detail: Optional[T] = None


