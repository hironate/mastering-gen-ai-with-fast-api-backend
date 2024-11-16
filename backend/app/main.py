from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import settings
from app.core.logging import setup_logging
from app.core.exceptions import CustomHTTPException, http_exception_handler
from app.api.v1.routes import api_router
from loguru import logger

def create_application() -> FastAPI:
    setup_logging()
    
    application = FastAPI(
        title=settings.PROJECT_NAME,
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
    )
    
    # Set CORS middleware
    application.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Add exception handlers
    application.add_exception_handler(CustomHTTPException, http_exception_handler)
    
    # Include API routes
    application.include_router(api_router, prefix=settings.API_V1_STR)
    
    return application

app = create_application()

@app.on_event("startup")
async def startup_event():
    logger.info("Starting up FastAPI application")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down FastAPI application")
