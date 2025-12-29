from fastapi import APIRouter, Response
from app.utils.response_handler import ResponseHandler
from app.core.exceptions.http_exception import BadRequestException

router = APIRouter()

@router.get("")
async def health_check(response: Response):
    """Health check endpoint."""
    return ResponseHandler().success_response(data={"health": "healthy"}, message="Service is healthy")

@router.get("/error")
async def health_check_error(response: Response):
    """Error endpoint for testing error responses."""
    raise BadRequestException(message="System is experiencing issues")