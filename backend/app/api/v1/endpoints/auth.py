import logging

from fastapi import APIRouter, Depends, HTTPException, status
from app.core.exceptions import CustomHTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.services.internal import AuthService
from app.schemas.auth_schema import (
    UserCreate, LoginRequest, LoginResponse, UserResponse, LoginSessionResponse,
    PasswordUpdateRequest
)
from app.core.security import verify_token
router = APIRouter()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    """Dependency to get current authenticated user."""
    email = verify_token(token)
    if email is None:
        raise HTTPException(status_code=401, detail="Invalid authentication credentials")

    auth_service = AuthService(db)
    user = auth_service.get_current_user(email)
    if user is None:
        raise HTTPException(status_code=401, detail="User not found")

    return user

@router.post("/signup", response_model=UserResponse)
async def signup(
    user_data: UserCreate,
    db: Session = Depends(get_db)
):
    """Create a new user account."""
    try:
        auth_service = AuthService(db)
        user = auth_service.signup(user_data)
        return user
    except CustomHTTPException as e:
        raise e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail="Internal server error")

@router.put("/update-password", response_model=UserResponse)
async def update_password(
    password_update_request: PasswordUpdateRequest,
    current_user: UserResponse = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        auth_service = AuthService(db)
        user = auth_service.update_password(
            current_user.email, 
            password_update_request.old_password, 
            password_update_request.new_password
        )
        return user
    except CustomHTTPException as e:
        raise e
    except Exception as e:
        logging.error(f"Error updating password: {e}")
        raise CustomHTTPException(status_code=500, detail="Internal server error")


@router.post("/login", response_model=LoginResponse)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):
    # print("Username:", form_data.username)
    # print("Password:", form_data.password)
    try:
        auth_service = AuthService(db)
        # Convert OAuth2 form → your LoginRequest schema
        login_data = LoginRequest(
            email=form_data.username,
            password=form_data.password
        )
        result = auth_service.login(login_data)
        return result
    except CustomHTTPException as e:
        raise e
    except Exception as e:
        # print(f"*************************************************{e}****************************************")
        raise CustomHTTPException(status_code=500, detail="Internal server error")


@router.post("/logout")
async def logout(
    current_user: UserResponse = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Logout user."""
    try:
        auth_service = AuthService(db)
        result = auth_service.logout(current_user.email)
        return result
    except CustomHTTPException as e:
        raise e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail="Internal server error")

@router.get("/sessions", response_model=list[LoginSessionResponse])
async def get_user_sessions(
    current_user: UserResponse = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Get login sessions for the authenticated user."""
    try:
        auth_service = AuthService(db)
        sessions = auth_service.get_user_sessions(current_user.email)
        return sessions
    except CustomHTTPException as e:
        raise e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail="Internal server error")