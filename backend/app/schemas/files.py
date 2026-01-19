from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, field_validator

from app.utils.file.aws.file_constants import ALLOWED_MIME_TYPES, MAX_FILE_SIZE


class PresignedUploadRequest(BaseModel):
    name: str = Field(..., description="The name of the file")
    type: str = Field(..., description="The MIME type of the file")
    size: int = Field(..., description="The size of the file", ge=0, le=MAX_FILE_SIZE)

    @field_validator("type")
    @classmethod
    def validate_file_type(cls, value: str) -> str:
        if value not in ALLOWED_MIME_TYPES:
            raise ValueError(f"Input should be {ALLOWED_MIME_TYPES}")
        return value


class AddFileRequest(PresignedUploadRequest):
    key: str


class PresignedUploadResponse(BaseModel):
    id: str
    presigned_url: str
    size: Optional[int] = None


class PresignedDownloadRequest(BaseModel):
    key: str


class UserFileResponse(BaseModel):
    id: int
    user_id: int
    name: str = Field(..., alias="name")
    type: str = Field(..., alias="type")
    size: Optional[int] = Field(None, alias="size")
    key: str = Field(..., alias="key")
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
