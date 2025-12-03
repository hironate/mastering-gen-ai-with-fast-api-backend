from sqlalchemy.orm import Session
from typing import Optional
from uuid import UUID

from app.core.security import verify_password, get_password_hash, create_access_token
from app.services.repositories import UserRepository, LoginSessionRepository
from app.schemas.auth_schema import UserCreate, LoginRequest, UserResponse, LoginResponse, PasswordUpdateRequest
from app.core.exceptions import CustomHTTPException

class AuthService:
    def __init__(self, db: Session):
        self.db = db
        self.user_repo = UserRepository(db)
        self.session_repo = LoginSessionRepository(db)

    def signup(self, user_data: UserCreate) -> UserResponse:
        """Create a new user account."""
        # Check if user already exists
        existing_user = self.user_repo.get_user_by_email(user_data.email)
        if existing_user:
            raise CustomHTTPException(status_code=400, detail="Email already registered")

        # Hash the password
        password_hash = get_password_hash(user_data.password)

        # Create user
        try:
            user = self.user_repo.create_user(user_data, password_hash)
            return UserResponse.from_orm(user)
        except ValueError as e:
            raise CustomHTTPException(status_code=400, detail=str(e))

    def login(self, login_data: LoginRequest) -> LoginResponse:
        """Authenticate user and create login session."""
        # Get user by email
        print(f"******************************************************{login_data}*******************************************")
        user = self.user_repo.get_user_by_email(login_data.email)
        if not user:
            # Create failed session
            self.session_repo.create_session('00000000-0000-0000-0000-000000000000', 'failed', 'User not found')
            raise CustomHTTPException(status_code=401, detail="Invalid email or password")

        # Verify password
        if not verify_password(login_data.password, user.password_hash):
            # Create failed session
            self.session_repo.create_session(user.id, 'failed', 'Invalid password')
            raise CustomHTTPException(status_code=401, detail="Invalid email or password")

        # Check if user is active
        if not user.is_active:
            self.session_repo.create_session(user.id, 'failed', 'User account is inactive')
            raise CustomHTTPException(status_code=401, detail="Account is inactive")

        # Update last login
        self.user_repo.update_last_login(user.id)

        # Create successful session
        self.session_repo.create_session(user.id, 'success')

        # Create access token
        access_token = create_access_token(data={"sub": user.email})
        print(f"+++++++++++++++++++++++++++++::{access_token}::+++++++++++++++++++++++++++++++++++++++")
        return LoginResponse(
            user=UserResponse.from_orm(user),
            access_token=access_token
        )

    def logout(self, user_email: str) -> dict:
        """Logout user (invalidate token - in a real implementation, you'd use token blacklist)."""
        user = self.user_repo.get_user_by_email(user_email)
        if not user:
            raise CustomHTTPException(status_code=404, detail="User not found")
        
        last_session = self.session_repo.get_last_active_session(user.id)
        print(last_session)
        if last_session:
            self.session_repo.update_logout_time(last_session.id)
        return {"message": "Logged out successfully"}

    def update_password(self, email: str, old_password: str, new_password: str) -> UserResponse:
        """Update user's password."""
        user = self.user_repo.get_user_by_email(email)
        if not user:
            raise CustomHTTPException(status_code=404, detail="User not found")
        
        if not verify_password(old_password, user.password_hash):
            raise CustomHTTPException(status_code=401, detail="Invalid old password")
        
        new_password_hash = get_password_hash(new_password)
        updated_user = self.user_repo.update_password(user.id, new_password_hash)
        return UserResponse.from_orm(updated_user)

    def get_user_sessions(self, user_email: str) -> list:
        """Get login sessions for a user."""
        user = self.user_repo.get_user_by_email(user_email)
        if not user:
            raise CustomHTTPException(status_code=404, detail="User not found")

        sessions = self.session_repo.get_sessions_by_user(user.id)
        return [session for session in sessions]

    def get_current_user(self, email: str) -> Optional[UserResponse]:
        """Get current authenticated user."""
        user = self.user_repo.get_user_by_email(email)
        if user:
            return UserResponse.from_orm(user)
        return None
