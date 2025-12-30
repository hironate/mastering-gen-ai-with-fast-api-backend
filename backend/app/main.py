from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import settings
from app.core.logging import setup_logging
from app.api.v1.routes import api_router
from app.core.exceptions_handler import app_http_exception_handler, validation_exception_handler, internal_exception_handler
from loguru import logger
from app.core.exceptions.base import AppHTTPException
from fastapi.exceptions import RequestValidationError


def create_application() -> FastAPI:
    setup_logging()

    application = FastAPI(
        title=settings.PROJECT_NAME,
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
    )

    application.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    application.add_exception_handler(AppHTTPException, app_http_exception_handler)
    application.add_exception_handler(RequestValidationError, validation_exception_handler)
    application.add_exception_handler(Exception, internal_exception_handler)
    application.include_router(api_router, prefix=settings.API_V1_STR)

    return application


app = create_application()


@app.on_event("startup")
async def startup_event():
    logger.info("Starting up FastAPI application")


@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down FastAPI application")
