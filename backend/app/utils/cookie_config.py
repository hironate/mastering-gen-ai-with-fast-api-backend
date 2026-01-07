from fastapi import Response
from app.config.settings import settings


def set_auth_cookie(response: Response, token: str) -> None:
    """
    Set authentication cookie with standardized configuration.
    
    Args:
        response: FastAPI Response object
        token: Access token value to set in cookie
    """
    response.set_cookie(
        key=settings.ACCESS_TOKEN,
        value=token,
        httponly=True,
        max_age=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
        secure=True if settings.ENVIRONMENT == "production" else False,
    )


def delete_auth_cookie(response: Response) -> None:
    """
    Delete authentication cookie with standardized configuration.
    
    Args:
        response: FastAPI Response object
    """
    response.delete_cookie(
        key=settings.ACCESS_TOKEN,
        httponly=True,
        secure=True if settings.ENVIRONMENT == "production" else False,
    )

