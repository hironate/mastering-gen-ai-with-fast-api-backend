from loguru import logger

from app.core.exceptions.http_exception import BadRequestException, NotFoundException
from app.services.repositories.user_file_repository import UserFileRepository


class FileService:
    def __init__(self):
        pass

    def add_file(
        self,
        user_id: int,
        type: str,
        name: str,
        key: str,
        size: int,
    ):
        try:
            return UserFileRepository().create_file(
                user_id=user_id,
                type=type,
                name=name,
                key=key,
                size=size,
            )
        except Exception as e:
            logger.error(f"Failed to add file to database: {str(e)}")
            raise BadRequestException(message="Failed to add file to database") from e

    def get_file_by_id(self, id: int, user_id: int):
        user_file = UserFileRepository().get_file_by_id(
            id=id,
            user_id=user_id,
        )
        if not user_file:
            raise NotFoundException(message="File not found")
        return user_file

    def get_file_by_key(self, key: str, user_id: int):
        user_file = UserFileRepository().get_file_by_key(
            key=key,
            user_id=user_id,
        )
        if not user_file:
            raise NotFoundException(message="File not found")
        return user_file
