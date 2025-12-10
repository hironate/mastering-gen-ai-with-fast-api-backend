from fastapi import APIRouter
from app.api.v1.endpoints import health_check, chat, auth #get_presigned_url

api_router = APIRouter()

api_router.include_router(health_check.router, prefix="/health", tags=["health"])
api_router.include_router(chat.router, prefix="/chat", tags=["chat"])
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
#api_router.include_router(get_presigned_url.router, prefix="/s3", tags=["s3"])
