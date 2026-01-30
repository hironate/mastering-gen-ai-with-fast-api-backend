"""
File type constants for the application.
This module contains all allowed file types and file size limits.
"""

from typing import List
from fastapi import UploadFile

# Document file types
ALLOWED_MIME_TYPES = [
    "application/pdf",
    "application/doc",
    "application/docx",
    "text/plain",
]

# File size limits (in bytes)
MAX_FILE_SIZE = 2 * 1024 * 1024  # 2 MB

# Expiration time for presigned URLs (in seconds)
expiration_time = 3600

# Mapping from MIME type to file extension
FILE_TYPE_TO_EXTENSION = {
    "application/pdf": ".pdf",
    "application/doc": ".doc",
    "application/docx": ".docx",
    "text/plain": ".txt",
}


def get_file_extension(type: str) -> str:
    """
    Get extension from MIME type.

    Args:
        type: MIME type string (e.g., "application/pdf")

    Returns:
        Extension with dot prefix (e.g., ".pdf")

    Raises:
        ValueError: If type is not in the mapping
    """
    extension = FILE_TYPE_TO_EXTENSION.get(type)
    if extension is None:
        raise ValueError(f"Unknown file type: {type}")
    return extension


def prepare_image_messages(files: List[UploadFile]) -> List[dict]:
    """Convert uploaded files to the format required by the LLM."""
    image_messages = []
    allowed_types = ["image/jpeg", "image/png"]

    for file in files:
        mime_type = file.content_type or "image/jpeg"
        if mime_type in allowed_types:
            image_base64 = base64.b64encode(file.file.read()).decode("utf-8")
            image_messages.append(
                {
                    "type": "image_url",
                    "image_url": {"url": f"data:{mime_type};base64,{image_base64}"},
                }
            )
    return image_messages
