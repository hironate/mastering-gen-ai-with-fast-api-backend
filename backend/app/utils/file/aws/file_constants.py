"""
File type constants for the application.
This module contains all allowed file types and file size limits.
"""

# Document file types
ALLOWED_MIME_TYPES = [
    "application/pdf",
    "application/doc",
    "application/docx",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
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
    "application/msword": ".doc",
    "text/plain": ".txt",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
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
