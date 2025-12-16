from fastapi import APIRouter, Depends, HTTPException, status, Request
from app.core.exceptions import CustomHTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app.core.security import oauth2_scheme
from app.db.session import get_db
from app.services.internal import AuthService
from app.schemas.auth_schema import UserCreate, LoginRequest, LoginResponse, UserResponse, LoginSessionResponse, PasswordUpdateRequest, AuthenticatedUser

from app.middlewares.auth_middleware import auth_required

router = APIRouter()

@router.post("/signup", response_model=UserResponse)
async def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    #Create a new user account.
    try:
        auth_service = AuthService(db)
        user = auth_service.signup(user_data)
        return user
    except CustomHTTPException as e:
        raise e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail="Internal server error")

@router.put("/update-password", response_model=UserResponse, dependencies=[Depends(oauth2_scheme)])
@auth_required
async def update_password(request: Request,
                            password_update_request: PasswordUpdateRequest, 
                            db: Session = Depends(get_db)):
    #Update user's password.
    try:
        current_user = request.state.user
        auth_service = AuthService(db)
        user = auth_service.update_password(current_user.email, 
                                            password_update_request.old_password, 
                                            password_update_request.new_password)
        return user

    except CustomHTTPException as e:
        raise e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail="Internal server error")


@router.post("/login", response_model=LoginResponse)
async def login(form_data: OAuth2PasswordRequestForm = Depends(),db: Session = Depends(get_db)):
    try:
        auth_service = AuthService(db)
        # Convert OAuth2 form → your LoginRequest schema
        login_data = LoginRequest(email=form_data.username,
                                    password=form_data.password)

        result = auth_service.login(login_data)
        return result

    except CustomHTTPException as e:
        raise e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail="Internal server error")


@router.post("/logout", dependencies=[Depends(oauth2_scheme)])
@auth_required
async def logout(request: Request, db: Session = Depends(get_db)):

    #"""Logout user."""
    try:
        current_user = request.state.user
        auth_service = AuthService(db)
        result = auth_service.logout(current_user.email)
        return result
    except CustomHTTPException as e:
        raise e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail="Internal server error")

@router.get("/sessions", response_model=list[LoginSessionResponse], dependencies=[Depends(oauth2_scheme)])
@auth_required
async def get_user_sessions(request: Request,
                            db: Session = Depends(get_db)):

    #"""Get login sessions for the authenticated user."""
    try:
        current_user = request.state.user
        auth_service = AuthService(db)
        sessions = auth_service.get_user_sessions(current_user.email)
        return sessions
        
    except CustomHTTPException as e:
        raise e
    except Exception as e:
        raise CustomHTTPException(status_code=500, detail="Internal server error")