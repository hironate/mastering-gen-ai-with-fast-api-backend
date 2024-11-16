from fastapi import APIRouter, Response
from app.utils.response_handler import ResponseHandler

router = APIRouter()

@router.get("")
async def health_check(response: Response):
    return ResponseHandler.success_response(
        data={"status": "healthy"},
        message="System is healthy",
        code=200
    )

@router.get("/error")
async def health_check_error(response: Response):
    return ResponseHandler.error_response(
        message="System is experiencing issues",
        code=500
    ) 