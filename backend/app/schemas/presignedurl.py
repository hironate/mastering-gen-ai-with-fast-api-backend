from pydantic import BaseModel
from typing import Optional

class PresignedUploadRequest(BaseModel):
    fileName: str
    fileType: str
    fileSize: Optional[int] = None

class PresignedUploadResponse(BaseModel):
    fileId: str
    presignedUrl: str
    fileSize: Optional[int] = None

class PresignedDownloadRequest(BaseModel):
    fileKey: str

class PresignedDownloadResponse(BaseModel):
    presignedUrl: str

