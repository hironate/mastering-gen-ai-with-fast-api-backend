from app.services.repositories.user_file_repository import UserFileRepository
from app.core.exceptions.http_exception import NotFoundException, BadRequestException
from loguru import logger


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
        try:
            return UserFileRepository().create_file(
                user_id=user_id,
                file_type=file_type,
                file_name=file_name,
                file_key=file_key,
                file_size=file_size,
            )
        except Exception as e:
            logger.error(f"Failed to add file to database: {str(e)}")
            raise BadRequestException(message="Failed to add file to database") from e

    def get_file(self, file_key: str, user_id: int):
        user_file = UserFileRepository().get_file_by_key(
            file_key=file_key,
            user_id=user_id,
        )
        if not user_file:
            raise NotFoundException(message="File not found")
        return user_file
