from fastapi import APIRouter, Depends, Request, Response
from app.config.settings import settings
from app.core.exceptions import CustomHTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.services.internal import AuthService
from app.schemas.auth_schema import (
    UserCreate,
    LoginRequest,
    LoginResponse,
    UserResponse,
    PasswordUpdateRequest,
    AuthenticatedUser,
)
from app.utils.response_handler import ResponseHandler
from loguru import logger
from app.middlewares.auth_middleware import auth_required
from loguru import logger

router = APIRouter()


@router.post("/signup")
async def signup(body: UserCreate):
    """Create a new user account."""
    try:
        auth_service = AuthService()
        user = auth_service.signup(body)
        return ResponseHandler().success_response(
            data=user.model_dump(), message="User created successfully"
        )

    except CustomHTTPException as e:
        raise CustomHTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        logger.error(f"Signup failed: {e}")
        raise CustomHTTPException(status_code=500, detail="Internal server error")


@router.put("/update-password")
@auth_required()
async def update_password(
    request: Request,
    body: PasswordUpdateRequest,
):
    """Update user's password."""
    try:
        current_user = request.state.user
        auth_service = AuthService()
        user = auth_service.update_password(
            current_user.email, body.old_password, body.new_password
        )
        return ResponseHandler().success_response(
            data=user.model_dump(), message="Password updated successfully"
        )

    except CustomHTTPException as e:
        raise CustomHTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        logger.error(f"Update password failed: {e}")
        raise CustomHTTPException(status_code=500, detail="Internal server error")


@router.post("/login")
async def login(body: LoginRequest):
    """Login user and return access token in OAuth2 standard format."""
    try:
        auth_service = AuthService()
        result = auth_service.login(body)
        # Create successful response first
        response = ResponseHandler().success_response(
            data=result.user.model_dump(), message="Login successful"
        )
        response.set_cookie(
            key=settings.ACCESS_TOKEN,
            value=result.access_token,
            httponly=True,
            max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            secure=False,  # Set to True in production
        )

        return response

    except CustomHTTPException as e:
        raise CustomHTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        logger.error(f"Login failed: {e}")
        raise CustomHTTPException(status_code=500, detail="Internal server error")


@router.post("/logout")
@auth_required()
async def logout(request: Request):
    """Logout user."""
    try:
        current_user = request.state.user
        auth_service = AuthService()
        result = auth_service.logout(current_user.email)
        response = ResponseHandler().success_response(
            data=result,
            message="Logout successful",
        )
        response.delete_cookie(settings.ACCESS_TOKEN)

        return response
    except CustomHTTPException as e:
        raise CustomHTTPException(status_code=e.status_code, detail=e.detail)
    except Exception as e:
        logger.error(f"Logout failed: {e}")
        raise CustomHTTPException(status_code=500, detail="Internal server error")
