from app.services.repositories.user_file_repository import UserFileRepository
from app.core.exceptions.http_exception import NotFoundException, BadRequestException


class FileService:
    def __init__(self):
        pass

    def add_file(
        self,
        user_id: int,
        file_type: str,
        file_name: str,
        file_key: str,
        file_size: int,
    ):
        user_file = UserFileRepository().create_file(
            user_id=user_id,
            file_type=file_type,
            file_name=file_name,
            file_key=file_key,
            file_size=file_size,
        )
        if not user_file:
            raise BadRequestException(message="Failed to add file to database")
        return user_file

    def get_file(self, file_key: str, user_id: int):
        user_file = UserFileRepository().get_file_by_key(
            file_key=file_key,
            user_id=user_id,
        )
        if user_file:
            return user_file
        raise NotFoundException(message="File not found")
