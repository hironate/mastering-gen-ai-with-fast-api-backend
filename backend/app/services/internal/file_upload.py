from typing import Optional
from app.core.exceptions.http_exception import BadRequestException
from app.services.repositories.user_file_repository import UserFileRepository


ALLOWED_FILE_TYPES = [
    'text/plain',
    'application/pdf',
    'application/doc',
    'application/docx']

MAX_FILE_SIZE = 2  # 2 MB

class FileService:
    def __init__(self):
        pass

    def validate(self, file_type: str, file_size: Optional[int] = None):
        if file_type not in ALLOWED_FILE_TYPES:
            raise BadRequestException(message="Invalid file type")
        if file_size is not None and file_size > MAX_FILE_SIZE:
            raise BadRequestException(message="File size exceeds the maximum allowed size")
        return True

    def add_file_to_db(self, user_id: int, file_type: str, file_name: str, file_key: str, file_size: int):
        user_file = UserFileRepository().create_file(user_id=user_id, file_type=file_type, file_name=file_name, file_key=file_key, file_size=file_size)
        if not user_file:
            raise BadRequestException(message="Failed to add file to database")
        return user_file

    def get_file_by_key(self, file_key: str):
        user_file = UserFileRepository().get_file_by_key(file_key=file_key)
        if not user_file:
            raise BadRequestException(message="File not found")
        return user_file