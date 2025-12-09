from sqlalchemy.orm import Session
from typing import Optional, List
from uuid import UUID

from app.models.user import User
from app.models.user_file import UserFile
from app.schemas.auth_schema import UserResponse

class UserFileRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_file_by_user_id(self, user_id: int) -> List[UserFile]:
        #Get user files by user ID (one-to-many relationship).
        return self.db.query(UserFile).filter(UserFile.user_id == user_id).all()

    def get_file_by_key(self, file_key: str) -> Optional[UserFile]:
        #Get user file by file key.
        return self.db.query(UserFile).filter(UserFile.file_key == file_key).first()

    def create_file(self, user_id: int, file_type: str, file_name: str, file_key: str, file_size: Optional[int] = None) -> UserFile:
        #Create a new user file.
        user_file = UserFile(user_id=user_id,
                            file_type=file_type,
                            file_name=file_name,
                            file_key=file_key,
                            file_size=file_size )
        self.db.add(user_file)
        self.db.commit()
        self.db.refresh(user_file)
        return user_file

    def update_file(self, file_key: str, 
                        file_type: Optional[str] = None,
                        file_name: Optional[str] = None, 
                        file_size: Optional[int] = None) -> bool:
        #Update user file.
        update_data = {}
        if file_type is not None:
            update_data["file_type"] = file_type
        if file_name is not None:
            update_data["file_name"] = file_name
        if file_size is not None:
            update_data["file_size"] = file_size

        if not update_data:
            return False

        result = self.db.query(UserFile).filter(UserFile.file_key == file_key).update(update_data)
        self.db.commit()
        return result > 0

    def delete_file(self, file_key: str) -> bool:
        #Delete user file by file key.
        result = self.db.query(UserFile).filter(UserFile.file_key == file_key).delete()
        self.db.commit()
        return result > 0
