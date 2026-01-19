from fastapi import APIRouter, Request

from app.middlewares.auth_middleware import auth_required
from app.schemas.auth_schema import LoginRequest, PasswordUpdateRequest, UserCreate
from app.services.internal import AuthService
from app.utils.auth.cookie_config import delete_auth_cookie, set_auth_cookie
from app.utils.response_handler import ResponseHandler

router = APIRouter()


@router.post("")
async def signup(body: UserCreate):
    """Create a new user account."""
    AuthService().signup(body)
    login_response = AuthService().login(
        LoginRequest(email=body.email, password=body.password)
    )
    response = ResponseHandler().success_response(
        data=login_response["user"], message="User created successfully"
    )
    set_auth_cookie(response, login_response["access_token"])
    return response


@router.put("")
@auth_required()
async def update_password(
    request: Request,
    body: PasswordUpdateRequest,
):
    """Update user's password."""
    current_user = request.state.user
    result = AuthService().update_password(
        current_user, body.old_password, body.new_password
    )
    return ResponseHandler().success_response(
        data=result, message="Password updated successfully"
    )


@router.post("/login")
async def login(body: LoginRequest):
    """Login user and return access token in OAuth2 standard format."""
    result = AuthService().login(body)
    response = ResponseHandler().success_response(
        data=result["user"], message="Login successful"
    )
    set_auth_cookie(response, result["access_token"])
    return response


@router.post("/logout")
@auth_required()
async def logout(request: Request):
    """Logout user."""
    response = ResponseHandler().success_response(
        data=None, message="Logout successful"
    )
    delete_auth_cookie(response)
    return response
