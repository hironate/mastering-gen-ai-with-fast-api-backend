import inspect
from functools import wraps
from typing import Callable, Any, Dict
from fastapi import Request
from contextlib import contextmanager
from starlette.concurrency import run_in_threadpool
from app.db.session import SessionLocal


@contextmanager
def session_scope():
    """
    Context manager for database sessions.
    Automatically commits on success, rolls back on error.
    """
    db = SessionLocal()
    try:
        yield db
        db.commit()
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


def base_decorator(*deps: Callable[..., Any]):
    """
    A decorator for route handlers that provides dependency injection.
    
    What it does:
    - Creates a database session automatically
    - Runs dependency functions (e.g., auth checks)
    - Injects values (db, user, etc.) into your route handler
    - Modifies the function signature so FastAPI doesn't try to parse injected params
    
    Usage:
        @auth_required()  # This uses base_decorator internally
        async def my_route(request: Request, user: UserResponse, db: Session):
            # 'user' and 'db' are automatically provided by the decorator
            pass
    """
    def decorator(route_fn):
        @wraps(route_fn)
        async def wrapper(request: Request, *args, **kwargs):
            # Create a database session
            with session_scope() as db:
                # Collect values to inject (start with db)
                values_to_inject = {"db": db}

                # Run each dependency function (e.g., auth checks)
                # Each dependency can add more values (e.g., "user")
                for dependency in deps:
                    result = await dependency(request, db)
                    if result:
                        if not isinstance(result, dict):
                            raise TypeError("Dependency must return a dict")
                        values_to_inject.update(result)

                # Only inject values that the route function actually needs
                # Example: if route doesn't have 'db' param, don't inject it
                route_signature = inspect.signature(route_fn)
                route_param_names = set(route_signature.parameters.keys())
                
                final_kwargs = {**kwargs}  # Start with FastAPI's kwargs (body, query params, etc.)
                for name, value in values_to_inject.items():
                    if name in route_param_names:
                        final_kwargs[name] = value

                # Call the actual route function with all the parameters
                if inspect.iscoroutinefunction(route_fn):
                    return await route_fn(request, *args, **final_kwargs)
                return await run_in_threadpool(lambda: route_fn(request, *args, **final_kwargs))

        try:
            original_sig = inspect.signature(route_fn)
            original_params = list(original_sig.parameters.values())
            
            # Remove injected params from the signature FastAPI sees
            visible_params = [p for p in original_params if p.name not in ('db', 'user')]
            
            # Make sure 'request' is the first parameter
            if not any(p.annotation == Request for p in visible_params):
                request_param = inspect.Parameter(
                    "request", 
                    inspect.Parameter.POSITIONAL_OR_KEYWORD, 
                    annotation=Request
                )
                visible_params.insert(0, request_param)
            
            # Update the wrapper's signature
            wrapper.__signature__ = inspect.Signature(
                parameters=visible_params, 
                return_annotation=original_sig.return_annotation
            )
        except Exception:
            pass

        return wrapper
    return decorator