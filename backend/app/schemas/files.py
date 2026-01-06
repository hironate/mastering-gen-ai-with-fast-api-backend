from pydantic import BaseModel
from typing import Optional

class AddFileRequest(BaseModel):
    fileName: str
    fileType: str
    fileKey: str
    fileSize: Optional[int] = None

class GetFileRequest(BaseModel):
    fileKey: str