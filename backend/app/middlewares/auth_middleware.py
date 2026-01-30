# app/middlewares/auth_required.py
from typing import Optional, List, Dict
from fastapi import Request
from app.core.exceptions.http_exception import (
    UnauthorizedException,
    ForbiddenException,
    NotFoundException,
)
from app.schemas.auth_schema import UserResponse
from app.services.internal.auth_service import AuthService
from app.config.settings import settings
from app.services.repositories import UserRepository
from app.utils.orm import orm_to_pydantic
from app.middlewares.base_decoraters import base_decorator


def auth_required(roles: Optional[List[str]] = None):
    """
    Decorator that authenticates and optionally checks for authorized roles.
    Returns `user` and `db` to the route.
    """

    user_repo = UserRepository()

    async def auth_dependency(request: Request, db) -> Dict:
        token = request.cookies.get(settings.ACCESS_TOKEN)
        if not token:
            raise UnauthorizedException(message="Not authenticated")

        email = AuthService().verify_token(token)
        if not email:
            raise UnauthorizedException(message="Invalid or expired token")

        user_orm = user_repo.get_user_by_email(db, email, include_password=False)
        if user_orm is None:
            raise NotFoundException(message="User not found")

        user = orm_to_pydantic(user_orm, UserResponse)

        if roles:
            if user.role not in roles:
                raise ForbiddenException(
                    message=f"Access denied: {roles} role required"
                )

        return {"user": user}

    return base_decorator(auth_dependency)