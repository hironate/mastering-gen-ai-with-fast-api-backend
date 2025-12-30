from typing import Optional, List

from fastapi import Request
from app.core.exceptions.http_exception import UnauthorizedException, ForbiddenException, NotFoundException

from app.schemas.auth_schema import AuthResponse
from app.services.internal.auth_service import verify_token
from app.middlewares.base_decoraters import base_decorator
from app.config.settings import settings
from app.services.repositories import UserRepository


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
            raise UnauthorizedException(
                message="Not authenticated"
            )

        email = verify_token(token)
        if not email:
            raise UnauthorizedException(
                message="Invalid or expired token"
            )

        user = UserRepository().get_user_by_email(email, includePassword=True)
        if user is None:
            raise NotFoundException(
                message="User not found"
            )

        request.state.user = AuthResponse.model_validate(user)

        if roles:
            required_roles = roles if isinstance(roles, list) else [roles]
            if user.role not in required_roles:
                raise ForbiddenException(
                    message=f"Access denied: {required_roles} role required"
                )

    return base_decorator(auth_dependency)
