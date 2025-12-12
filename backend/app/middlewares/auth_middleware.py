from fastapi import Depends, HTTPException, status, Request
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app.core.security import verify_token, oauth2_scheme
from app.db.session import get_db
from app.services.repositories.user_repository import UserRepository
from app.schemas.auth_schema import AuthenticatedUser

async def auth_dependency(
    request: Request,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
) -> AuthenticatedUser:
    """
    Dependency that extracts the token, verifies it, attached user to request.state, and returns the AuthenticatedUser.
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or Expired Token",
        headers={"WWW-Authenticate": "Bearer"},
    )
    
    email = verify_token(token)
    if email is None:
        raise credentials_exception
    
    user_repo = UserRepository(db)
    user = user_repo.get_user_by_email(email)
    
    if user is None:
        raise credentials_exception
    
    auth_user = AuthenticatedUser(
        id=user.id,
        username=user.full_name,
        email=user.email
    )
    
    # Attach to request state for cases where dependency is used in decorator
    request.state.user = auth_user
        
    return auth_user