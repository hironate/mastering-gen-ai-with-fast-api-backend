from fastapi import APIRouter, Request
from app.config.settings import settings
from app.services.internal import AuthService
from app.schemas.auth_schema import (
    UserCreate,
    LoginRequest,
    PasswordUpdateRequest,
)
from app.utils.response_handler import ResponseHandler
from app.middlewares.auth_middleware import auth_required

router = APIRouter()


@router.post("/signup")
async def signup(body: UserCreate):
    """Create a new user account."""
    user = AuthService().signup(body)
    return ResponseHandler().success_response(
        data=user.model_dump(mode='json'), message="User created successfully"
    )


@router.put("/update-password")
@auth_required()
async def update_password(
    request: Request,
    body: PasswordUpdateRequest,
):
    """Update user's password."""
    current_user = request.state.user
    result = AuthService().update_password(current_user.email, body.old_password, body.new_password)
    return ResponseHandler().success_response(data=result, message="Password updated successfully")


@router.post("/login")
async def login(body: LoginRequest):
    """Login user and return access token in OAuth2 standard format."""
    result = AuthService().login(body)
    response = ResponseHandler().success_response(data=result, message="Login successful")
    response.set_cookie(
        key=settings.ACCESS_TOKEN,
        value=result["access_token"],
        httponly=True,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        secure= True if settings.ENVIRONMENT == "production" else False,  # Set to True in production
    )
    return response

@router.post("/logout")
@auth_required()
async def logout(request: Request):
    """Logout user."""
    current_user = request.state.user
    result = AuthService().logout(current_user.email)
    return ResponseHandler().success_response(data=result, message="Logout successful")
