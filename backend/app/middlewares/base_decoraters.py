from functools import wraps
from typing import Callable, Any
from fastapi import Request, Depends

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
            # Manually execute dependencies
            for dep in deps:
                await dep(request)
            return await route_fn(request, *args, **kwargs)

        return wrapper

    return decorator
