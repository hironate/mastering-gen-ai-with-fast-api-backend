import time
from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
from loguru import logger

class LoggingMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start_time = time.time()
        logger.info(f"Incoming Request: {request.method} {request.url.path}")
        
        try:
            response = await call_next(request)
            process_time = time.time() - start_time
            logger.info(
                f"Request Completed: {request.method} {request.url.path} "
                f"- Status: {response.status_code} - Duration: {process_time:.4f}s"
            )
            return response
        except Exception as e:
            process_time = time.time() - start_time
            logger.error(
                f"Request Failed: {request.method} {request.url.path} "
                f"- Duration: {process_time:.4f}s - Error: {str(e)}"
            )
            raise e
