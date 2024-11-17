from fastapi import APIRouter, Response
from pydantic import BaseModel
from app.utils.response_handler import ResponseHandler
from loguru import logger
from app.services.llm.factory import LLMFactory
from langchain.schema import SystemMessage, HumanMessage

router = APIRouter()

class ChatRequest(BaseModel):
    prompt: str
    stream: bool = False

class ChatResponse(BaseModel):
    results: dict

@router.post("/", response_model=ChatResponse)
async def create_chat(request: ChatRequest, response: Response):
    try:
        provider = 'openai'
        # model = 'anthropic.claude-3-5-sonnet-20240620-v1:0'
        # llm_provider = LLMFactory.get_llm_provider(provider, model)
        
        model = 'gpt-4o'
        llm_provider = LLMFactory.get_llm_provider(provider, model)
        
        messages = [
            SystemMessage(content="You are a helpful tourist guide."),
            HumanMessage(content=request.prompt)
        ]
        
        ai_response = llm_provider.generate_response(messages)
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