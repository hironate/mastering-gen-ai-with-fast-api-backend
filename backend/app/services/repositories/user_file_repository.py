from typing import Optional, List
from database.models import UserFile
from app.db.session import get_db
from app.core.exceptions.http_exception import NotFoundException, BadRequestException


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

    def get_file_by_key(self, file_key: str, user_id: int) -> Optional[UserFile]:
        # Get user file by file key.
        try:
            return (
                self.db.query(UserFile)
                .filter(UserFile.file_key == file_key, UserFile.user_id == user_id)
                .first()
            )
        except Exception as e:
            raise NotFoundException(message="File not found in database") from e

    def create_file(
        self,
        user_id: int,
        file_type: str,
        file_name: str,
        file_key: str,
        file_size: Optional[int] = None,
    ) -> UserFile:
        # Create a new user file.
        try:
            user_file = UserFile(
                user_id=user_id,
                file_type=file_type,
                file_name=file_name,
                file_key=file_key,
                file_size=file_size,
            )
            self.db.add(user_file)
            self.db.commit()
            self.db.refresh(user_file)
        except Exception as e:
            raise BadRequestException(message="Failed to create file") from e
        else:
            return user_file
