from typing import Optional, List
from sqlalchemy.orm import Session
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError

from database.models import Files
from app.schemas.files import UserFileCreate, UserFileUpdate
from app.core.exceptions.http_exception import NotFoundException, BadRequestException
from .base import BaseRepository


class UserFileRepository(BaseRepository[Files, UserFileCreate, UserFileUpdate]):
    def __init__(self):
        super().__init__(Files)
 
    def get_files_by_user_id(
        self, db: Session, user_id: int, skip: int = 0, limit: int = 100
    ) -> List[Files]:
        """Get all files for a specific user with pagination."""
        stmt = (
            select(Files)
            .where(Files.user_id == user_id)
            .offset(skip)
            .limit(limit)
            .order_by(Files.created_at.desc())
        )
        result = db.execute(stmt)
        return list(result.scalars().all())

    def get_file_by_id(self, db: Session, id: int, user_id: int) -> Optional[Files]:
        """Get file by ID with user authorization."""
        stmt = select(Files).where(
            Files.id == id,
            Files.user_id == user_id,
        )
        result = db.execute(stmt)
        file = result.scalar_one_or_none()

        if not file:
            raise NotFoundException(message="File not found in database")
        return file

    def get_file_by_key(
        self, db: Session, key: str, user_id: int
    ) -> Optional[Files]:
        """Get file by key with user authorization."""
        stmt = select(Files).where(
            Files.key == key,
            Files.user_id == user_id,
        )
        result = db.execute(stmt)
        file = result.scalar_one_or_none()

        if not file:
            raise NotFoundException(message="File not found in database")
        return file

    def create_file(
        self,
        db: Session,
        user_id: int,
        type: str,
        name: str,
        key: str,
        size: Optional[int] = None,
    ) -> Files:
        """Create a new user file record."""
        try:
            file = Files(
                user_id=user_id,
                type=type,
                name=name,
                key=key,
                size=size,
            )
            db.add(file)
            db.commit()
            db.refresh(file)
            return file
        except IntegrityError as e:
            db.rollback()
            raise BadRequestException(
                message="File key already exists or invalid user ID"
            ) from e
        except Exception as e:
            db.rollback()
            raise BadRequestException(message="Failed to create file record") from e

    def delete_file_by_key(self, db: Session, file_key: str, user_id: int) -> bool:
        """Delete file by key with user authorization."""
        file = self.get_file_by_key(db, file_key, user_id)
        if not file:
            return False

        db.delete(file)
        db.commit()
        return True

    def get_user_file_count(self, db: Session, user_id: int) -> int:
        """Get total count of files for a user."""
        from sqlalchemy import func

        stmt = select(func.count(Files.id)).where(Files.user_id == user_id)
        result = db.execute(stmt)
        return result.scalar_one()

    def get_user_total_storage(self, db: Session, user_id: int) -> int:
        """Get total storage used by user in bytes."""
        from sqlalchemy import func

        stmt = select(func.sum(Files.size)).where(Files.user_id == user_id)
        result = db.execute(stmt)
        total = result.scalar_one()
        return total if total is not None else 0

    def file_key_exists(self, db: Session, file_key: str) -> bool:
        """Check if file key already exists."""
        stmt = select(Files.id).where(Files.key == file_key)
        result = db.execute(stmt)
        return result.scalar_one_or_none() is not None
