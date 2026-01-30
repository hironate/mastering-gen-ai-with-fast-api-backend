from fastapi import APIRouter, Request, Depends
from sqlalchemy.orm import Session

from app.middlewares.auth_middleware import auth_required
from app.schemas.auth_schema import LoginRequest, PasswordUpdateRequest, UserCreate
from app.services.internal import AuthService
from app.db.session import get_db
from app.utils.auth.cookie_config import delete_auth_cookie, set_auth_cookie
from app.utils.response_handler import ResponseHandler
from app.schemas.auth_schema import UserResponse
from sqlalchemy.orm import Session

router = APIRouter()
auth_service = AuthService()
response_handler = ResponseHandler()

@router.post("/signup")
async def signup(body: UserCreate, db: Session = Depends(get_db)):
    """Create a new user account."""
    auth_service.signup(db, body)
    login_response = auth_service.login(
        db, LoginRequest(email=body.email, password=body.password)
    )

    response = response_handler.success_response(
        data=login_response["user"], message="User created successfully"
    )
    set_auth_cookie(response, login_response["access_token"])
    return response


@router.put("/update-password")
@auth_required()
async def update_password(request: Request, body: PasswordUpdateRequest, user:UserResponse, db: Session):
    """Update user's password."""
    result = auth_service.update_password(
        db, user.id, body.old_password, body.new_password
    )
    return response_handler.success_response(
        data=result, message="Password updated successfully"
    )


@router.post("/login")
async def login(body: LoginRequest, db: Session = Depends(get_db)):
    """Login user and return access token."""
    result = auth_service.login(db, body)
    response = response_handler.success_response(
        data=result["user"], message="Login successful"
    )
    set_auth_cookie(response, result["access_token"])
    return response


@router.post("/logout")
@auth_required()
async def logout(request: Request):
    """Logout user."""
    response = response_handler.success_response(
        data=None, message="Logout successful"
    )
    delete_auth_cookie(response)
    return response
