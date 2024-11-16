from fastapi import APIRouter, Response
from pydantic import BaseModel
from app.utils.response_handler import ResponseHandler
from loguru import logger

router = APIRouter()

class ChatRequest(BaseModel):
    prompt: str
    stream: bool = True

class ChatResponse(BaseModel):
    results: dict

@router.post("/", response_model=ChatResponse)
async def create_chat(request: ChatRequest, response: Response):
    try:
        ai_response = 'This is a test response'
        return ResponseHandler.success_response(
            data={"response": ai_response},
            message="Chat processed successfully",
            code=200
        )
    except ValueError as ve:
        logger.error(f"Error in chat endpoint: {str(ve)}")
        return ResponseHandler.error_response(
            message=str(ve),
            code=400
        )
    except Exception as e:
        return ResponseHandler.error_response(
            message=str(e),
            code=500
        )