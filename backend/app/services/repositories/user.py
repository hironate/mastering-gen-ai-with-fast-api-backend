from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session, defer, load_only
from sqlalchemy import select, update
from typing import Optional, List
from datetime import datetime

from app.schemas.auth_schema import UserCreate, UserUpdate
from database.models import User
from .base import BaseRepository


class UserRepository(BaseRepository[User, UserCreate, UserUpdate]):
    def __init__(self):
        super().__init__(User)

    def get_user_by_email(
        self,
        db: Session,
        email: str,
        include_password: bool = False,
        load_columns: Optional[List[str]] = None,
    ) -> Optional[User]:
        """Get user by email with explicit column loading."""
        stmt = select(User).where(User.email == email)

        if load_columns:
            stmt = stmt.options(
                load_only(*[getattr(User, col) for col in load_columns])
            )
        elif not include_password:
            stmt = stmt.options(defer(User.password_hash, raiseload=True))

        result = db.execute(stmt)
        return result.scalar_one_or_none()

    def get_user_by_id(
        self,
        db: Session,
        user_id: int,
        include_password: bool = False,
        load_columns: Optional[List[str]] = None,
    ) -> Optional[User]:
        """Get user by ID with explicit column loading."""
        stmt = select(User).where(User.id == user_id)

        if load_columns:
            stmt = stmt.options(
                load_only(*[getattr(User, col) for col in load_columns])
            )
        elif not include_password:
            stmt = stmt.options(defer(User.password_hash, raiseload=True))

        result = db.execute(stmt)
        return result.scalar_one_or_none()

    def get_user_with_password(self, db: Session, email: str) -> Optional[User]:
        """Get user by email INCLUDING password hash for authentication."""
        stmt = select(User).where(User.email == email)
        result = db.execute(stmt)
        return result.scalar_one_or_none()

    def get_user_with_password_by_id(self, db: Session, user_id: int) -> Optional[User]:
        """Get user by ID INCLUDING password hash for authentication."""
        stmt = select(User).where(User.id == user_id)
        result = db.execute(stmt)
        return result.scalar_one_or_none()

    def create_user(
        self,
        db: Session,
        user_data: UserCreate,
        password_hash: str,
    ) -> User:
        """Create new user with hashed password."""
        user = User(
            email=user_data.email,
            password_hash=password_hash,
            name=user_data.name,
            role=user_data.role,
            is_active=True,
        )

        db.add(user)

        try:
            db.commit()
            db.refresh(user)
            return user
        except IntegrityError as e:
            db.rollback()
            raise ValueError("Email already exists") from e

    def update_password(
        self, db: Session, user_id: int, new_password_hash: str
    ) -> Optional[User]:
        """Update user password."""
        stmt = (
            update(User)
            .where(User.id == user_id)
            .values(password_hash=new_password_hash, updated_at=datetime.utcnow())
            .returning(User)
        )

        result = db.execute(stmt)
        db.commit()

        return result.scalar_one_or_none()

    def update_last_login(self, db: Session, user_id: int) -> bool:
        """Update user's last login timestamp."""
        stmt = (
            update(User)
            .where(User.id == user_id)
            .values(last_login_at=datetime.utcnow())
        )

        result = db.execute(stmt)
        db.commit()

        return result.rowcount > 0

    def get_active_users(
        self, db: Session, skip: int = 0, limit: int = 100
    ) -> List[User]:
        """Get all active users with pagination."""
        stmt = (
            select(User)
            .where(User.is_active == True)
            .options(defer(User.password_hash, raiseload=True))
            .offset(skip)
            .limit(limit)
        )

        result = db.execute(stmt)
        return list(result.scalars().all())

    def email_exists(self, db: Session, email: str) -> bool:
        """Check if email already exists in database."""
        stmt = select(User.id).where(User.email == email)
        result = db.execute(stmt)
        return result.scalar_one_or_none() is not None
