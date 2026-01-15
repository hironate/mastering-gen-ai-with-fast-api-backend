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

# Mapping from MIME type to file extension
FILE_TYPE_TO_EXTENSION = {
    "application/pdf": ".pdf",
    "application/doc": ".doc",
    "application/docx": ".docx",
    "application/msword": ".doc",
    "text/plain": ".txt",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": ".docx",
}


def get_file_extension(file_type: str) -> str:
    """
    Get file extension from MIME type.

    Args:
        file_type: MIME type string (e.g., "application/pdf")

    Returns:
        File extension with dot prefix (e.g., ".pdf")

    Raises:
        ValueError: If file type is not in the mapping
    """
    extension = FILE_TYPE_TO_EXTENSION.get(file_type)
    if extension is None:
        raise ValueError(f"Unknown file type: {file_type}")
    return extension
