from functools import wraps
from typing import Callable, Any
from fastapi import Request

from app.db.session import SessionLocal


def base_decorator(*deps: Callable[..., Any]):
    """
    Generic decorator to attach FastAPI dependencies to a route.

    - Accepts any number of FastAPI dependency callables
    - Dependency return values are ignored (side-effect based)
    - Manually executes dependencies by looking for the Request object
    """

    def decorator(route_fn):
        @wraps(route_fn)
        async def wrapper(request: Request, *args, **kwargs):
            # Create database session and inject into request.state
            db = SessionLocal()
            request.state.db = db

            try:
                # Execute all dependencies (they can use request.state.db)
                for dep in deps:
                    await dep(request)

                # Execute the actual route function
                return await route_fn(request, *args, **kwargs)
            finally:
                # Always close the database session
                db.close()

        return wrapper

    return decorator
