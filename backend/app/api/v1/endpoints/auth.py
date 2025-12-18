from fastapi import APIRouter, Depends, Request
from app.core.exceptions import CustomHTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.utils.auth import oauth2_scheme
from app.db.session import get_db
from app.services.internal import AuthService
from app.schemas.auth_schema import UserCreate, LoginRequest, LoginResponse, UserResponse, LoginSessionResponse, PasswordUpdateRequest, AuthenticatedUser
from app.utils.response_handler import ResponseHandler
from loguru import logger
from app.middlewares.auth_middleware import auth_required

router = APIRouter()

@router.post("/signup")
async def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    """Create a new user account."""
    try:
        auth_service = AuthService(db)
        user = auth_service.signup(user_data)
        return ResponseHandler().success_response(data=user.model_dump(), message="User created successfully")
    except CustomHTTPException as e:
        return ResponseHandler().error_response(message=e.detail)
    except Exception as e:
        return ResponseHandler().error_response(message="Internal server error")

@router.put("/update-password", dependencies=[Depends(oauth2_scheme)])
@auth_required
async def update_password(request: Request,
                            password_update_request: PasswordUpdateRequest, 
                            db: Session = Depends(get_db)):
    """Update user's password."""
    try:
        current_user = request.state.user
        auth_service = AuthService(db)
        logger.info("Current user: ", current_user)
        logger.info(f"Old password: {password_update_request.old_password}")
        logger.info(f"New password: {password_update_request.new_password}")
        user = auth_service.update_password(current_user.email, 
                                            password_update_request.old_password, 
                                            password_update_request.new_password)
        logger.info(f"Password updated for user: +++++++++++++++++++{user}++++++++++++++++++++++++")
        return ResponseHandler().success_response(data=user.model_dump(), message="Password updated successfully")

    except CustomHTTPException as e:
        return ResponseHandler().error_response(message=e.detail)
    except Exception as e:
        return ResponseHandler().error_response(message="Internal server error")


@router.post("/login")
async def login(form_data: OAuth2PasswordRequestForm = Depends(),db: Session = Depends(get_db)):
    """Login user and return access token in OAuth2 standard format."""
    try:
        auth_service = AuthService(db)
        # Convert OAuth2 form → your LoginRequest schema
        login_data = LoginRequest(email=form_data.username,
                                    password=form_data.password)
                                    
        result = auth_service.login(login_data)
        # Return in OAuth2 standard format (token at top level) for compatibility with OAuth2PasswordRequestForm
        # Frontend can extract access_token directly from response.data.access_token
        return {
            "access_token": result.access_token,
            "token_type": result.token_type,
            "user": result.user.model_dump() if hasattr(result.user, 'model_dump') else result.user
        }

    except CustomHTTPException as e:
        return ResponseHandler().error_response(message=e.detail)
    except Exception as e:
        return ResponseHandler().error_response(message="Internal server error")


@router.post("/logout", dependencies=[Depends(oauth2_scheme)])
@auth_required
async def logout(request: Request, db: Session = Depends(get_db)):
    """Logout user."""
    try:
        current_user = request.state.user
        auth_service = AuthService(db)
        result = auth_service.logout(current_user.email)
        return ResponseHandler().success_response(data=result if isinstance(result, dict) else {"result": result}, message="Logout successful")
    except CustomHTTPException as e:
        return ResponseHandler().error_response(message=e.detail)
    except Exception as e:
        return ResponseHandler().error_response(message="Internal server error")

@router.get("/sessions", dependencies=[Depends(oauth2_scheme)])
@auth_required
async def get_user_sessions(request: Request,
                            db: Session = Depends(get_db)):
    """Get login sessions for the authenticated user."""
    try:
        current_user = request.state.user
        auth_service = AuthService(db)
        sessions = auth_service.get_user_sessions(current_user.email)
        sessions_data = [session.model_dump() if hasattr(session, 'model_dump') else session for session in sessions]
        return ResponseHandler().success_response(data=sessions_data, message="Sessions retrieved successfully")
        
    except CustomHTTPException as e:
        return ResponseHandler().error_response(message=e.detail)
    except Exception as e:
        return ResponseHandler().error_response(message="Internal server error")