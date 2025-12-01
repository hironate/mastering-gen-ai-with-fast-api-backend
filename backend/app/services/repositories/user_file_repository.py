from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID

from app.models.user_file import UserFile

class UserFileRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_file_by_user_id(self, user_id: UUID) -> Optional[UserFile]:
        """Get user file by user ID (one-to-one relationship)."""
        return self.db.query(UserFile).filter(UserFile.user_id == user_id).first()

    def create_file(self, user_id: UUID, file_type: str, file_name: str, file_url: str) -> UserFile:
        """Create a new user file."""
        user_file = UserFile(
            user_id=user_id,
            file_type=file_type,
            file_name=file_name,
            file_url=file_url
        )
        self.db.add(user_file)
        self.db.commit()
        self.db.refresh(user_file)
        return user_file

    def update_file(self, user_id: UUID, file_type: Optional[str] = None,
                   file_name: Optional[str] = None, file_url: Optional[str] = None) -> bool:
        """Update user file."""
        update_data = {}
        if file_type is not None:
            update_data["file_type"] = file_type
        if file_name is not None:
            update_data["file_name"] = file_name
        if file_url is not None:
            update_data["file_url"] = file_url

        if not update_data:
            return False

        result = self.db.query(UserFile).filter(UserFile.user_id == user_id).update(update_data)
        self.db.commit()
        return result > 0

    def delete_file(self, user_id: UUID) -> bool:
        """Delete user file."""
        result = self.db.query(UserFile).filter(UserFile.user_id == user_id).delete()
        self.db.commit()
        return result > 0
