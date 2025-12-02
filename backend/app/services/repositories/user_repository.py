from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import Optional, List
from uuid import UUID

from app.models.user import User
from app.schemas.auth_schema import UserCreate, UserResponse

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_user_by_email(self, email: str) -> Optional[User]:
        """Get user by email."""
        print(email)
        return self.db.query(User).filter(User.email == email).first()

    def get_user_by_id(self, user_id: UUID) -> Optional[User]:
        """Get user by ID."""
        return self.db.query(User).filter(User.id == user_id).first()

    def create_user(self, user_data: UserCreate, password_hash: str) -> User:
        """Create a new user."""
        user = User(
            email=user_data.email,
            password_hash=password_hash,
            full_name=user_data.full_name,
            is_active=True
        )
        self.db.add(user)
        try:
            self.db.commit()
            self.db.refresh(user)
            return user
        except IntegrityError:
            self.db.rollback()
            raise ValueError("Email already exists")

    def update_password(self, user_id: int, new_password_hash: str) -> User:
        """Update user's password hash."""
        user = self.get_user_by_id(user_id)
        if not user:
            raise ValueError("User not found")
        user.password_hash = new_password_hash
        self.db.commit()
        self.db.refresh(user)
        return user

    def update_last_login(self, user_id: int) -> bool:
        """Update user's last login timestamp."""
        from datetime import datetime
        result = self.db.query(User).filter(User.id == user_id).update({
            "last_login_at": datetime.utcnow()
        })
        self.db.commit()
        return result > 0

    def get_all_users(self) -> List[User]:
        """Get all users."""
        return self.db.query(User).all()
