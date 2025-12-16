from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import StreamingResponse
from app.middlewares.auth_middleware import auth_required
from app.schemas.chat_schema import ChatRequest, ChatResponse
from app.services.llm.factory import LLMFactory
from loguru import logger
from app.services.prompts.chat import prepare_chat_prompt
from app.services.prompts.assistant import prepare_assistant_prompt
from app.core.security import oauth2_scheme


router = APIRouter()

@router.post("/", response_model=ChatResponse, dependencies=[Depends(oauth2_scheme)])
@auth_required
async def create_chat(
    request: Request,
    chat_request: ChatRequest = Depends(ChatRequest.as_form),
):
    try:
        provider_id = chat_request.model
        llm_provider = LLMFactory.get_provider(provider_id)
        
        # Determine prompt type based on input
        if chat_request.data:
            messages = prepare_assistant_prompt(chat_request.prompt, chat_request.data)
        else:
            messages = prepare_chat_prompt(chat_request.prompt, chat_request.files)
        
        if chat_request.stream:
            return StreamingResponse(
                llm_provider.generate_stream_response(messages),
                media_type='text/event-stream'
            )

        ai_response = llm_provider.generate_response(messages)
        return {"response": ai_response}
    except ValueError as ve:
        logger.error(f"Error in chat endpoint: {str(ve)}")
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))