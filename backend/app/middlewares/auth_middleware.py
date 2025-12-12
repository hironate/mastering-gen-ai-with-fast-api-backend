from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse
from starlette.middleware.base import BaseHTTPMiddleware
from app.core.security import verify_token
from loguru import logger

class AuthenticationMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        # Define public paths that don't require authentication
        public_paths = [
            "/docs",
            "/redoc",
            "/openapi.json",
            "/api/v1/health",
            "/api/v1/auth/login",
            "/api/v1/auth/signup"
        ]
        
        # Check if the current path is public
        # Using startswith for paths like /docs or /openapi.json which might have params (though usually don't)
        # For API routes better to exact match or match prefix carefully
        path = request.url.path
        is_public = any(path.startswith(p) for p in public_paths)
        
        if is_public:
            return await call_next(request)
            
        # Check for Authorization header
        auth_header = request.headers.get("Authorization")
        if not auth_header:
             return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Missing Authentication Token"},
            )
            
        try:
            scheme, token = auth_header.split()
            if scheme.lower() != "bearer":
                 return JSONResponse(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    content={"detail": "Invalid Authentication Scheme"},
                )
            
            email = verify_token(token)
            if email is None:
                 return JSONResponse(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    content={"detail": "Invalid or Expired Token"},
                )
                
            # Store user info in request state for downstream use
            request.state.user_email = email
            
        except ValueError:
             return JSONResponse(
                status_code=status.HTTP_401_UNAUTHORIZED,
                content={"detail": "Invalid Authorization Header Format"},
            )
        except Exception as e:
            logger.error(f"Authentication error: {str(e)}")
            return JSONResponse(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                content={"detail": "Internal Server Error during Authentication"},
            )

        return await call_next(request)
