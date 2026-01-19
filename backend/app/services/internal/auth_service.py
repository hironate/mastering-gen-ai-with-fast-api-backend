from typing import Optional
from sqlalchemy.orm import Session
from datetime import datetime, timedelta

from app.utils.auth.auth import (
    get_password_hash,
    encrypt_token,
    decrypt_token,
    verify_password,
    JWTError,
)
from app.services.repositories import UserRepository
from app.schemas.auth_schema import UserCreate, LoginRequest, UserResponse, User
from app.config.settings import settings
from app.core.exceptions.http_exception import (
    UnauthorizedException,
    NotFoundException,
    BadRequestException,
)
from app.utils.orm import orm_to_pydantic


class AuthService:
    def __init__(self):
        self.user_repo = UserRepository()

    def signup(self, db: Session, user_data: UserCreate) -> UserResponse:
        """Create a new user account."""
        existing_user = self.user_repo.get_user_by_email(db, user_data.email)
        if existing_user:
            raise BadRequestException(message="Email already registered")

        password_hash = get_password_hash(user_data.password)
        try:
            user_orm = self.user_repo.create_user(db, user_data, password_hash)
            return orm_to_pydantic(user_orm, UserResponse)
        except ValueError as e:
            raise BadRequestException(message=str(e))

    def login(self, db: Session, login_data: LoginRequest) -> dict:
        """Authenticate user and create login session."""
        user_orm = self.user_repo.get_user_with_password(db, login_data.email)

        if not user_orm:
            raise UnauthorizedException(message="Invalid email or password")
        if not user_orm.is_active:
            raise UnauthorizedException(message="Account is inactive")
        if not verify_password(login_data.password, user_orm.password_hash):
            raise UnauthorizedException(message="Invalid email or password")

        self.user_repo.update_last_login(db, user_orm.id)
        access_token = self.create_access_token(data={"sub": user_orm.email})
        user_response = orm_to_pydantic(user_orm, UserResponse)

        return {
            "user": user_response.model_dump(mode="json"),
            "access_token": access_token,
        }

    def update_password(
        self,
        db: Session,
        user_id: int,
        old_password: str,
        new_password: str,
    ) -> dict:
        """Update user's password."""
        user_orm = self.user_repo.get_user_with_password_by_id(db, user_id)

        if not user_orm:
            raise UnauthorizedException(message="User not found")
        if not verify_password(old_password, user_orm.password_hash):
            raise UnauthorizedException(message="Invalid old password")
        if new_password == old_password:
            raise BadRequestException(
                message="New password cannot be the same as the old password"
            )

        new_password_hash = get_password_hash(new_password)
        self.user_repo.update_password(db, user_id, new_password_hash)
        return {"message": "Password updated successfully"}

    def create_access_token(
        self, data: dict, expires_delta: Optional[timedelta] = None
    ):
        """Create a JWT access token."""
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(
                minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
            )

        to_encode.update({"exp": expire})
        return encrypt_token(to_encode)

    def verify_token(self, token: str) -> Optional[str]:
        """Verify and decode a JWT token."""
        try:
            payload = decrypt_token(token)
            username: str = payload.get("sub")
            if username is None:
                return None
            return username
        except JWTError:
            return None
