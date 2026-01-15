from pydantic import BaseModel, Field, field_validator
from typing import Optional
from datetime import datetime
from app.utils.file_constants import ALLOWED_MIME_TYPES, MAX_FILE_SIZE


class PresignedUploadRequest(BaseModel):
    fileName: str = Field(..., description="The name of the file")
    fileType: str = Field(..., description="The MIME type of the file")
    fileSize: int = Field(
        ..., description="The size of the file", ge=0, le=MAX_FILE_SIZE
    )

    @field_validator("fileType")
    @classmethod
    def validate_file_type(cls, value: str) -> str:
        if value not in ALLOWED_MIME_TYPES:
            raise ValueError(f"Input should be {ALLOWED_MIME_TYPES}")
        return value


class AddFileRequest(PresignedUploadRequest):
    fileKey: str


class PresignedUploadResponse(BaseModel):
    fileId: str
    presignedUrl: str
    fileSize: Optional[int] = None


class PresignedDownloadRequest(BaseModel):
    fileKey: str


class UserFileResponse(BaseModel):
    id: int
    user_id: int
    fileName: str = Field(..., alias="file_name")
    fileType: str = Field(..., alias="file_type")
    fileSize: Optional[int] = Field(None, alias="file_size")
    fileKey: str = Field(..., alias="file_key")
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
