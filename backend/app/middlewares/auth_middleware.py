from typing import Optional, List
from fastapi import Request

from app.core.exceptions.http_exception import (
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
)
from app.schemas.auth_schema import UserResponse
from app.services.internal.auth_service import AuthService
from app.middlewares.base_decoraters import base_decorator
from app.config.settings import settings
from app.services.repositories import UserRepository
from app.utils.orm import orm_to_pydantic


def auth_required(roles: Optional[List[str]] = None):
    """
    Decorator that verifies authentication and authorization.

    Usage:
      @auth_required()                    # any authenticated user
      @auth_required(["ADMIN"])           # only admin role
      @auth_required(["ADMIN", "USER"])   # any matching role
    """
    user_repo = UserRepository()

    async def auth_dependency(request: Request):
        """Verify authentication and inject user into request.state"""
        token = request.cookies.get(settings.ACCESS_TOKEN)

        if not token:
            raise UnauthorizedException(message="Not authenticated")

        email = AuthService().verify_token(token)
        if not email:
            raise UnauthorizedException(message="Invalid or expired token")

        # Use DB session from request.state (managed by base_decorator)
        db = request.state.db

        user_orm = user_repo.get_user_by_email(db, email, include_password=False)
        if user_orm is None:
            raise NotFoundException(message="User not found")

        # Convert to Pydantic before session closes
        user = orm_to_pydantic(user_orm, UserResponse)
        request.state.user = user

        # Check role authorization
        if roles:
            required_roles = roles if isinstance(roles, list) else [roles]
            if user.role not in required_roles:
                raise ForbiddenException(
                    message=f"Access denied: {required_roles} role required"
                )

    return base_decorator(auth_dependency)
