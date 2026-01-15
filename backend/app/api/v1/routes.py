from fastapi import APIRouter
from app.api.v1.endpoints import health_check, chat, auth, files, presignedurl

api_router = APIRouter()

api_router.include_router(health_check.router, prefix="/health", tags=["health"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(files.router, prefix="/files", tags=["files"])
api_router.include_router(
    presignedurl.router, prefix="/files/presigned-url", tags=["presigned-url"]
)
