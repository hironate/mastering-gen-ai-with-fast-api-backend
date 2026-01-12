from pydantic import BaseModel
from typing import Optional

class AddFileRequest(BaseModel):
    fileName: str
    fileType: str
    fileKey: str
    fileSize: Optional[int] = None

class GetFileRequest(BaseModel):
    fileKey: str

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

