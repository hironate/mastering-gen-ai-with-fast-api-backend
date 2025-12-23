from functools import wraps
from typing import Any, Optional, List

from fastapi import Request, HTTPException, status
from sqlalchemy.orm import Session
from app.core.exceptions import CustomHTTPException

from app.schemas.auth_schema import AuthenticatedUser
from app.services.internal.auth_service import AuthService, verify_token
from loguru import logger
from app.middlewares.base_decoraters import base_decorator

def auth_required(roles: Optional[List[str]] = None):
    """
    Decorator that injects an auth dependency for a single route.

    Usage:
      @auth_required()                    # any authenticated user
      @auth_required(["ADMIN"])           # only admin role
      @auth_required(["ADMIN", "OPS"])    # any matching role
    """

    async def auth_dependency(request: Request):
            # Extract token from Authorization header
            authorization: str | None = request.headers.get("Authorization")
            if not authorization or not authorization.startswith("Bearer "):
                raise CustomHTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Not authenticated",
                    headers={"WWW-Authenticate": "Bearer"},
                )

            token = authorization.split(" ", 1)[1]
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
                id=user.id,
                username=user.full_name,
                email=user.email,
                role=user.role
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


"""def auth_required(role: Any = None):
    
    Decorator to enforce authentication and optionally authorization on route handlers.

    Can be used as:
    - @auth_required: Any authenticated user
    - @auth_required(["Admin"]): Only users with "Admin", other_role role
    
    def decorator(func):
        @wraps(func)
        async def wrapper(request: Request, *args: Any, **kwargs: Any):
            # Extract token from Authorization header
            authorization: str | None = request.headers.get("Authorization")
            if not authorization or not authorization.startswith("Bearer "):
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Not authenticated",
                    headers={"WWW-Authenticate": "Bearer"},
                )

            token = authorization.split(" ", 1)[1]
            email = verify_token(token)
            if not email:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid or expired token",
                    headers={"WWW-Authenticate": "Bearer"},
                )

            # Get DB session from the endpoint's dependencies (expects parameter name `db`)
            db: Session | None = kwargs.get("db")
            if db is None:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Database session not available in request handler",
                )

            # Load the current user from DB
            auth_service = AuthService(db)
            user = auth_service.get_current_user(email)
            if user is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User not found",
                )

            # Attach authenticated user as AuthenticatedUser schema
            request.state.user = AuthenticatedUser(
                id=user.id,
                username=user.full_name,
                email=user.email,
                role=user.role
            )

            # Role-based Authorization check
            # determine if we were called with a role string
            required_role = role if isinstance(role, list ) else [role]
            
            if required_role and user.role not in required_role:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail=f"Access denied: {required_role} role required",
                )

            # Call the original route handler, forwarding all dependencies
            return await func(request, *args, **kwargs)
        return wrapper

    # If role is a function, it means it was used as @auth_required
    if callable(role):
        return decorator(role)
    
    # If role is a string (or None), it was used as @auth_required("Admin") or @auth_required()
    return decorator"""