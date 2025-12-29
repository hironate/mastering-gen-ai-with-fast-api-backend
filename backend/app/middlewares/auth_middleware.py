from typing import Optional, List

from fastapi import Request
from app.core.exceptions.http_exception import UnauthorizedException, ForbiddenException, NotFoundException, BadRequestException

from app.schemas.auth_schema import AuthenticatedUser
from app.services.internal.auth_service import AuthService, verify_token
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
            raise UnauthorizedException(
                message="Not authenticated"
            )

        email = verify_token(token)
        if not email:
            raise UnauthorizedException(
                message="Invalid or expired token"
            )

        # Load the current user from DB
        user = AuthService().get_current_user(email)
        if user is None:
            raise NotFoundException(
                message="User not found"
            )

        # Attach authenticated user as AuthenticatedUser schema
        request.state.user = AuthenticatedUser(
            id=user.id, username=user.full_name, email=user.email, role=user.role
        )

        # Role-based Authorization check
        if roles:
            required_roles = roles if isinstance(roles, list) else [roles]
            if user.role not in required_roles:
                raise ForbiddenException(
                    message=f"Access denied: {required_roles} role required"
                )

    return base_decorator(auth_dependency)
