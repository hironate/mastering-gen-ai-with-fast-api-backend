from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from app.schemas.chat_schema import ChatRequest, ChatResponse
from app.utils.response_handler import ResponseHandler
from app.services.llm.factory import LLMFactory
from langchain.schema import HumanMessage
from loguru import logger
from app.utils.file_handler import prepare_image_messages

router = APIRouter()

@router.post("/", response_model=ChatResponse)
async def create_chat(
    request: ChatRequest = Depends(ChatRequest.as_form),
):
    try:
        provider_id = request.model
        llm_provider = LLMFactory.get_provider(provider_id)
        
        content = [{"type": "text", "text": f"Context: {request.data}\n\nQuestion: {request.prompt}"}]
        
        if hasattr(request, 'files') and request.files:
            content.extend(prepare_image_messages(request.files))
        
        messages = [HumanMessage(content=content)]

        if request.stream:
            return StreamingResponse(
                llm_provider.generate_stream_response(messages),
                media_type='text/event-stream'
            )

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