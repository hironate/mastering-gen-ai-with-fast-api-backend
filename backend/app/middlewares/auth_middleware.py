from functools import wraps
from typing import Any

from fastapi import Request, HTTPException, status
from sqlalchemy.orm import Session

from app.schemas.auth_schema import AuthenticatedUser
from app.services.internal.auth_service import AuthService, verify_token
from loguru import logger


def auth_required(func):
    """
    Decorator to enforce authentication on route handlers.

    - Extracts and verifies the Bearer token from the Authorization header.
    - Loads the current user from the database using the injected `db` Session.
    - Attaches an `AuthenticatedUser` instance to `request.state.user`.
    - Forwards all original args/kwargs (e.g. `db`) to the wrapped handler.
    """

    @wraps(func)
    async def decorator(request: Request, *args: Any, **kwargs: Any):
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
        )

        # Call the original route handler, forwarding all dependencies
        return await func(request, *args, **kwargs)

    return decorator