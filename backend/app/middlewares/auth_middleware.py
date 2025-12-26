from functools import wraps
from typing import Optional, List

from fastapi import Request, HTTPException, status
from sqlalchemy.orm import Session
from app.core.exceptions import CustomHTTPException

from app.schemas.auth_schema import AuthenticatedUser
from app.services.internal.auth_service import AuthService, verify_token
from loguru import logger
from app.middlewares.base_decoraters import base_decorator
from app.config.settings import settings


def auth_required(roles: Optional[List[str]] = None):
    """
    Decorator that injects an auth dependency for a single route.

    Usage:
      @auth_required()                    # any authenticated user
      @auth_required(["ADMIN"])           # only admin role
      @auth_required(["ADMIN", "OPS"])    # any matching role
    """

    async def auth_dependency(request: Request):
        token = request.cookies.get(settings.ACCESS_TOKEN)

        if not token:
            raise CustomHTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Not authenticated",
                headers={"WWW-Authenticate": "Bearer"},
            )

        email = verify_token(token)
        if not email:
            raise CustomHTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token",
                headers={"WWW-Authenticate": "Bearer"},
            )

        # Load the current user from DB
        auth_service = AuthService()
        user = auth_service.get_current_user(email)
        if user is None:
            raise CustomHTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found",
            )

        # Attach authenticated user as AuthenticatedUser schema
        request.state.user = AuthenticatedUser(
            id=user.id, username=user.full_name, email=user.email, role=user.role
        )

        # Role-based Authorization check
        if roles:
            required_roles = roles if isinstance(roles, list) else [roles]
            if user.role not in required_roles:
                raise CustomHTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Access denied: {required_roles} role required",
                )

    return base_decorator(auth_dependency)
