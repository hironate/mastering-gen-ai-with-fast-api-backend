from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.settings import settings
from app.core.logging import setup_logging
from app.api.v1.routes import api_router
from app.core.exceptions.http_exception import app_http_exception_handler
from app.utils.response_handler import ResponseHandler
from fastapi.exceptions import RequestValidationError
from app.core.exceptions.http_exception import AppHTTPException
from loguru import logger


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
    application.add_exception_handler(
        RequestValidationError, ResponseHandler.validation_error
    )
    application.add_exception_handler(Exception, ResponseHandler.internal_error)
    application.include_router(api_router, prefix=settings.API_V1_STR)

    return application


app = create_application()


@app.on_event("startup")
async def startup_event():
    logger.info("Starting up FastAPI application")


@app.on_event("shutdown")
async def shutdown_event():
    logger.info("Shutting down FastAPI application")
