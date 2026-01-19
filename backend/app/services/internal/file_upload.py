from typing import List, Optional
from sqlalchemy.orm import Session
from loguru import logger

from app.core.exceptions.http_exception import BadRequestException, NotFoundException
from app.services.repositories.user_file_repository import UserFileRepository
from app.schemas.files import UserFileResponse
from app.utils.orm import orm_to_pydantic, orm_list_to_pydantic


class FileService:
    def __init__(self):
        self.file_repo = UserFileRepository()

    def add_file(
        self,
        db: Session,
        user_id: int,
        type: str,
        name: str,
        key: str,
        size: int,
    ) -> UserFileResponse:
        """Add a new file record to the database."""
        try:
            file_orm = self.file_repo.create_file(
                db=db,
                user_id=user_id,
                type=type,
                name=name,
                key=key,
                size=size,
            )
            return orm_to_pydantic(file_orm, UserFileResponse)
        except Exception as e:
            logger.error(f"Failed to add file to database: {str(e)}")
            raise BadRequestException(message="Failed to add file to database") from e

    def get_file_by_id(self, db: Session, id: int, user_id: int) -> UserFileResponse:
        """Get file by ID with user authorization."""
        file_orm = self.file_repo.get_file_by_id(db=db, id=id, user_id=user_id)
        if not file_orm:
            raise NotFoundException(message="File not found")
        return orm_to_pydantic(file_orm, UserFileResponse)

    def get_file_by_key(self, db: Session, key: str, user_id: int) -> UserFileResponse:
        """Get file by key with user authorization."""
        file_orm = self.file_repo.get_file_by_key(db=db, key=key, user_id=user_id)
        if not file_orm:
            raise NotFoundException(message="File not found")
        return orm_to_pydantic(file_orm, UserFileResponse)

    def get_user_files(
        self,
        db: Session,
        user_id: int,
        skip: int = 0,
        limit: int = 100,
    ) -> List[UserFileResponse]:
        """Get all files for a user with pagination."""
        files_orm = self.file_repo.get_files_by_user_id(
            db=db, user_id=user_id, skip=skip, limit=limit
        )
        return orm_list_to_pydantic(files_orm, UserFileResponse)

    def delete_file(self, db: Session, file_key: str, user_id: int) -> bool:
        """Delete file record from database."""
        return self.file_repo.delete_file_by_key(
            db=db, file_key=file_key, user_id=user_id
        )
