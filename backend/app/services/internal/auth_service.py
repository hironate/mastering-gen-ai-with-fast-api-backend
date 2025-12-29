from typing import Optional

from app.utils.auth import (
    get_password_hash,
    encrypt_token,
    decrypt_token,
    verify_password,
)
from app.services.repositories import UserRepository
from app.schemas.auth_schema import (
    UserCreate,
    LoginRequest,
    UserResponse,
)
from app.config.settings import settings
from app.utils.auth import JWTError
from loguru import logger
from app.core.exceptions.http_exception import UnauthorizedException, NotFoundException, BadRequestException
from app.utils.response_handler import ResponseHandler
from datetime import datetime, timedelta


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    # """Create a JWT access token."""
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(
            minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES
        )

    to_encode.update({"exp": expire})

    return encrypt_token(to_encode)


def verify_token(token: str) -> Optional[str]:
    # """Verify and decode a JWT token."""
    try:
        payload = decrypt_token(token)
        username: str = payload.get("sub")
        if username is None:
            return None
        return username
    except JWTError:
        return None


class AuthService:

    def __init__(self):
        # UserRepository now manages its own database session
        self.user_repo = UserRepository()

    def signup(self, user_data: UserCreate) -> UserResponse:
        # """Create a new user account."""
        # Check if user already exists
        existing_user = self.user_repo.get_user_by_email(user_data.email)

        if existing_user:
            raise BadRequestException(message="Email already registered")
        # Hash the password
        password_hash = get_password_hash(user_data.password)

        # Create user
        try:
            user = self.user_repo.create_user(user_data, password_hash)
            return UserResponse.model_validate(user)
        except ValueError as e:
            raise BadRequestException(message=str(e))


    def login(self, login_data: LoginRequest) -> dict:
        # """Authenticate user and create login session."""
        # Get user by email
        user_data = self.user_repo.get_user_by_email(
            login_data.email,
            attributes=[],
            includePassword=True,
        )

        if not user_data:
            raise UnauthorizedException(message="user does not exist")
        if not user_data.is_active:
            raise UnauthorizedException(message="Account is inactive")
        if not verify_password(login_data.password, user_data.password_hash):
            raise UnauthorizedException(message="Invalid email or password")
        self.user_repo.update_last_login(user_data.id)
        access_token = create_access_token(data={"sub": user_data.email})
        user_response = UserResponse.model_validate(user_data)
        return {"user": user_response.model_dump(mode='json'), "access_token": access_token}

    def logout(self, user_email: str) -> dict:
        # """Logout user (invalidate token - in a real implementation, you'd use token blacklist)."""
        user = self.user_repo.get_user_by_email(user_email)
        if not user:
            raise NotFoundException(message="User not found")

        return {"message": "Logged out successfully"}

    def update_password(self, email: str, old_password: str, new_password: str) -> dict:
        # """Update user's password."""
        user = self.user_repo.get_user_by_email(email, includePassword=True)
        if not user:
            raise NotFoundException(message="User not found")

        if not verify_password(old_password, user.password_hash):
            raise UnauthorizedException(message="Invalid old password")
        
        new_password_hash = get_password_hash(new_password)
        updated_user = self.user_repo.update_password(user.id, new_password_hash)
        return {"message": "Password updated successfully"}

    def get_current_user(self, email: str) -> Optional[UserResponse]:
        # """Get current authenticated user."""
        user = self.user_repo.get_user_by_email(email)
        if user:
            return UserResponse.model_validate(user)
        return None
