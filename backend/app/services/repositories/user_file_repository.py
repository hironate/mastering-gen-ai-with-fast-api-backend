from typing import List, Optional

from loguru import logger

from app.core.exceptions.http_exception import BadRequestException, NotFoundException
from app.db.session import get_db
from database.models import UserFile


class UserFileRepository:
    def __init__(self):
        self._db_gen = get_db()
        self.db = next(self._db_gen)

    def __del__(self):
        if hasattr(self, "_db_gen") and self._db_gen is not None:
            try:
                self._db_gen.close()
            except Exception:
                pass

    def get_file_by_user_id(self, user_id: int) -> List[UserFile]:
        # Get user files by user ID (one-to-many relationship).
        return self.db.query(UserFile).filter(UserFile.user_id == user_id).all()

    def get_file_by_id(self, id: int, user_id: int) -> Optional[UserFile]:
        # Get user file by id.
        try:
            file = (
                self.db.query(UserFile)
                .filter(UserFile.id == id, UserFile.user_id == user_id)
                .first()
            )
            return file
            logger.info(f"File found in database: {file}")
        except Exception as e:
            logger.error(f"Failed to get file: {e}")
            raise NotFoundException(message="Failed to get file") from e

    def create_file(
        self,
        user_id: int,
        type: str,
        name: str,
        key: str,
        size: Optional[int] = None,
    ) -> UserFile:
        # Create a new user file.
        try:
            user_file = UserFile(
                user_id=user_id,
                type=type,
                name=name,
                key=key,
                size=size,
            )
            self.db.add(user_file)
            self.db.commit()
            self.db.refresh(user_file)
        except Exception as e:
            raise BadRequestException(message="Failed to create file") from e
        else:
            return user_file
